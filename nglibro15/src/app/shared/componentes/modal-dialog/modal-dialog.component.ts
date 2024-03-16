import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';


import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, share, tap, EMPTY } from 'rxjs';
import { ModalData, fkValues, stringString, tableQueries } from '../../../interfaces/generic.interface';
import { CrudService } from '../../services/crud/crud.service';
import { ForeignKeysService } from '../../services/foreign-keys/foreign-keys.service';

import { modalDataObject, lowerUpperTables, validator, environment, personTables } from '../../../../environments/environment';
import { IconsService } from '../../services/icons/icons.service';
import { LabelsService } from '../../services/labels/labels.service';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { CommonModule, DOCUMENT, NgFor, formatDate } from '@angular/common';
import { selectValidator } from '../../directives/select-validator/select-validator.directive';
import { horaValidator} from '../../directives/hora-validator/hora-validator.directive';
import { MessageService } from '../../services/message/message.service';
import { ProfeValidatorsDirective } from '../../directives/profe-validator/profe-validator.directive';

@Component({
    selector: 'modal-dialog',
    templateUrl: 'modal-dialog.component.html',
    styleUrls: ['modal-dialog.component.css'],
    providers: [ForeignKeysService, MessageService, ProfeValidatorsDirective],
  })
  export class ModalDialogComponent implements OnInit, OnDestroy {

    formModal!: FormGroup;
    idsMap = new Map<string, number>;
    queries: tableQueries = {};
    modalData!: ModalData;
    textAreaFields: string[] = [];
    defaultValues: any = {};

    selectedteacher = 0

    objcolors = environment.colors;

    bgmodal!: string;
    modalbutton!: string;

    validator: any;

    freeTables: string[] = [];
    // requiredBySelTree.get(tbl): selectors that require "tbl" to be selected
    requiredBySelTree = new Map<string, string[]>();
    considerReqSel = false;

    registro: any;
    valores: any;
    emptyString = 0;

    existe_table:any = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private pval: ProfeValidatorsDirective,
    @Inject(DOCUMENT) private document: Document,
    private crud: CrudService,
    private fKeysService: ForeignKeysService ,
    private fb: FormBuilder,
    // private validateHora: ValidaHorarioService,
    private ms : MessageService,
    private iconsService: IconsService,
    private labelsService: LabelsService,
    
    private selIdsService: SelectionIdsService,

    ) {

   ms.profesor_msg.subscribe(p => console.log('PORONGAAA', p));

   ms.color_msg.subscribe(color =>  {

      //  TODO  Asignar dinamicamente los indices

      if (color=='azul') {

        this.bgmodal = this.objcolors.azul.bgmodal;
        this.modalbutton = this.objcolors.azul.modalbutton;

      }
      else if (color=='verde') {

        this.bgmodal = this.objcolors.verde.bgmodal;
        this.modalbutton = this.objcolors.verde.modalbutton;

      }
      else if (color=='naranjo') {

        this.bgmodal =  this.objcolors.naranjo.bgmodal;
        this.modalbutton =  this.objcolors.naranjo.modalbutton;

      }

    }
   )

      this.formModal = new FormGroup({});
      if ( !data.hasOwnProperty('title') ) {
        data['title'] = this.labelsService.getTableLabel(data.mainTable!);
      }
    }

    ngOnInit(): void {

      if(this.data.mainTable == 'horario') {
        this.selectedteacher = this.data.registro.Profesor.id;
      }
      this.modalData = modalDataObject[this.data.tabla];

      if (this.modalData.textAreaFields!= undefined) {
        this.textAreaFields = this.modalData.textAreaFields;
      }
      if ( this.modalData.defaultValues != undefined) {
        this.defaultValues = this.modalData.defaultValues;
      }

      this.validator = validator[this.data.tabla]
      this.considerReqSel = false;
      this.modalData.tables.forEach(
      (table: string) => { 
        this.queries[table] = EMPTY;
        this.idsMap.set(table, 0);
        this.requiredBySelTree.set(table, []);
      });
      this.registro = this.data.registro;
    
      this.getFKValues(); // Obtengo los valores de Fk
      this.generateForm(); // Crea Forms
      this.modalData.tables.forEach(
        (tb: string) => this.idsMap.set(tb, this.valores.tablas[tb]));
      this.modalData.tables.forEach((table: string) => {
        const fKeyTables = this.fKeysService.getFKeys(table);
        let foreignKeys: string[] = [];
        fKeyTables?.forEach(tb => {
          if ( !this.modalData.ignoreFkRequirements.includes(tb) && this.modalData.tables.includes(tb) ) {
            foreignKeys.push(tb);
            this.requiredBySelTree.get(tb)?.push(table);
          }
        });
        if( foreignKeys.length === 0 ) {
          this.freeTables.push(table);
        } else {
          if ( !this.doEnableCondition(table) ) {
            this.formModal.get(table)!.disable();
          }
          this.considerReqSel = true;
        }
      });

      if ( !this.considerReqSel ) {
      this.freeTables = this.modalData.tables;
      }
      this.modalData.tables.forEach(table => {
        this.queryTable(table, this.getForeignKeysOfTable(table));
      });
    }

    ngOnDestroy(): void {
      this.deleteForm();
    }

    getFKValues = () : any =>   {
      let values: any = {};
      let tables: fkValues = {};
      let texts: stringString = {};
      let dates: any =  {};
      let hidden: any = {};
      this.modalData.tables.forEach((tab: string) => {

        const aux = this.registro[tab];
        if ( aux == undefined) {
          tables[tab] = this.registro[lowerUpperTables[tab]].id;
        } else {
          tables[tab] = aux.id;
        }
      });

      this.modalData.textFields.forEach((text:any) => texts[text] = this.registro[text])
      this.modalData.dateFields.forEach((date:any) => dates[date] = this.registro[date])
      this.modalData.hidden.forEach((hid:any) => {
        hidden[hid] = this.registro[lowerUpperTables[hid]].id;
      })

      values['tablas'] = tables;
      values['textos'] = texts;
      values['fechas'] = dates;
      values['hidden'] = hidden;

      this.valores =  values;

    }


    generateForm() {

      const validateTextForm = (campo: string) : ValidatorFn[] => {

        if (campo=='hora' && this.modalData.mainTable == 'horario') {
          
          return [ ...this.validator.modalText[campo],
          horaValidator(this.data.valida1,this.data.registro.Dix.id),
          this.pval.profeValidator(this.data.valida2,this.data.registro.Dix.id, this.selectedteacher)  ]
       }
       else {
         return this.validator.modalText[campo];
     }

      }

      const validateDateForm = (campo: string) :  ValidatorFn[] => {

        return this.validator.modalDate[campo];
      }

      this.formModal.addControl('id', this.fb.control(this.registro.id ));
      if (this.registro.id == 0)
      {
        this.modalData.tables.forEach((table: string) => this.formModal.addControl(table, this.fb.control(this.valores['tablas'][table], selectValidator())));
        this.modalData.textFields.forEach((text: string) => {
          var value = this.modalData.defaultValues[text];
          if ( value == undefined ) { value = ''; }
          this.formModal.addControl(text,
            this.fb.control(value, {updateOn: 'blur'}));
          this.formModal.controls[text].addValidators(validateTextForm(text));
        });
        this.modalData.dateFields.forEach((date: string) => {
          var value = this.modalData.defaultValues[date];
          if ( value == undefined ) { value = ''; }
          else if (value == 'today') {
            value = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          }
          this.formModal.addControl(date, this.fb.control(value, validateDateForm(date)));
      });

      } else {
        this.modalData.tables.forEach((tabla:any) => this.formModal.addControl(tabla, this.fb.control(this.valores['tablas'][tabla], selectValidator())));
        this.modalData.textFields.forEach((texto: any) => this.formModal.addControl(texto, this.fb.control(this.valores['textos'][texto], validateTextForm(texto) )));
        this.modalData.dateFields.forEach((fecha:any) => this.formModal.addControl(fecha, this.fb.control(formatDate(this.valores['fechas'][fecha],'yyyy-MM-dd','en'), validateDateForm(fecha))));
      }

      this.modalData.hidden.forEach((hidden: string) => this.formModal.addControl(hidden, this.fb.control(this.valores['hidden'][hidden])));
    }


    deleteForm() {
      Object.keys(this.formModal.controls).forEach(
        name => this.formModal.removeControl(name));
    }

    setQuery(table: string, query: Observable<any>) {
      this.queries[table] = query;
    }

    getQuery(table: string) {
      return this.queries[table];
    }

    queryTable(table: string, fkIds: number[] | null = null,
      callback: Function | null = null) {
      this.setQuery(table,
        this.crud.getData(table, (fkIds?.length === 0) ? null : fkIds)?.pipe(
          tap(query => {
            if ( callback ) {
              callback(query);
            }
          }),
          share()
        )!);
      }

    getForeignKeysOfTable(table: string) : number[] | null {
      let fKeys = [];
      for ( let t of this.fKeysService.getFKeys(table)! ) {
        const newId = this.idsMap.get(t);
        fKeys.push( newId? newId : 0);
      }
      if (fKeys.length === 0) {
        return null;
      }
      return fKeys;
    }

    // allForeignKeysSetOrIgnored(table: string) {
    //   for ( let t of this.fKeysService.getFKeys(table)!) {
    //     if ( this.modalData.ignoreFkRequirements.includes(t) ) {
    //       continue;
    //     }
    //     if ( this.idsMap.get(t) === 0 ){
    //       return false;
    //     }
    //   }
    //   return true;
    // }

    doEnableCondition(table: string) {
      let doEnable = true;
      for ( let tb of this.fKeysService.getFKeys(table)! ) {
        if ( (this.idsMap.get(tb) === 0) ) {
          doEnable = false;
          break;
        }
      }
      return doEnable;
    }

    enableIfRequiredSelected(table: string) {
      // check if all required selectors have been set
      let doEnable = this.doEnableCondition(table);
      if ( doEnable ) {
        this.formModal.get(table)!.enable();
      } else {
        this.idsMap.set(table, 0);
        this.formModal.get(table)!.disable();
        this.formModal.get(table)!.setValue(0);
      }
    }

    changeFunction(table: string, event: any) {
      
      if (table == 'profesor') {
        console.log(table, +event.target.value)
        // this.selectedteacher = +event.target.value; 
        this.ms.nextProfesor(+event.target.value);
      }
      const newId = +event.target.value;
      
      this.idsMap.set(table, newId);
      if ( newId === 0 ) {
        this.requiredBySelTree.get(table)!.forEach(
          tb => this.idsMap.set(tb, 0));
      }
      if ( this.considerReqSel ) {
        for ( let tbl of this.requiredBySelTree.get(table)!) {
          this.enableIfRequiredSelected(tbl);
          if ( this.formModal.get(tbl)!.enabled ) {
            this.queryTable(tbl, this.getForeignKeysOfTable(tbl));
          }
        }
      }

    }

    getBiClass() {
      // para usar IconsService.getBiClass desde html
      const route = `/${this.modalData.mainTable}`;
      return this.iconsService.getBiClass(route);
    }

    getTableLabel(table: string) {
      // para usar LabelsService.getTableLabel desde html
      return this.labelsService.getTableLabel(table);
    }

    getAttributeLabel(table: string, attribute: string) {
      // para usar LabelsService.getAttributeLabel desde html
      return this.labelsService.getAttributeLabel(table, attribute);
    }

    getObjectLabel(table: string, object: Object) {
      // para usar LabelsService.getObjectLabel desde html
      return this.labelsService.getObjectLabel(table, object);
    }

    onSubmit() {

      let ids: any = [];
      let obj: any = {};

      this.modalData.textFields.forEach( (texto: string) => {

        obj[texto] = this.formModal.value[texto]
      });
      this.modalData.dateFields.forEach( (fecha: string) => {
        obj[fecha] = this.formModal.value[fecha];
      });

      obj['id'] = this.formModal.value.id

      if (+this.formModal.value.id == 0) {  // If POST
        this.fKeysService.getFKeys(this.modalData.mainTable)?.forEach(
          fKey => {
            let fk = this.formModal.value[fKey];
            if ( fk == undefined ) {
              fk = this.selIdsService.getId(fKey)
            } else {
              fk = +fk;
            }
            ids.push(fk);
          }
        );

        /* Sección Ajustes */

        if (this.data.mainTable == 'horario') { ids[5] = this.registro.Dix.id }

        this.ms.userId.subscribe((userId:any) => {


          if (userId && personTables.includes(this.modalData.mainTable)) {  ids[0] = userId   } 
          if (userId && this.modalData.mainTable == 'anotacion') { ids[1] = userId }

         
        })     
        
        this.crud.postData(obj, this.modalData.mainTable, ids).pipe(
          tap(() => this.selIdsService.notifyUpdated()),
        )
        .subscribe(msg => this.document.defaultView?.alert(msg.message));
        
      }
      else {   // If PUT
        this.modalData.tables.forEach((table:any) => obj[lowerUpperTables[table]] = this.formModal.value[table]);

        this.crud.putData(obj, this.modalData.mainTable).pipe(
          tap(() => this.selIdsService.notifyUpdated())
          ).subscribe(msg =>  this.document.defaultView?.alert(msg.message));

      }
    }
  }

