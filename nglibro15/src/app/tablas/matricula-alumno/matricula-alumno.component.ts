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

  
  ngOnInit() {}

  
  
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
          rut : new FormControl('', rutValidator()),
/*          nombre: new FormControl('',Validators.required),
          apellido1: new FormControl('',Validators.required),
          apellido2: new FormControl('',Validators.required),
          direccion: new FormControl('',Validators.required),
          celular: new FormControl('',Validators.required),
          nacimiento: new FormControl('',Validators.required),
          Sexo: new FormControl('',Validators.required),
          Region: new FormControl('',Validators.required),
          Provincia: new FormControl('',Validators.required),
          Comuna: new FormControl('',Validators.required)
*/          
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
  
    this.mensaje.nextMsg({})

  }
  // msg!:any
  closeMe(e: any) {

    // console.log('1.- entidad',this.getEntidad());
    // console.log('1.- data',e.data);

    if (e.data) {

      // console.log('2.- entidad',this.getEntidad());
      // console.log('2.- data',e.data);

    }

    this.msg= e;

 
  }

  matricula:any={};



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

   
   

  }






}

