import { Component, HostListener, Inject, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule, FormControl } from '@angular/forms';
/*
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
*/
import { modalDataObject, lowerUpperTables, validator, environment } from '../../../environments/environment';
// import { CommonModule, NgFor, NgIf, formatDate } from '@angular/common';
// import { DialogComponent } from '../../shared/componentes/dialog/dialog.component';
import { MessageService } from '../../shared/services/message/message.service';
import { rutValidator } from '../../shared/directives/rut-validator/rut-validator.directive';
import { CrudService } from '../../shared/services/crud/crud.service';
import { tap } from 'rxjs';
// import { ModalData } from '../../interfaces/generic.interface';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { ColorService } from '../../shared/services/color-service/color.service';

@Component({
  selector: 'app-matricula-alumno',
  templateUrl: './matricula-alumno.component.html',
  styleUrls: ['./matricula-alumno.component.css']
})
export class MatriculaAlumnoComponent implements OnInit {

  lowerUpperTables = lowerUpperTables;
  formConsulta!: FormGroup;

  modalDataObj!: any;

  msg:any;

  // data:any={};
  muestra_dialog=false;

  r_alumno:any = {};
  r_apoderado:any = {};

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;
  modalbutton!:any;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  url!:string;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  detalle_estado:any = {
        alumno : { titulo: "Matrícula - Datos Alumno", fase: "Paso 1/3" },
        apoderado : { titulo: "Matrícula - Datos Apoderado", fase: "Paso 2/3" },
        matricula : { titulo: "Matrícula - Datos Matrícula", fase: "Paso 3/3" }
      }

  ngOnInit() {

    sessionStorage.setItem('Entidad', 'alumno');
    this.modalDataObj = modalDataObject[lowerUpperTables[this.getEntidad()]];

    sessionStorage.setItem('Estado', 'pre-consulta');
    sessionStorage.setItem('Accion', 'buscar');
  }

  getEntidad(): any  { return sessionStorage.getItem('Entidad')}
  getEstado():  any  { return sessionStorage.getItem('Estado')}
  getAccion():  any  { return sessionStorage.getItem('Accion')}

  setSession(tipo:string, valor:string) { sessionStorage.setItem(tipo, valor)  }

  constructor(
    private mensaje: MessageService,
    private crud: CrudService,
    private cs : ColorService,
    private selIdsService: SelectionIdsService, ) {

      cs.msg.subscribe((color:any) =>  {


        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
          this.modalbutton = this.objcolors.azul.modalbutton;

        }
        if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
          this.modalbutton = this.objcolors.verde.modalbutton;

        }
        if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.tablehead;
          this.modalbutton = this.objcolors.naranjo.modalbutton;
        }

      })

      this.formConsulta = new FormGroup({
      rut_entidad : new FormControl('', rutValidator())

    })


  }

  reset() {
    this.formConsulta.reset();
    this.muestra_dialog = false;
    this.mensaje.nextMsg({})

  }
  cancelar() {
    this.formConsulta.reset();
    this.muestra_dialog = false;
    this.setSession('Entidad','alumno');
    this.setSession('Estado','pre-consulta');
    this.setSession('Accion','buscar')
    this.mensaje.nextMsg({})

  }
  // msg!:any
  closeMe(e: any) {

    // console.log('1.- entidad',this.getEntidad());
    // console.log('1.- data',e.data);

    if (e.data) {

      // console.log('2.- entidad',this.getEntidad());
      // console.log('2.- data',e.data);

      if (this.getEntidad()=='alumno') { this.r_alumno = e.data;}
      if (this.getEntidad()=='apoderado') { this.r_apoderado = e.data;}
    }

    this.msg= e;

    this.reset();
    if (this.getEntidad() == 'alumno') {
      this.setSession('Entidad','apoderado');
      this.setSession('Estado','pre-consulta');
      this.setSession('Accion','buscar')

    }
    else if (this.getEntidad() == 'apoderado') {
      this.setSession('Entidad','matricula');
      this.setSession('Estado','mostrar')
      this.setSession('Accion','generar')

    } else if (this.getEntidad() == 'matricula') {
      this.setSession('Entidad','alumno');
      this.setSession('Estado','pre-consulta')
      this.setSession('Accion','buscar')

    }

  }

  matricula:any={};

  mostra_matricula() {

    this.setSession('Entidad','matricula')
    this.setSession('Estado','generado')
    this.setSession('Accion','ingresar')

    var tablas:any = {};
    var textos:any = {};
    var ocultos:any = {};
    var fechas:any = {};

    const modaldata: any = modalDataObject[lowerUpperTables[this.getEntidad()]];

    modaldata.textFields.forEach((tex: string) => textos[tex] = null);
    modaldata.dateFields.forEach((date: string) => fechas[date] = null);

    tablas['colegio'] = { id: 0};
    tablas['apoderado'] = { id: this.r_apoderado.id };
    tablas['alumno'] = { id: this.r_alumno.id };
    tablas['curso'] = { id: 0 };
    tablas['anno'] = { id: 0 };
    tablas['vinculo'] = { id: 0 };

    ocultos['alumno'] = this.r_alumno.id;
    ocultos['apoderado'] = this.r_apoderado.id;

    let msg:any = { registro : { id:0,  tablas, textos, ocultos, fechas } ,
                    tabla: lowerUpperTables[this.getEntidad()]
                  }
    console.log('msg', msg);
    this.mensaje.nextMsg(msg);
    this.muestra_dialog = true;

  }


  rut_consulta() {

    this.msg=null;

    const getModalData = (tipo: string, modal: any[], data: any = null): any[] => {
      var output:any={};
      if (tipo == 'tablas') {
        modal.forEach((m:any) => output[m] = (data) ?  data[lowerUpperTables[m]] : null)
      } else {
        modal.forEach((m:any) =>  output[m] = (data) ? data[m] : null);
      }

      return output
    };

    const getData = (data: any) : void => {

        let modaldata: any = modalDataObject[lowerUpperTables[this.getEntidad()]];

        if (data) {

              if (this.getEntidad()=='alumno') {  this.r_alumno = data; }
              if (this.getEntidad()=='apoderado') {  this.r_apoderado = data; }

              let msg:any = { registro : {
                id: data.id,
                tablas: getModalData('tablas', modaldata.tables, data),
                textos: getModalData('textos',modaldata.textFields,data),
                ocultos: getModalData('ocultos',modaldata.hidden,data),
                fechas: getModalData('fechas',modaldata.dateFields,data),
                },
                tabla: lowerUpperTables[this.getEntidad()]
              }

              // console.log('msg->',msg);

              this.mensaje.nextMsg(msg);

              this.setSession('Estado', 'encontrado');
              this.setSession('Accion', 'verificar');
              this.muestra_dialog = true;
      } else {


          let msg:any = { registro : {
            id: 0,
            tablas: getModalData('tablas', modaldata.tables),
            textos: getModalData('textos',modaldata.textFields),
            ocultos: getModalData('ocultos',modaldata.hidden),
            fechas: getModalData('fechas',modaldata.dateFields),


          },
          rut: this.formConsulta.value.rut_entidad,
          tabla: lowerUpperTables[this.getEntidad()]}

          // console.log('msg->',msg)
          this.mensaje.nextMsg(msg)
          this.muestra_dialog = true;
       }
      }

    this.crud.getByRut(this.getEntidad(), this.formConsulta.value.rut_entidad).pipe(
      tap(data => getData(data))
    )
    .subscribe()
  }






}

