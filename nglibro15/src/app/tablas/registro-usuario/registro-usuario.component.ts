import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { from, Observable, of, take, tap } from 'rxjs';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { ModalDialogComponent } from 'src/app/shared/componentes/modal-dialog/modal-dialog.component';
import { emailValidator } from 'src/app/shared/directives/email-validator/email-validator.directive';
import { selectValidator } from 'src/app/shared/directives/select-validator/select-validator.directive';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { LabelsService } from 'src/app/shared/services/labels/labels.service';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';

import { environment, lowerUpperTables as lowerUpper, lowerUpperTables, modalDataObject, usuarioTipo, validator } from 'src/environments/environment';
import { Permission } from 'src/environments/environment.development';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  valuesForm!: FormGroup;

  modalDataObj!: any;

  tables = ['tema','tipousuario']
  queries:any={}

  msg:any;

  mostra_dialog = false;
  email_asociado = '';

  usuario: (any | null) = null;
  usuario_encontrado = false;

  mensaje:any;

  objcolors = environment.colors;

  url!:string;
  photo = environment.photo;
  opacity = "90%";
  // color_h2="text-primary my-3";
  position = "center";
  size = "cover";

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;
  color_h2!:string;
  button_class!:any;
  table_class!:any;
  color!:any;

  disable:any;
  editar:any;
  currentDate:Date = new Date();

  bgmodal!:string;
  modalbutton!:string;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  getLabel(table: string, object: any) {
    return this.labelsService.getObjectLabel(table, object);
  }

  getTableLabel(table: string) {
    return this.labelsService.getTableLabel(table);
  }

  constructor(
    // private mensaje: MessageService,
    public dialog: MatDialog,
    private crud: CrudService,

    private labelsService: LabelsService,
    private getpermission: GetPermissionService
    // private selIdsService: SelectionIdsService,
    ) {

      this.valuesForm = new FormGroup({
        email: new FormControl('', emailValidator()),
        username: new FormControl('', [Validators.required]),
        tema : new FormControl('', selectValidator()),
        tipousuario : new FormControl('', selectValidator())
      });

  }

    getColor = (color:string | null) => {

    if (color == null) {  color = localStorage.getItem('Color')  }

    this.button_class= `btn btn-${color} text-light`;
    this.table_class = `table table-${color}`;
    this.color = color;

    if (color=='primary' || !color) {
      this.bodybgcolor = this.objcolors.primary.bodybgcolor;
      this.pagination = this.objcolors.primary.pagination;
      this.tablehead = this.objcolors.primary.tablehead;
      this.bgmodal = this.objcolors.primary.bgmodal;
      this.modalbutton = this.objcolors.primary.matbutton;
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


  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) {
          this.disable = this.getpermission.getPermission(Permission['RegistroUsuario'],info);
          this.editar = this.disable.editar;
        }
      })

    ).subscribe()

    
    // this.queries['tipousuario'] = this.crud.getData('tipousuario')!;
    this.queries['tipousuario'] = of([{id: 1, nombre: 'Profesor'}, { id: 4, nombre: 'Asistente' }]);
    this.queries['tema'] = this.crud.getData('tema')!;
    this.disabled();
  }

  disabled() {
    this.valuesForm.get('tema')?.disable()
    this.valuesForm.get('tipousuario')?.disable()
    this.valuesForm.get('username')?.disable()
  }

  enabled() {
    this.valuesForm.get('tema')?.enable()
    this.valuesForm.get('tipousuario')?.enable()
    this.valuesForm.get('username')?.enable()
  }

  email_consulta() {

    this.usuario_encontrado = false;

    this.crud.getByEmail('usuario', this.valuesForm.value.email).pipe(
      tap(usuario => {
        if(usuario) {
            this.usuario_encontrado = true;
            this.usuario = usuario;
            const valor = {'username': this.valuesForm.value.email.split('@')[0], 'tipousuario': usuario.tipousuarioId, 'tema': usuario.temaId}
            if (usuario.operativo == true) {
                this.disabled();
                this.email_asociado = 'Email asociado a usuario ya está activado';
            } else {
              this.disabled();
              this.valuesForm.patchValue(valor)
            }
      } else  {
        const valor = {'username': this.valuesForm.value.email.split('@')[0]}

        this.enabled()
        this.valuesForm.patchValue(valor)
      }
    }
    ),

      take(1)
    )
    .subscribe()

  }

  reset() {
    this.valuesForm.reset();
    this.mensaje = null;
    this.email_asociado = '';
    this.disabled();
  }


  addMessage(msg: any) {


     if (msg.success) {
      this.mensaje = msg.message
      this.openDialog(msg.usuario)
    }
   }

  ingresar() {
    if (this.usuario_encontrado==false) {
      let u = this.valuesForm.value;
      console.log({username: u.username, email: u.email, id:0},'usuario', [+u.tipousuario, +u.tema])
      this.crud.postData({username: u.username, email: u.email, id:0},'usuario', [+u.tipousuario, +u.tema])
      .subscribe(msg => {
        
        if (msg) {
          this.addMessage(msg);
          this.reset();
        }

      })

    } else {
      this.openDialog(this.usuario)
    }
  }

  openDialog(usuario:any): void {

    var reg:any={}

    let table = usuarioTipo[usuario.tipousuarioId]

    let modaldata = modalDataObject[lowerUpperTables[table]];


    reg['id'] = 0;
    reg['usuario_id'] = usuario.id;

    reg['bgmodal'] = this.bgmodal;
    reg['modalbutton'] = this.modalbutton;

    // this.ms.nextUser(usuario.id);  NO ES UTILIZADO

    modaldata.tables.forEach((table: string) => reg[table] = {id: 0});
    modaldata.textFields.forEach((text: string) => reg[text] = null);
    modaldata.dateFields.forEach((date: string) => reg[date] = null);

    const dialogRef = this.dialog.open(ModalDialogComponent, {
     data: {
       registro: reg,
       ...modaldata,
       tabla: lowerUpperTables[table]},
       height: modaldata.height, width: '600px',
       disableClose: true

   });

   dialogRef.afterClosed().pipe(
     tap(() => this.reset()),
   )
   .subscribe();


 }


}
