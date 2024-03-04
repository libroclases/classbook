import { Component, HostListener, OnDestroy } from '@angular/core';
import { Alert } from '../../interfaces/generic.interface';
import { CrudService } from '../../shared/services/crud/crud.service';
import { Notification } from '../../interfaces/generic.interface';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialog } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { environment, lowerUpperTables, modalDataObject } from '../../../environments/environment';
import { tap } from 'rxjs';
import { MessageService } from '../../shared/services/message/message.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MultiSelectComponent } from '../../shared/componentes/multi-select/multi-select.component';


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
  patchFksFromStorage = ['anno', 'colegio', 'profesor'];

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  mainQuery: any = undefined;
  nombreAlumno: string = "";
  disabledAddButton = true;

  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;
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
    ms: MessageService,
    public dialog: MatDialog,
    private subsManagerService: SubscriptionsManagerService,
    private fKeysService: ForeignKeysService,
    private selIdsService: SelectionIdsService,
    private iconsService: IconsService) {

      ms.color_msg.subscribe(color =>  {


        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
          this.modalbutton = this.objcolors.azul.modalbutton;
        }
        else if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
          this.modalbutton = this.objcolors.azul.modalbutton;
        }
        else if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.tablehead;
          this.modalbutton = this.objcolors.azul.modalbutton;
        }
      })
    }

  ngOnInit(): void {

    this.mainTableUpper = lowerUpperTables[this.mainTable];
    this.modalDataObj = modalDataObject[this.mainTableUpper]
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
      this.disabledAddButton = false;
      const fks = this.selIdsService.getIds(
        this.fKeysService.getFKeys(this.mainTable)!, {profesor: 0});
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
      this.modalDataObj.tables.forEach((table: string) => reg[table] = {
        id: this.selIdsService.getId(table.toLocaleLowerCase()) || 0});


   }
    let modaldata: any = this.modalDataObj;
    modaldata['title'] = `Observación: ${this.nombreAlumno}`;
    const dialogRef = this.dialog.open(ModalDialog, {
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
