import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take, tap } from 'rxjs';
import { ModalDialogComponent } from 'src/app/shared/componentes/modal-dialog/modal-dialog.component';
import { emailValidator } from 'src/app/shared/directives/email-validator/email-validator.directive';
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

  disable = true;

  objcolors = environment.colors;

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  bgmodal!:string;
  modalbutton!:string;

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

  /*
  getModalData = (tipo: string, modal: any[], data: any = null): any[] => {

    var output:any={};
    if (tipo == 'tablas') {
      modal.forEach((m:any) => output[m] = (data) ?  data[lowerUpperTables[m]] : null)
    } else {
      modal.forEach((m:any) =>  output[m] = (data) ? data[m] : null);
    }

    return output
  };
  */

  /*
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
  */


  constructor(
    // private mensaje: MessageService,
    public dialog: MatDialog,
    private crud: CrudService,
    private ms : MessageService,
    private labelsService: LabelsService,
    // private selIdsService: SelectionIdsService, 
    ) {

      ms.disable_msg.pipe(
        tap(msg => this.disable =  (msg.tipo == 'utp')? false : true),
        take(1)
      ).subscribe()

      ms.color_msg.subscribe((color:any) =>  {


        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
          this.bgmodal = this.objcolors.azul.bgmodal;
          this.modalbutton = this.objcolors.azul.modalbutton;
          this.url = this.photo.azul;

        }
        if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
          this.bgmodal = this.objcolors.verde.bgmodal;
          this.modalbutton = this.objcolors.verde.modalbutton;
          this.url = this.photo.verde;
        }
        if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.tablehead;
          this.bgmodal = this.objcolors.naranjo.bgmodal;
          this.modalbutton = this.objcolors.naranjo.modalbutton;
          this.url = this.photo.naranjo;
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
        console.log('poronga->',msg);
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
