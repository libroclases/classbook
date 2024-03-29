import { Component, HostListener, Inject, Injectable, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule, FormControl } from '@angular/forms';
import { modalDataObject, lowerUpperTables, validator, environment } from '../../../environments/environment';
import { MessageService } from '../../shared/services/message/message.service';
import { rutValidator } from '../../shared/directives/rut-validator/rut-validator.directive';
import { CrudService } from '../../shared/services/crud/crud.service';
import { take, tap } from 'rxjs';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/shared/componentes/modal-dialog/modal-dialog.component';

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
  disable=true;

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
    @Inject(DOCUMENT) private document:Document,
    private mensaje: MessageService,
    public dialog: MatDialog,
    private crud: CrudService,
    private ms : MessageService,
    private selIdsService: SelectionIdsService, ) {

      ms.disable_msg.pipe(
        tap(msg => this.disable =  (msg.tipo == 'utp')? false : true),
        take(1)
      ).subscribe()


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
  

  openDialog(): void {

    var reg:any={}
    let modaldata = modalDataObject['Matricula'];

    reg['id'] = 0;
    
    modaldata?.tables.forEach((table: string) => reg[table] = {id: 0});
    modaldata.textFields.forEach((text: string) => reg[text] = null);
    modaldata.dateFields.forEach((date: string) => reg[date] = null);
 
    reg['foraneas'] = { apoderado: this.apoderado.id, alumno: this.alumno.id }
    
    const dialogRef = this.dialog.open(ModalDialogComponent, {
     data: {
       registro: reg,
       ...modaldata,
       tabla: 'Matricula'},
       height: modaldata.height, width: '600px',
       disableClose: true

   });

   dialogRef.afterClosed().pipe(
     // tap(res => console.log(res)),
     tap(() => { this.formConsulta.reset(); console.log('cerrado')})
   )
   .subscribe();
   

 }



  rut_alumno() {

     this.crud.getByRut('alumno',this.formConsulta.value.rut_alumno)
     .subscribe(res => {
      if (res) { this.alumno = res }
      else { this.document.defaultView?.alert('No existe alumno') }
      
    })
       
  }

  rut_apoderado() {

    this.crud.getByRut('apoderado',this.formConsulta.value.rut_apoderado)
    .subscribe(res => {
      if (res) { this.apoderado = res }
      else { this.document.defaultView?.alert('No existe apoderado') }
      
    })    
       
 }




}

