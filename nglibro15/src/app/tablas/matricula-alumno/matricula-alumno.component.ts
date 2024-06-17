import { Component, HostListener, Inject, Injectable, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule, FormControl } from '@angular/forms';
import { modalDataObject, lowerUpperTables, validator, environment } from '../../../environments/environment';

import { rutValidator } from '../../shared/directives/rut-validator/rut-validator.directive';
import { CrudService } from '../../shared/services/crud/crud.service';
import { Observable, take, tap } from 'rxjs';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/shared/componentes/modal-dialog/modal-dialog.component';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Permission } from 'src/environments/environment.development';
import { Router } from '@angular/router';

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
  opacity="70%";

  // data:any={};
  // muestra_dialog=true;


  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;
  color_h2!:string;
  button_class!:any;
  table_class!:any;
  color!:any;

  bgmodal!:string;
  modalbutton!:any;

  disable:any = null;
  currentDate:Date = new Date();

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  url!:string;
  photo = environment.photo;
  position = "center";
  size = "cover";

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  getColor = (color:string | null) => {

    if (color == null) {  color = localStorage.getItem('Color')  }

    this.button_class= `btn btn-${color} text-light mx-2 mb-3`;
    this.table_class = `table table-${color}`;
    this.color = color;

    if (color=='primary') {
      this.bodybgcolor = this.objcolors.primary.bodybgcolor;
      this.pagination = this.objcolors.primary.pagination;
      this.tablehead = this.objcolors.primary.tablehead;
      this.bgmodal = this.objcolors.primary.bgmodal;
      this.modalbutton = this.objcolors.primary.modalbutton;
      this.url = this.photo.primary;
      this.color_h2 = `text-${this.objcolors.primary.color} my-3`;

    }
    if (color=='success') {
      this.bodybgcolor = this.objcolors.success.bodybgcolor;
      this.pagination = this.objcolors.success.pagination;
      this.tablehead = this.objcolors.success.tablehead;
      this.bgmodal = this.objcolors.success.bgmodal;
      this.modalbutton = this.objcolors.success.modalbutton;
      this.url = this.photo.success;
      this.color_h2 = `text-${this.objcolors.success.color} my-3`;

    }
    if (color=='info') {
      this.bodybgcolor = this.objcolors.info.bodybgcolor;
      this.pagination = this.objcolors.info.pagination;
      this.tablehead = this.objcolors.info.tablehead;
      this.bgmodal = this.objcolors.info.bgmodal;
      this.modalbutton = this.objcolors.info.modalbutton;
      this.url = this.photo.info;
      this.color_h2 = `text-${this.objcolors.info.color} my-3`;

    }

  }


  ngOnInit() {

    // this.muestra_dialog = true

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['MatriculaAlumno'],info)}})

    ).subscribe()


  }


  alumno:any = null;
  apoderado:any = null;
  matricula:any=null;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    // private mensaje: MessageService,
    public dialog: MatDialog,
    private crud: CrudService,
    private router: Router,
    public userInfo: UserInfoService,
    private selIdsService: SelectionIdsService,
    private getpermission: GetPermissionService ) {


      this.formConsulta = new FormGroup({
          rut_alumno : new FormControl('', rutValidator()),
          rut_apoderado : new FormControl('', rutValidator()),
      })


  }

  reset() {
    this.formConsulta.reset();
    // this.muestra_dialog = false;
    this.alumno = null;
    this.apoderado = null;

  }
  cancelar() {
    this.formConsulta.reset();
    // this.muestra_dialog = false;
    this.alumno = null;
    this.apoderado = null;
    this.router.navigate(['/home'])
    // this.mensaje.nextMsg({})

  }


  openDialog(): void {

    var reg:any={}
    let modaldata = modalDataObject['Matricula'];

    reg['id'] = 0;

    modaldata?.tables.forEach((table: string) => reg[table] = {id: 0});
    modaldata.textFields.forEach((text: string) => reg[text] = null);
    modaldata.dateFields.forEach((date: string) => reg[date] = null);

    reg['foraneas'] = { apoderado: this.apoderado.id, alumno: this.alumno.id }

    reg['bgmodal'] = this.bgmodal;
    reg['modalbutton'] = this.modalbutton;

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
     tap(() => { this.reset(); console.log('cerrado')})
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

