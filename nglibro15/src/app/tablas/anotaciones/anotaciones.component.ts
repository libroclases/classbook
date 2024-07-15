import { Component, HostListener, OnDestroy } from '@angular/core';
import { Alert } from '../../interfaces/generic.interface';

import { Notification } from '../../interfaces/generic.interface';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { Permission, environment, lowerUpperTables, modalDataObject } from '../../../environments/environment';
import { Observable, take, tap } from 'rxjs';

import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';

@Component({
  selector: 'app-anotaciones',
  templateUrl: './anotaciones.component.html',
  styleUrls: ['./anotaciones.component.css']
})
export class AnotacionesComponent implements OnDestroy {

  title = "Observaciones";
  mainTable = 'anotacion';
  mainTableUpper = '';
  modalDataObj: any;
  fKeysSel: string[] = ['anno', 'colegio', 'curso', 'matricula'];
  requiredSelectorsByTable: (string[])[] = [[], [], ['anno', 'colegio'], ['anno', 'colegio', 'curso']];
  changeFnsArray!: Function[];
  customEndpoints = {matricula: 'lista_curso_nombres'};
  patchFksFromStorage = ['anno', 'colegio','curso'];

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  disable = true;
  currentDate:Date = new Date();

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  mainQuery: any = undefined;
  nombreAlumno: string = "";
  disabledAddButton = true;
  personalInfo!: any;

  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  bgmodal!:string;
  modalbutton!:string;

  errorAlert = {
    id: "error",
    type: "warning",
    message: "Ha ocurrido un error.",
    show: false
  }
  successfulSaveAlert = {
    id: "save-success",
    type: "success",
    message: "Datos guardados con éxito.",
    show: false
  }
  alerts: Alert[] = [];

  constructor(
    private crud: CrudService,
    // auth: AuthService,

    public dialog: MatDialog,
    private subsManagerService: SubscriptionsManagerService,
    private fKeysService: ForeignKeysService,
    private selIdsService: SelectionIdsService,
    private iconsService: IconsService,
    private getpermission: GetPermissionService) {

  }

  getColor(color:string | null)  {

    if (color == null) {  color = localStorage.getItem('Color')  }

    if (color=='primary') {
      this.bodybgcolor = this.objcolors.primary.bodybgcolor;
      this.pagination = this.objcolors.primary.pagination;
      this.tablehead = this.objcolors.primary.tablehead;
      this.bgmodal = this.objcolors.primary.bgmodal;
      this.modalbutton = this.objcolors.primary.matbutton;
      this.url = this.photo.primary;
    }
    else if (color=='success') {
      this.bodybgcolor = this.objcolors.success.bodybgcolor;
      this.pagination = this.objcolors.success.pagination;
      this.tablehead = this.objcolors.success.tablehead;
      this.bgmodal = this.objcolors.success.bgmodal;
      this.modalbutton = this.objcolors.success.modalbutton;
      this.url = this.photo.success;
    }
    else if (color=='info') {
      this.bodybgcolor = this.objcolors.info.bodybgcolor;
      this.pagination = this.objcolors.info.pagination;
      this.tablehead = this.objcolors.info.tablehead;
      this.bgmodal = this.objcolors.info.bgmodal;
      this.modalbutton = this.objcolors.success.modalbutton;
      this.url = this.photo.info;
    }
}



  ngOnInit(): void {


    this.mainTableUpper = lowerUpperTables[this.mainTable];
    this.modalDataObj = modalDataObject[this.mainTableUpper];

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission[lowerUpperTables[this.mainTable]],info).crear}})

    ).subscribe()

    this.selIdsService.subscribe(
      'observaciones', (message: (Notification)) => this.updateData(message));
    this.alerts.push(this.successfulSaveAlert);
    this.alerts.push(this.errorAlert);
    this.changeFnsArray = [this.emptyFunction, this.emptyFunction, this.emptyFunction, this.emptyFunction];

  }

  ngOnDestroy() {
    this.subsManagerService.unsubscribeAll();
  }

  updateData(notification: (Notification | null) = null) {
    if ( !notification || notification.message == 'updated' ) {
      for ( let tbl of this.fKeysSel) {
        if( this.selIdsService.getId(tbl) === 0 ) {  // just don't update
          this.disabledAddButton = true;
         
          return;
        }
      }
      if ( this.disable == false) { this.disabledAddButton = false; }
      const fks = this.selIdsService.getIds(
        this.fKeysService.getFKeys(this.mainTable)!, {profesor: 0}
        );


      const subs = this.crud.getData(this.mainTable, fks)!
      .subscribe( query => {
        const subsNombre = this.crud.getDataCustom(
          "matricula", "nombreCompleto", [this.selIdsService.getId("matricula")])
        .subscribe( q => this.nombreAlumno = q.nombreCompleto );
        this.subsManagerService.registerSubscription(subsNombre, "nombre-completo");
        this.mainQuery = query;
      });
      this.subsManagerService.registerSubscription(subs, "observaciones");
    }
  }

  openDialog(reg: any = null) {

    if (!reg) {
      const date = new Date();
      const currentDay= String(date.getDate()).padStart(2, '0');
      const currentMonth = String(date.getMonth()+1).padStart(2,"0");
      const currentYear = date.getFullYear();
      var reg: any = {
        id: 0,
        fecha: `${currentYear}-${currentMonth}-${currentDay}`
      };
      this.modalDataObj.tables.forEach((table: string) => {

        reg[table] = { id: this.selIdsService.getId(table.toLocaleLowerCase()) || 0 }
      });


   }

    reg['bgmodal']=this.bgmodal;
    reg['modalbutton']=this.modalbutton;

    let modaldata: any = this.modalDataObj;
    modaldata['title'] = `Observación: ${this.nombreAlumno}`;
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        registro: reg,
        ...modaldata,
        tabla: this.mainTableUpper},
        height: this.modalDataObj.height, width: '600px',
    });

    const subsEntryDialog = dialogRef.afterClosed().pipe(
      tap(entry => this.updateData(entry))
    )
    .subscribe();
    this.subsManagerService.registerSubscription(
      subsEntryDialog, `anotacion-dialog-${Date.now()}`);
  }

  emptyFunction(e: any) {

  }

  getBiClass(route: string) {
    // permite acceder a iconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  displayAlert(alerta: Alert, delayMilliseconds: number) {
    alerta.show = true;
    this.closeAlert(alerta, delayMilliseconds);
  }

  closeAlert(alert: Alert, delayMilliseconds: number | null = null) {
    if ( delayMilliseconds ) {
      setTimeout(() => alert.show = false, delayMilliseconds);
    } else {
      alert.show = false;
    }
  }

}
