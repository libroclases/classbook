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

  alumno:any = null;
  apoderado:any = null;
  matricula:any=null;
  
  constructor(
    private mensaje: MessageService,
    private crud: CrudService,
    private ms : MessageService,
    private selIdsService: SelectionIdsService, ) {

      ms.color_msg.subscribe((color:any) =>  {


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
          rut_alumno : new FormControl('', rutValidator()),
          rut_apoderado : new FormControl('', rutValidator()),
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
  

  generar_matricula() {
    
  }

  rut_alumno() {

     this.crud.getByRut('alumno',this.formConsulta.value.rut_alumno)
     .subscribe(res => this.alumno = res)
       
  }

  rut_apoderado() {

    this.crud.getByRut('apoderado',this.formConsulta.value.rut_apoderado)
    .subscribe(res => this.apoderado = res)
       
 }




}

