import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take, tap } from 'rxjs';
import { ModalDialog } from 'src/app/shared/componentes/modal-dialog/modal-dialog.component';
import { emailValidator } from 'src/app/shared/directives/email-validator/email-validator.directive';
import { rutValidator } from 'src/app/shared/directives/rut-validator/rut-validator.directive';
import { selectValidator } from 'src/app/shared/directives/select-validator/select-validator.directive';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { LabelsService } from 'src/app/shared/services/labels/labels.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';
import { environment, lowerUpperTables as lowerUpper, lowerUpperTables, modalDataObject, usuarioTipo, validator } from 'src/environments/environment';

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

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;
  modalbutton!:any;

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

  getModalData = (tipo: string, modal: any[], data: any = null): any[] => {

    var output:any={};
    if (tipo == 'tablas') {
      modal.forEach((m:any) => output[m] = (data) ?  data[lowerUpperTables[m]] : null)
    } else {
      modal.forEach((m:any) =>  output[m] = (data) ? data[m] : null);
    }

    return output
  };

  getData = (data: any) : void => {


    let modaldata: any = modalDataObject[lowerUpperTables['usuario']];

    let msg:any = { registro : {
      id: 0,
      tablas: this.getModalData('tablas', modaldata.tables,null),
      textos: this.getModalData('textos',modaldata.textFields,data),
      ocultos: this.getModalData('ocultos',modaldata.hidden,null),
      fechas: this.getModalData('fechas',modaldata.dateFields,null),
    },
    tabla: lowerUpperTables['usuario']
    }

  }

  changeFunction(table: string, event: any) {

  }


  email_consulta() {

    this.usuario_encontrado = false;


    this.crud.getByEmail('usuario', this.valuesForm.value.email).pipe(
      tap(usuario => { if(usuario) {
        this.usuario = usuario;
        this.usuario_encontrado = true;
        this.email_asociado = 'Email asociado a usuario ya existe'

      } else {

        this.valuesForm.get('tema')?.enable()
        this.valuesForm.get('tipousuario')?.enable()
        this.valuesForm.get('username')?.enable()

        this.valuesForm.patchValue({'username': this.valuesForm.value.email.split('@')[0]})
      }

    }),

      take(1)
    )
    .subscribe()

  }

  reset() {
    this.valuesForm.reset();
    this.mensaje = null;
  }

  constructor(
    // private mensaje: MessageService,
    public dialog: MatDialog,
    private crud: CrudService,
    private ms : MessageService,
    private labelsService: LabelsService,
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

      this.valuesForm = new FormGroup({
        email: new FormControl('', emailValidator()),
        username: new FormControl('', [Validators.required]),
        tema : new FormControl('', selectValidator()),
        tipousuario : new FormControl('', selectValidator())
      });

  }
  ngOnInit(): void {
    this.queries['tema'] = this.crud.getData('tema')!;
    this.queries['tipousuario'] = this.crud.getData('tipousuario')!;

    this.valuesForm.get('tema')?.disable()
    this.valuesForm.get('tipousuario')?.disable()
    this.valuesForm.get('username')?.disable()
  }

  closeMe(e: any) {


    if (e?.action == 'clean') {
      this.reset()
    }

  }


  addMessage(msg: any) {
     this.mensaje = msg.message
     console.log('poronga',msg)
     if (msg.success) {
      
      this.openDialog(msg.usuario)
    }
   }

  ingresar() {
    let u = this.valuesForm.value;
    console.log({username: u.username, email: u.email, id:0},'usuario', [+u.tipousuario, +u.tema])
    this.crud.postData({username: u.username, email: u.email, id:0},'usuario', [+u.tipousuario, +u.tema])
    .subscribe(msg => { 
      this.addMessage(msg); 
      console.log(msg) ;
      this.reset();
    }) 
  }

  openDialog(usuario:any): void {

    var reg:any={}

    let table = usuarioTipo[usuario.tipousuarioId]

    let modaldata = modalDataObject[lowerUpperTables[table]];


    reg['id'] = 0;

    this.ms.nextUser(usuario.id)

    modaldata.tables.forEach((table: string) => reg[table] = {id: 0});
    modaldata.textFields.forEach((text: string) => reg[text] = null);
    modaldata.dateFields.forEach((date: string) => reg[date] = null);

    const dialogRef = this.dialog.open(ModalDialog, {
     data: {
       registro: reg,
       ...modaldata,
       tabla: lowerUpperTables[table]},
       height: modaldata.height, width: '600px',

   });

   dialogRef.afterClosed().pipe(
     tap(res => console.log(res)),
   )
   .subscribe();


 }


}