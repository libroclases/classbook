import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';


import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, share, tap, EMPTY, map, concatMap, concat } from 'rxjs';
import { ModalData, fkValues, stringString, tableQueries } from '../../../interfaces/generic.interface';
import { CrudService } from '../../services/crud/crud.service';
import { ForeignKeysService } from '../../services/foreign-keys/foreign-keys.service';

import { modalDataObject, lowerUpperTables, validator, environment, personTables } from 'src/environments/environment';
import { IconsService } from '../../services/icons/icons.service';
import { LabelsService } from '../../services/labels/labels.service';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { formatDate } from '@angular/common';
import { selectValidator } from '../../directives/select-validator/select-validator.directive';
import { horaValidator} from '../../directives/hora-validator/hora-validator.directive';

import { ProfeValidatorsDirective } from '../../directives/profe-validator/profe-validator.directive';

import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { MessageService } from '../../services/message/message.service';

function zfill(number: number, width: number) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
      if (number < 0) {
           return ("-" + numberOutput.toString());
      } else {
           return numberOutput.toString();
      }
  } else {
      if (number < 0) {
          return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
          return ((zero.repeat(width - length)) + numberOutput.toString());
      }
  }
}

@Component({
    selector: 'modal-dialog',
    templateUrl: 'modal-dialog.component.html',
    styleUrls: ['modal-dialog.component.css'],
    providers: [ForeignKeysService, ProfeValidatorsDirective],
  })
  export class ModalDialogComponent implements OnInit, OnDestroy {

    formModal!: FormGroup;
    idsMap = new Map<string, number>;
    queries: tableQueries = {};
    modalData!: ModalData;
    textAreaFields: string[] = [];
    defaultValues: any = {};

    usuarioId=0;

    checked=false;

    selectedteacher = 0

    objcolors = environment.colors;

    bgmodal!:string;
    matbutton!:string;
    modalbutton!:string;

    validator: any;

    saveCheck(boolField: string, event: any) { console.log('mostra',boolField, event); }

    @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

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
    private toastr: ToastrService,
    private crud: CrudService,
    private fKeysService: ForeignKeysService ,
    private fb: FormBuilder,
    private iconsService: IconsService,
    private labelsService: LabelsService,
    private ms : MessageService,
    private selIdsService: SelectionIdsService,

    ) {

      this.usuario$.subscribe(info => {
        if (info.personalInfo) { this.usuarioId = info.personalInfo.datos_persona.id   }
        // if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
        // else { getColor(localStorage.getItem('Color')) }
      });



      this.formModal = new FormGroup({});
      if ( !data.hasOwnProperty('title') ) {
        data['title'] = this.labelsService.getTableLabel(data.mainTable!);
      }
    }

    ngOnInit(): void {

      this.bgmodal = this.data.registro.bgmodal;
      this.matbutton = this.data.registro.matbutton;

      if(this.data.mainTable == 'horario') {
        this.selectedteacher = this.data.registro.CursoProfesor.id;
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
      let boolean: any = {};
      // let hidden: any = {};
      this.modalData.tables.forEach((tab: string) => {

        const aux = this.registro[tab];
        if ( aux == undefined) {
          tables[tab] = this.registro[lowerUpperTables[tab]].id;
        } else {
          tables[tab] = aux.id;
        }
      });

      this.modalData.textFields.forEach((text:any) => texts[text] = this.registro[text]);
      this.modalData.dateFields.forEach((date:any) => dates[date] = this.registro[date]);
      this.modalData.booleanFields.forEach((bool:any) => boolean[bool] = this.registro[bool]);

      values['tablas'] = tables;
      values['textos'] = texts;
      values['fechas'] = dates;
      values['booleans'] = boolean;


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
      if (this.registro.id == 0)  // 0 significa nuevo
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

        this.modalData.booleanFields.forEach((bool:string) => {
          this.formModal.addControl(bool,this.fb.control(false))
        })

      } else {
        this.modalData.tables.forEach((tabla:any) => this.formModal.addControl(tabla, this.fb.control(this.valores['tablas'][tabla], selectValidator())));
        this.modalData.textFields.forEach((texto: any) => this.formModal.addControl(texto, this.fb.control(this.valores['textos'][texto], validateTextForm(texto) )));
        this.modalData.dateFields.forEach((fecha:any) => this.formModal.addControl(fecha, this.fb.control(formatDate(this.valores['fechas'][fecha],'yyyy-MM-dd','en'), validateDateForm(fecha))));
        this.modalData.booleanFields.forEach((bool:any) => this.formModal.addControl(bool, this.fb.control(this.valores['booleans'][bool])));
      }

      // this.modalData.hidden.forEach((hidden: string) => this.formModal.addControl(hidden, this.fb.control(this.valores['hidden'][hidden])));
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

        // this.selectedteacher = +event.target.value;
        this.ms.nextProfesor(+event.target.value); //  REVISAR : PASAR A SUBJECT
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
      this.modalData.booleanFields.forEach( (bool: string) => {
        obj[bool] = this.formModal.value[bool];
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


        if (this.data.mainTable == 'matricula') {


          ids[2] = this.registro.foraneas.apoderado;
          ids[3] = this.registro.foraneas.alumno;
          let fks: any = [ids[0],ids[1],ids[5],obj['incorporacion'].substring(5,7)*1,null,ids[3]]

          const anno = parseInt(obj['incorporacion'].substring(0,4));


          this.crud.getLastMatricula().pipe(
              map(last => last.max +1),
              tap(last => { obj['nombre'] = zfill(last,6); fks[4]=last; }),
              concatMap(() => this.crud.postData(obj, 'matricula', ids)),
          ).subscribe((res) => console.log(res))

          /*
            matricula:
              0: colegioId
              1: cursoId
              2: apoderadoId
              3: alumnoId
              4: vinculoId
              5: annoId
            asistencia:
              0: colegioId -> ids[0]
              1: cursoId -> ids[1]
              2: anoId -> ids[5]
              3: mesId -> obj['incorporacion'].substring(5,7)*1
              4: matriculaId -> res.max + 1
              5: alumnoId -> ids[3]
          */
        }
        else if (this.data.mainTable == 'horario') { // If horario
                ids[4] = this.registro.Dix.id;
        }
        else if (personTables.includes(this.modalData.mainTable)) { // If personTable

              ids[0] = this.registro.usuario_id
              // If persontable we need update usuario with operativo == true
              // Luego generar un token para autorización 2FA
              const usuario$ = this.crud.putData({id: ids[0], operativo:true}, 'usuario');
              const token$ = this.crud.createDataCustom({}, 'token','generate-secret',[ids[0]]);
              const concatened$ = usuario$.pipe(concatMap(() => token$));
              concatened$.subscribe((res) => console.log(res));
              
        }
        else if (this.modalData.mainTable == 'anotacion') { ids[1] = this.usuarioId } // If anotacion


        this.crud.postData(obj, this.modalData.mainTable, ids).pipe(
          tap(() => this.selIdsService.notifyUpdated()),
        )
        .subscribe(msg => this.showmsg(msg))
        

      }
      else {   // If PUT
        this.modalData.tables.forEach((table:any) => obj[lowerUpperTables[table]] = this.formModal.value[table]);
        if (this.modalData.mainTable == 'inscripcioncolegio') {
          obj['esPie'] = Array.from(obj['esPie'].toString())[0];
          obj['esUtp'] = Array.from(obj['esUtp'].toString())[0];
         }
        this.crud.putData(obj, this.modalData.mainTable).pipe(
          tap(() => this.selIdsService.notifyUpdated())
          ).subscribe(msg =>  this.showmsg(msg));

      }
    }

    borrar(value:any) {
      // ('mostra',value);
      let resultado = confirm('desea borrar el registro?');
      if (resultado) {
        this.crud.deleteData(value.id, this.modalData.mainTable).subscribe(msg => this.showmsg(msg))
    }
  }

    showmsg(msg:any) {
      if (msg?.message || Object.keys(msg).length > 0 ) {this.toastr.success(msg?.message, this.modalData.mainTable, {positionClass:'toast-top-right'})}
      else {this.toastr.error(msg?.error, this.modalData.mainTable)}
    }

  }

