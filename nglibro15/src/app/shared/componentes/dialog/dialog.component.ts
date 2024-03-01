import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
// import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, share, tap, EMPTY } from 'rxjs';
import { ModalData, fkValues, stringString, tableQueries } from '../../../interfaces/generic.interface';
import { CrudService } from '../../services/crud/crud.service';
import { ForeignKeysService } from '../../services/foreign-keys/foreign-keys.service';

import { modalDataObject, lowerUpperTables, validator, environment } from '../../../../environments/environment';
import { IconsService } from '../../services/icons/icons.service';
import { LabelsService } from '../../services/labels/labels.service';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { CommonModule, NgFor, formatDate } from '@angular/common';
import { selectValidator } from '../../directives/select-validator/select-validator.directive';

import { ColorService } from '../../services/color-service/color.service';

import { MessageService } from '../../services/message/message.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  implements OnInit, OnDestroy {

data: any = {}

  @Output() newItemEvent = new EventEmitter<string>();

  formModal!: FormGroup;
  idsMap = new Map<string, number>;
  queries: tableQueries = {};
  modalData!: ModalData;
  textAreaFields: string[] = [];
  defaultValues: any = {};

  lowerUpper = lowerUpperTables;

  objcolors = environment.colors;

  bgmodal!: string;
  modalbutton!: string;

  validator: any;

  // estados:Array<any> = [];

  getEntidad(): any  { return sessionStorage.getItem('Entidad')}
  getEstado():  any  { return sessionStorage.getItem('Estado')}
  getAccion():  any  { return sessionStorage.getItem('Accion')}
  setSession(tipo:string, valor:string) { sessionStorage.setItem(tipo, valor)  }

  freeTables: string[] = [];

  requiredBySelTree = new Map<string, string[]>();
  considerReqSel = false;

  // registro: any;

  valores: any;
  emptyString = 0;

  editable_dialog = false;

  existe_table:any = [];

  addMessage(value: any) {
    // console.log('msg',value);
    this.newItemEvent.emit(value);
  }

  constructor(  private mensaje: MessageService,
    private crud: CrudService,
  private fKeysService: ForeignKeysService ,
  private fb: FormBuilder,

  private cs : ColorService,
  private iconsService: IconsService,
  private labelsService: LabelsService,
  private selIdsService: SelectionIdsService,
  ) {


    this.mensaje.msg.subscribe(msg => {
      // console.log('msg',msg)
      if (msg.registro) {
        /*
        if (data.tabla == 'Matricula') {
          this.formModal.get('alumno')?.disable();
          this.formModal.get('apoderado')?.disable();
         }
        */
      }
      else {

        this.deleteForm();


      }

      if (msg?.registro?.id == 0) { this.editable_dialog = true }

     this.data = msg
    })


 cs.msg.subscribe(color =>  {

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
    if ( !this.data.hasOwnProperty('title') ) {
      this.data['title'] = this.labelsService.getTableLabel(this.data.mainTable!);
    }
  }

  ngOnInit(): void {

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

    this.getValues(); // Obtengo los valores de form
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
    if (this.data.registro.id != 0) { this.setDisable() }

  }

  setEnable() {
    this.modalData = modalDataObject[this.data.tabla];
    this.modalData.tables.forEach(t => this.formModal.get(t)?.enable())
    this.modalData.textFields.forEach(t => this.formModal.get(t)?.enable())
    this.modalData.dateFields.forEach(t => this.formModal.get(t)?.enable())
    this.editable_dialog = true;

  }

  setDisable() {

    this.modalData.tables.forEach(t => this.formModal.get(t)?.disable())
    this.modalData.textFields.forEach(t => this.formModal.get(t)?.disable())
    this.modalData.dateFields.forEach(t => this.formModal.get(t)?.disable())

  }

  ngOnDestroy(): void {
    this.deleteForm();
  }

  getValues = () : any =>   {
    let values: any = {};
    let tables: fkValues = {};
    let texts: stringString = {};
    let dates: any =  {};
    let hidden: any = {};

    this.modalData.tables.forEach((tab: string) => {

      const aux = this.data.registro.tablas[tab];
      if ( aux == undefined) {
        tables[tab] = this.data.registro.tablas[lowerUpperTables[tab]]?.id || 0;

      } else {
        tables[tab] = aux.id;

      }
    });

    // console.log('1.- tables',tables);

    this.modalData.textFields.forEach((text:any) => texts[text] = this.data.registro.textos[text])

    // console.log('2.- texts', texts);

    this.modalData.dateFields.forEach((date:any) => dates[date] = this.data.registro.fechas[date])

    // console.log('3.- dates', dates)

    this.modalData.hidden.forEach((hidd:any) => hidden[hidd] = this.data.registro.ocultos[hidd])

    console.log('4.- hidden', hidden);

    values['tablas'] = tables;
    values['textos'] = texts;
    values['fechas'] = dates;
    values['hidden'] = hidden;

    // console.log('values', values);

    this.valores =  values;

  }


  generateForm() {

    const validateTextform = (campo: string) : ValidatorFn[] => {
            return this.validator.modalText[campo];
    }

  const validateDateForm = (campo: string) :  ValidatorFn[] => {
      // console.log('fecha',campo,this.validator.modalDate[campo]);
      return this.validator.modalDate[campo];
    }

    // console.log('data.registro.id',this.data.registro.id)
    this.formModal.addControl('id', this.fb.control(this.data.registro.id ));
    if (this.data.registro.id == 0)
    {
      this.modalData.tables.forEach((table: string) => this.formModal.addControl(table, this.fb.control(this.valores['tablas'][table], selectValidator())));
      this.modalData.textFields.forEach((text: string) => {
        var value = this.modalData.defaultValues[text];
        if ( value == undefined ) { value = ''; }
        this.formModal.addControl(text,
          this.fb.control(value, {updateOn: 'blur'}));
        this.formModal.controls[text].addValidators(validateTextform(text));
      });
      this.modalData.dateFields.forEach((date: string) => {
        var value = this.modalData.defaultValues[date];
        if ( value == undefined ) { value = ''; }
        else if (value == 'today') {
          value = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        }
        this.formModal.addControl(date, this.fb.control(value, validateDateForm(date)));
    });
      /*  ya esta
      this.modalData.hidden.forEach((hden:any) => {
        this.formModal.addControl(hden, this.fb.control(this.valores.hidden[hden]));
        console.log('HIDDEN:',this.valores.hidden[hden])
      });
      */
    } else {
      this.modalData.tables.forEach((tabla:any) => {
       //  console.log('1.-',tabla, this.valores['tablas'][tabla]);
        this.formModal.addControl(tabla, this.fb.control(this.valores['tablas'][tabla], selectValidator()))
    });
      this.modalData.textFields.forEach((texto: any) => {
       //  console.log('2.-',texto, this.valores['textos'][texto]);
        this.formModal.addControl(texto, this.fb.control(this.valores['textos'][texto], validateTextform(texto) ))
    });
      this.modalData.dateFields.forEach((fecha:any) => {
       //  console.log('3.-',fecha, this.valores['fechas'][fecha]);
        this.formModal.addControl(fecha, this.fb.control(formatDate(this.valores['fechas'][fecha],'yyyy-MM-dd','en'), validateDateForm(fecha)))
    });
    }

    this.modalData.hidden.forEach((hidden: string) => {
      console.log('4.-',hidden, this.valores['hidden'][hidden]);
      this.formModal.addControl(hidden, this.fb.control(this.valores['hidden'][hidden]))
    });

    console.log('FORM1',this.formModal.value);

    if (this.data.tabla == 'Matricula') {
      // this.formModal.get('alumno')?.disable();
      // this.formModal.get('apoderado')?.disable();

      // this.formModal.addControl('alumno', this.fb.control('1'));
      // this.formModal.addControl('apoderado', this.fb.control('5'))

     }

     console.log('FORM2',this.formModal.value);

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

  cancelar() {
    this.formModal.reset();

    this.setSession('Entidad','alumno');
    this.setSession('Estado','pre-consulta');
    this.setSession('Accion','buscar')
    this.mensaje.nextMsg({})

  }

  postDataUsuario(): Observable<any> {
    return this.crud.getIdforName('tipousuario',this.modalData.mainTable)
  }

  ngOnSubmit() {


    if (this.editable_dialog==true) {

    let ids: any = [];
    let obj: any = {};
    let hidden:any = {};

    this.modalData.textFields.forEach( (texto: string) => {

      obj[texto] = this.formModal.value[texto]
    });
    // console.log(this.formModal.value);  // aca esta el problema hidden no esta en form
    this.modalData.hidden.forEach( (h: string) => {
      // console.log('hh',h)
      hidden[h] = this.formModal.value[h]
    });


    this.modalData.dateFields.forEach( (fecha: string) => {
      if (this.formModal.value[fecha]=="") {
        obj[fecha] = null;
      }
      else {
        obj[fecha] = this.formModal.value[fecha]
      }

    });


    obj['id'] = this.formModal.value.id

    if (+obj['id'] == 0) {  // If POST

      this.fKeysService.getFKeys(this.modalData.mainTable)?.forEach(
        fKey => {
          let fk = this.formModal.value[fKey];
          if ( fk == undefined ) {
            fk = this.formModal.value[fKey+'H']
          } else {
            fk = +fk;
          }
          ids.push(fk);
        }
      );

      this.setSession('Estado','ingresado')

      if (this.modalData.mainTable == 'alumno' || this.modalData.mainTable == 'apoderado') {
        this.crud.getLasId().pipe(
          tap(last => {

            ids[0] = (last.max +1) // => usuarioId

            obj['rut'] = this.data.rut;

            this.postDataUsuario()
            .subscribe(tipousuario => {
              this.crud.postData({id:ids[0]}, 'usuario',[tipousuario.id,1])
              .subscribe(() =>  this.crud.postData(obj, this.modalData.mainTable, ids)
                  .subscribe(msg => this.addMessage(msg)));

            })

          })

        )
        .subscribe(last => { ids[0] = (last.max +1)})
      } else if (this.modalData.mainTable == 'matricula') {


        console.log('obj', obj);
        console.log('ids',ids);
        console.log('hidden',hidden);
        

        this.crud.postData(obj, this.modalData.mainTable, ids)
        .subscribe(msg => this.addMessage(msg))

      }


    }
    else {   // If PUT

      this.modalData.tables.forEach((table:any) => obj[lowerUpperTables[table]] = this.formModal.value[table]);

      this.setSession('Estado','modificado')

      this.crud.putData(obj, this.modalData.mainTable).pipe(

        ).subscribe(msg => {
          this.addMessage({data: obj, message: msg.message});
          this.editable_dialog=false;
        });

    }

  }
  else {
    this.addMessage("");
  }
 }
}
