import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../../services/crud/crud.service';
import { ForeignKeysService } from '../../services/foreign-keys/foreign-keys.service';
import { LabelsService } from '../../services/labels/labels.service';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../services/subscriptions-manager/subscriptions-manager.service';
import { Alert } from '../../../interfaces/generic.interface';
import { IconsService } from '../../services/icons/icons.service';

import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'checkbox-calendar',
  templateUrl: './checkbox-calendar.component.html',
  styleUrls: ['./checkbox-calendar.component.css']
})
export class CheckboxCalendarComponent  implements OnInit, OnDestroy {

  @Input('disable_check')
  disable_check!:any;

  @Input('title')
  title = '';

  @Input('table')
  table!: string;

  @Input('check-field')
  checkField!: string;

  @Input('update-if-selected')
  updateIfSelected: string[] = [];

  @Input('row-fk-table')
  rowTable!: string;

  @Input('year-table')
  yearTable!: string;

  @Input('month-table')
  monthTable!: string;

  @Input('holidays-table')
  holidaysTable!: string;

  @Input('day-number-field')
  dayNumberField!: string;

  @Input('max-rows-number')
  maxRows: number = 50;

  @Input('max-columns-number')
  maxColumns: number = 40;

  @Input('populate-function')
  populateFunction!: Function;

  objcolors = environment.colors;

  bodybgcolor!:string;
  tablehead!:string;
  pagination!:string;
  modalbutton!: string;

  opacity = environment.opacity;

  daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  rowTableUpper: string = '';

