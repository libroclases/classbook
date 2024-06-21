import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, Observable, Subscription, share, take, tap } from 'rxjs';
import { CrudService } from '../../services/crud/crud.service';
import { fkValues, tableQueries } from '../../../interfaces/generic.interface';
import { ForeignKeysService } from '../../services/foreign-keys/foreign-keys.service';
import { LabelsService } from '../../services/labels/labels.service';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { OriginTableIdService } from '../../services/origin-table-id/origin-table-id.service';

@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent implements OnInit, OnDestroy {
  @Input()
  tables!: string[];

  @Input('change-functions')
  changeFunctionsArray: Function[] | null = null;

  @Input('ignore-FK-requirements')
  ignoreFkRequirements: string[] = [];

  @Input('main-table-has-year-FK')
  mainTableHasYearFK: boolean = false;

  @Input('main-table-has-month-FK')
  mainTableHasMonthFK: boolean = false;

  // endpoints accesibles con crud.getCustomData, que devuelven obj con 'id' y 'nombre'
  @Input('custom-endpoints')
  customEndpoints: any = null;

  @Input('middle-tables')
  middleTables: any = null; // UVR

  @Input('patch-fks-from-storage')
  patchTablesFromStorage: string[] = [];

  freeTables: string[] = [];

  requiredBySelTree!: Map<string, string[]>;
  // requiredBySelTree.get(tbl): selectors that require "tbl" to be selected

  considerReqSel = false;

  changeFns: Map<string, Function>;

  hasCustomEndpoint: Map<string, boolean> = new Map();
  hasMiddleTable: Map<string, boolean> = new Map();

  queries: tableQueries = {};

  valuesForm!: FormGroup;

  originTableSubscription!: Subscription;

  constructor(
    private crud: CrudService,
    private fKeysService: ForeignKeysService,
    private labelsService: LabelsService,
    private selIdsService: SelectionIdsService,
    private originIdsService: OriginTableIdService
  ) {
    this.changeFns = new Map();
    this.requiredBySelTree = new Map();
  }

  ngOnInit(): void {
    this.tables.forEach((table) => this.hasCustomEndpoint.set(table, false));

    if (this.customEndpoints != null) {
      Object.keys(this.customEndpoints).forEach((table) =>
        this.hasCustomEndpoint.set(table, true)
      );
    }

    if (this.middleTables != null) {
      Object.keys(this.middleTables).forEach((table) =>
        this.hasMiddleTable.set(table, true)
      );
    }

    let storageFks: any = {};

    if (this.patchTablesFromStorage.length > 0) {
      this.patchTablesFromStorage.forEach((table) => {
        const newId = localStorage.getItem(`${table}Id`);
        if (newId != undefined) {
          storageFks[table] = +newId;
        }
      });
    }

    this.considerReqSel = false;
    this.valuesForm = new FormGroup({});
    this.tables.forEach((table) => this.requiredBySelTree.set(table, []));

    this.tables.forEach((table) => {
      this.valuesForm.addControl(table, new FormControl());
      const fKeyTable = this.getFKTables(table);
      let foreignKey: string[] = [];
      fKeyTable?.forEach((tb) => {
        if (
          !this.ignoreFkRequirements.includes(tb) &&
          this.tables.includes(tb)
        ) {
          foreignKey.push(tb);
          this.requiredBySelTree.get(tb)?.push(table);
        }
      });
      if (foreignKey.length === 0) {
        this.freeTables.push(table);
      } else {
        this.valuesForm.get(table)!.disable();
        this.considerReqSel = true;
        this.selIdsService.setId(table, 0);
      }
    });

    /**** obs logs**
    for (let r of this.requiredBySelTree.entries()) {
      console.log('r2',r[0],r[1]);
    }
    console.log('patchTablesFromStorage:',this.patchTablesFromStorage);
    console.log('middleTables:',this.middleTables);
    console.log('storage:',storageFks);
    console.log('freetables', this.freeTables);
    console.log('considerReqSel', true);
    console.log('changeFunctionArray', this.changeFunctionsArray);
    ********** */
    for (let [index, table] of this.tables.entries()) {
      this.queries[table] = EMPTY;
      if (this.changeFunctionsArray) {
        this.changeFns.set(table, this.changeFunctionsArray[index]);
      }
    }

    if (!this.considerReqSel) {
      this.freeTables = this.tables;
    }
    this.freeTables.forEach((table) => {
        if (this.hasMiddleTable.has(table)) { console.log(table, this.middleTables[table]); }
        else { this.queryTable(table) }
    }); // ok

    if (Object.keys(storageFks).length > 0) {
      this.checkSelection(storageFks, true);
    } else {

      this.selIdsService.notifyUpdated();
    }

    this.originTableSubscription = this.originIdsService.msg
      .pipe(
        take(1),
        tap((msg) => {
          console.log('msg poronga', msg); // ok
          this.checkSelection(msg);
        }),
        share()
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.selIdsService.unsubscribeAll();
    this.originTableSubscription.unsubscribe();
  }

  checkSelection(fks: fkValues, setSelectionIdsTexts: boolean = false) {
    for (const [tb, value] of Object.entries(fks)) {
      this.selIdsService.setId(tb, value);
    }
    let newValue: fkValues = {};
    for (const [tb, value] of Object.entries(fks)) {
      if (this.tables.includes(tb)) {
        newValue[tb] = value;
      }
    }
    for (let tb of this.tables) {
      const isFree = this.freeTables.includes(tb);
      // for each selector: check if all FKs are set, or part of ignoreFkRequirements
      if (this.allForeignKeysSetOrIgnored(tb)) {
        this.queryTable(tb, isFree ? null : this.getForeignKeysOfTable(tb));
        this.valuesForm.get(tb)!.enable();
      } else {
        if (isFree) {
          this.queryTable(tb);
          this.valuesForm.get(tb)!.enable();
        } else {
          this.valuesForm.get(tb)!.disable();
        }
      }
    }

    this.valuesForm.patchValue(newValue);
    this.selIdsService.notifyUpdated();

    if (setSelectionIdsTexts) {
      for (const [tb, value] of Object.entries(fks)) {
        if (this.tables.includes(tb)) {
          this.getQuery(tb).subscribe((query) => {
            query.every((entry: any) => {
              if (entry.id == value) { // console.log('tb, entry',tb, entry)
                this.selIdsService.setText(tb, this.getLabel(tb, entry));
                return false;
              }
              return true;
            });
          });
        }
      }
    }
  }

  getTableLabel(table: string) {
    return this.labelsService.getTableLabel(table);
  }

  getLabel(table: string, object: any) {
    return this.labelsService.getObjectLabel(table, object);
  }

  getFKTables(table: string) {
    if (this.hasCustomEndpoint.get(table)) {
      return this.fKeysService.getFKeys(this.customEndpoints[table]);
    }
    return this.fKeysService.getFKeys(table);
  }

  getForeignKeysOfTable(table: string) {
    let fKeys = [];
    for (let t of this.getFKTables(table)!) {
      fKeys.push(this.selIdsService.getId(t));
    }
    return fKeys;
  }

  allForeignKeysSetOrIgnored(table: string) {
    for (let t of this.getFKTables(table)!) {
      if (this.ignoreFkRequirements.includes(t)) {
        continue;
      }
      if (this.selIdsService.getId(t) === 0) {
        return false;
      }
    }
    return true;
  }

  enableIfRequiredSelected(table: string) {
    // check if all required selectors have been set
    let doEnable = true;
    for (let tb of this.getFKTables(table)!) {
      console.log('tb', table, tb, this.selIdsService.getId(tb));
      if (
        !this.ignoreFkRequirements.includes(tb) &&
        this.selIdsService.getId(tb) === 0
      ) {
        doEnable = false;
        break;
      }
    }
    if (doEnable) {
      console.log('doEnable', table, doEnable);
      this.valuesForm.get(table)!.enable();
    } else {
      this.selIdsService.setId(table, 0);
      this.valuesForm.get(table)!.disable();
      this.valuesForm.get(table)!.setValue(0);
    }
  }

  changeFunction(table: string, event: any) {
    const newId = +event.target.value;
    localStorage.setItem(`${table}Id`, newId.toString());
    this.selIdsService.setId(table, newId);
    if (newId === 0) {
      this.requiredBySelTree
        .get(table)!
        .forEach((tb) => this.selIdsService.setId(tb, 0));
    }
    const evtTargetOpt = event.target['options'];
    this.selIdsService.setText(
      table,
      evtTargetOpt[evtTargetOpt.selectedIndex].text
    );
    if (this.considerReqSel) {
      for (let tbl of this.requiredBySelTree.get(table)!) {
        this.enableIfRequiredSelected(tbl);
        if (this.valuesForm.get(tbl)!.enabled) {
          this.queryTable(tbl, this.getForeignKeysOfTable(tbl));
        }
      }
    }
    const changeFn = this.changeFns.get(table);
    if (changeFn) {
      changeFn();
    }
    this.selIdsService.notifyUpdated();
  }

  getFormValue(table: string) {
    return this.valuesForm.get(table);
  }

  getQuery(table: string) {
    return this.queries[table];
  }

  setQuery(table: string, query: Observable<any>) {
    this.queries[table] = query;
  }

  queryTable(
    table: string,
    fkIds: number[] | null = null,
    callback: Function | null = null
  ) {
    if (this.hasCustomEndpoint.get(table)) {
      var query = this.crud
        .getDataCustom(
          table,
          this.customEndpoints[table],
          this.getForeignKeysOfTable(table)
        )
        ?.pipe(
          tap((query) => {
            if (callback) {
              callback(query);
            }
          }),
          share()
        )!;
    } else {
      var query = this.crud.getData(table, fkIds)?.pipe(
        tap((query) => {
          if (callback) {
            callback(query);
          }
        }),
        share()
      )!;
    }
    this.setQuery(table, query);
  }
}