  mainTableForeignKeys!: string[];
  mainQuery$!: Observable<any>;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = environment.cabecera.margen_superior_tabla;

  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height + 155) + 'px';
  }

  errorAlert = {
    id: 'error',
    type: 'warning',
    message: 'Ha ocurrido un error.',
    show: false,
  };
  successfulSaveAlert = {
    id: 'save-success',
    type: 'success',
    message: 'Datos guardados con éxito.',
    show: false,
  };
  alerts: Alert[] = [];

  emptyTable = true;
  nRows = 0;
  nColumns = 0;
  rowLabels: string[] = [];
  rowTooltips: string[] = [];

  // ----
  // fecha actual
  today!: Date;
  colToday = 0;
  currentDateInMonth = false;

  // disable = true;
  currentDate:Date = new Date();

  // ----
  // mes seleccionado
  daysInMonth = 30; // numero de dias del mes seleccionado
  dayIndicesInWeek: number[] = []; // del 0 al 6

  columnEnabled: Map<number, boolean> = new Map();
  columnIsGrey: Map<number, boolean> = new Map();
  columnLabelInRed: Map<number, boolean> = new Map();

  colIndices: number[] = [];
  // selected[rowLabel][j]: value at row with label "rowLabel" and column "j"
  selected: Map<string, Map<number, boolean>> = new Map();
  totalChecked: Map<number, number> = new Map();
  totalChechedToday = 0;
  edited: Map<string, Set<number>> = new Map();

  entryIdToday: Map<string, number> = new Map();
  checkBoxesToday: Map<string, boolean> = new Map();
  editedCheckBoxes: Map<string, boolean> = new Map();
  numEditedCheckBoxes = 0;
  saveValuesDisabled = true;

  constructor(
    private crud: CrudService,
    private fkService: ForeignKeysService,
    private selIdsService: SelectionIdsService,
    private subsManagerService: SubscriptionsManagerService,
    private labelsService: LabelsService,
    private iconsService: IconsService,
    private configAlert: NgbAlertConfig,

  ) {
    this.configAlert.dismissible = false;

    const getPermision = (msg: any) => { if(msg) {
      const year = this.currentDate.getFullYear();
      // this.disable = this.disable_check.editar
      }

    }

    const getColor = (color:string | null) => {

      if (color=='primary' || !color) {
        this.bodybgcolor = this.objcolors.primary.bodybgcolor;
        this.pagination = this.objcolors.primary.pagination;
        this.tablehead = this.objcolors.primary.tablehead;
        this.modalbutton = this.objcolors.primary.modalbutton;

      }
      if (color=='success') {
        this.bodybgcolor = this.objcolors.success.bodybgcolor;
        this.pagination = this.objcolors.success.pagination;
        this.tablehead = this.objcolors.success.tablehead;
        this.modalbutton = this.objcolors.success.modalbutton;
      }
      if (color=='info') {
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.tablehead;
        this.modalbutton = this.objcolors.info.modalbutton;
      }
    }
    this.usuario$.subscribe(info => {
      if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
      else { getColor(localStorage.getItem('Color')) }
    });

    /*
      this.userInfo.personalInfo$.subscribe(info => info.inscripcionColegio.forEach((el:any) => {
        getPermision({esUtp: el.esUtp,anno: el.Anno, colegio: el.Colegio.id});
        getColor(info.personalInfo.usuario.Tema.nombre);
      }))
    */
}


  ngOnInit() {
    this.mainTableForeignKeys = this.fkService.getFKeys(this.table)!;

    this.rowTableUpper = this.labelsService.lowerToUpperTable(this.rowTable)!;
    this.selIdsService.subscribe('checkbox-grid', (q: any) =>
      this.updateData(q)
    );
    this.alerts.push(this.successfulSaveAlert);
    this.alerts.push(this.errorAlert);
  }

  ngOnDestroy() {
    this.subsManagerService.unsubscribeAll();
    if (this.currentDateInMonth) {
      this.saveValues();
    }
  }

  getBiClass(route: string) {
    // permite acceder a iconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  displayAlert(alerta: Alert, delayMilliseconds: number) {
    alerta.show = true;
    this.closeAlert(alerta, delayMilliseconds);
  }

  closeAlert(alert: Alert, delayMilliseconds: number | null = null) {
    if (delayMilliseconds) {
      setTimeout(() => (alert.show = false), delayMilliseconds);
    } else {
      alert.show = false;
    }
  }

  setGridSize(rowNumber: number, columnNumber: number) {
    if (rowNumber) {
      this.nRows = rowNumber;
    }
    if (columnNumber) {
      this.nColumns = columnNumber;
    }
    this.colIndices = [];
    for ( let c = 0; c < this.nColumns; c++ ) {
      this.colIndices.push(c);
    }
  }

  setColumnLabelInRed(colIndex: number, value: boolean) {
    this.columnLabelInRed.set(colIndex, value);
  }

  //setColumnEnabled(colIndex: number, value: boolean) {   uvr
  //  this.columnEnabled.set(colIndex, value);
  //}

  setColumnIsGrey(colIndex: number, value: boolean) {
    this.columnIsGrey.set(colIndex, value);
  }

  toggleCheckBox(rowLabel: string) {
    const newValue = !this.checkBoxesToday.get(rowLabel);
    this.checkBoxesToday.set(rowLabel, newValue);
    const newValue2 = !this.editedCheckBoxes.get(rowLabel);
    this.editedCheckBoxes.set(rowLabel, newValue2);
    this.totalChechedToday += newValue ? 1 : -1;
    this.numEditedCheckBoxes += newValue2 ? 1 : -1;
    this.saveValuesDisabled = this.numEditedCheckBoxes === 0;
    this.saveValues();
  }

  getForeignKeys(table: string) {
    return this.selIdsService.getIds(this.fkService.getFKeys(table)!);
  }

  getForeignKeysOfMainTable() {
    return this.selIdsService.getIds(this.mainTableForeignKeys);
  }

  updateData(message: any) {

    this.entryIdToday.clear();
    this.checkBoxesToday.clear();
    this.editedCheckBoxes.clear();
    this.rowLabels = [];
    this.dayIndicesInWeek = [];
    this.nRows = 0;
    this.nColumns = 0;
    this.emptyTable = true;
    for (let tbl of this.updateIfSelected) {
      if (this.selIdsService.getId(tbl) === 0) {
        // just don't update
        return;
      }
    }
    this.emptyTable = false;
    const subscription = this.crud
      .getData(this.table, this.getForeignKeysOfMainTable())!
      .subscribe((query) => {
        if (query.length > 0) {
          this.processQuery(query);
        } else {
          this.populateFunction((aux: any) => {
            this.updateData(aux);
          });
        }
      });
    this.subsManagerService.registerSubscription(
      subscription,
      'checkbox-calendar-main-table'
    );
  }

  processQuery(query: any) {
    // selected year and month
    const selYear = parseInt(this.selIdsService.getText(this.yearTable));
    // supuesto: ID=1 para enero, ID=2 para febrero, ...
    const selMonthId = this.selIdsService.getId(this.monthTable);
    // week-index of first day of the month
    // this.today = new Date();
    this.today = new Date();  // uvr
    this.colToday = this.today.getDate() - 1;
    this.currentDateInMonth =
      this.today.getMonth() === selMonthId - 1 &&
      this.today.getFullYear() === selYear;
    this.daysInMonth = new Date(selYear, selMonthId, 0).getDate();
    // 0: Lu, 1: Ma, 2: Mi, ...
    const dayOfWeekFirstDay =
      (new Date(selYear, selMonthId - 1, 1).getDay() + 6) % 7;

    const subscription = this.crud
      .getDataCustom(this.holidaysTable, 'getYearMonth', [], {
        anno: selYear,
        mes: selMonthId,
      })
      .subscribe((qry) => {
        for (let i = 0; i < this.daysInMonth; i++) {
          const dow = (dayOfWeekFirstDay + i) % 7;
          this.columnEnabled.set(i, false);
          this.columnIsGrey.set(i, dow > 4);
          this.columnLabelInRed.set(i, false);
          this.dayIndicesInWeek.push(dow);
        }

        for (let object of qry) {
          const holidayIndex =
            parseInt(object.fecha.toString().split('-')[2]) - 1;
          this.columnIsGrey.set(holidayIndex, true);
          this.columnLabelInRed.set(holidayIndex, true);
        }
        if (this.currentDateInMonth && !this.columnIsGrey.get(this.colToday)) {
          console.log(this.disable_check.editar);
          this.columnEnabled.set(this.colToday, true && !this.disable_check.editar);
        }

        this.selected.clear();
        this.totalChechedToday = 0;
        for (let i = 0; i < 31; i++) {
          this.totalChecked.set(i, 0);
        }

        let id2label = new Map();
        // (1) extract row labels, presente values
        let rowIds = new Set();
        for (let object of query) {
          const rowId = object[this.rowTableUpper].id;
          let label = id2label.get(rowId);
          if (label == undefined) {
            rowIds.add(rowId);
            label = this.labelsService.getObjectLabel(
              this.rowTable,
              object[this.rowTableUpper]
            );
            id2label.set(rowId, label);
            this.rowLabels.push(label);
            let newCheckedMap = new Map();
            this.selected.set(label, newCheckedMap);
          }
          const colIndex = object[this.dayNumberField] - 1;
          this.selected.get(label)!.set(colIndex, object[this.checkField]);
          if (object[this.checkField]) {
            this.totalChecked.set(
              colIndex,
              this.totalChecked.get(colIndex)! + 1
            );
          }
          if (this.currentDateInMonth && colIndex == this.colToday) {
            this.entryIdToday.set(label, object.id);
          }
        }
        if (this.currentDateInMonth) {
          this.totalChechedToday = this.totalChecked.get(this.colToday)!;
        }
        this.emptyTable = this.selected.size === 0;
        this.rowLabels.sort();
        this.setGridSize(this.rowLabels.length, this.dayIndicesInWeek.length);
        if (this.currentDateInMonth) {
          for (let rowLabel of this.rowLabels) {
            this.editedCheckBoxes.set(rowLabel, false);
            this.checkBoxesToday.set(
              rowLabel,
              this.selected.get(rowLabel)!.get(this.colToday)!
            );
          }
        }
        this.rowTooltips = this.rowLabels;
      });
    this.subsManagerService.registerSubscription(
      subscription,
      'checkbox-calendar-holidays'
    );
  }

  totalAtColumn(column: number) {

    if (this.currentDateInMonth) {
      if (this.colToday == column) {
        return this.totalChechedToday;
      } else if (column < this.colToday) {
        return this.totalChecked.get(column);
      }
      return null;
    }
    return this.totalChecked.get(column);
  }

  saveValues() {
    if (this.numEditedCheckBoxes === 0) {
      return;
    }
    // Veamos que checkboxes han sido cambiados
    let editedRowLabels = [];
    for (let [rowLabel, isEdited] of this.editedCheckBoxes) {
      if (isEdited) {
        editedRowLabels.push(rowLabel);
      }
    }
    let counter = 0;
    const numEditedInicial = this.numEditedCheckBoxes;
    for (let rowLabel of editedRowLabels) {
      const newValue = {
        id: this.entryIdToday.get(rowLabel),
        presente: this.checkBoxesToday.get(rowLabel),
      };
      this.crud.putData(newValue, this.table).subscribe((response) => {
        counter++;
        if (response ? response.success : false) {
          this.numEditedCheckBoxes--;
          this.editedCheckBoxes.set(rowLabel, false);
        }
        if (counter === numEditedInicial) {
          if (this.numEditedCheckBoxes === 0) {
            // exito!
            this.displayAlert(this.successfulSaveAlert, 800);
            this.saveValuesDisabled = true;
          } else {
            // algo no se guardo
            this.displayAlert(this.errorAlert, 3000);
          }
        }
      });
    }
  }

}
