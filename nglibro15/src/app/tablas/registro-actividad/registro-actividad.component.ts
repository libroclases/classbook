import { Component, HostListener, OnDestroy } from '@angular/core';
import { Alert } from '../../interfaces/generic.interface';
import { CrudService } from '../../shared/services/crud/crud.service';
import { Notification } from '../../interfaces/generic.interface';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { MatDialog } from '@angular/material/dialog';
import {
  lowerUpperTables, fullDaysOfWeek, environment,
} from '../../../environments/environment';

import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { Observable, tap } from 'rxjs';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Permission } from 'src/environments/environment.development';


@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.component.html',
  styleUrls: ['./registro-actividad.component.css'],
})
export class RegistroActividadComponent implements OnDestroy {

 //   colores

  objcolors = environment.colors;

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  userId=0;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  disable = null;
  currentDate:Date = new Date();

  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  title = 'Registro de Actividades';
  mainTable = 'registroactividad';
  yearTable = 'anno';
  monthTable = 'mes';
  mainTableUpper = '';
  fullDaysOfWeek = fullDaysOfWeek;
  fKeysSel: string[] = [
    'anno',
    'mes',
    'colegio',
    'curso',
    'asignatura'
  ];
  requiredSelectorsByTable: string[][] = [
    [],
    [],
    [],
    ['anno', 'colegio'],
    ['colegio'],
  ];
  ignoreFkRequirements: string[] = ['tipocolegio'];
  changeFnsArray!: Function[];
  customEndpoints = { asignatura: 'asignatura_por_colegio' };
  patchFksFromStorage = ['anno', 'mes', 'colegio', 'profesor'];

  editable!: Map<number, boolean>;
  inputIsEnabled!: Map<number, boolean>;
  isEdited!: Map<number, boolean>;
  descripciones!: Map<number, any>;
  descripcionesToSave!: Map<number, any>;
  indexToId!: Map<number, boolean>;
  mainQuery: any = undefined;

  errorAlert = {
    id: 'error',
    type: 'warning',
    message: 'Ha ocurrido un error.',
    show: false,
  };
  successfulSaveAlert = {
    id: 'save-success',
    type: 'success',
    message: 'Datos guardados con éxito.',
    show: false,
  };
  alerts: Alert[] = [];

  constructor(
    private crud: CrudService,
    public dialog: MatDialog,
    private subsManagerService: SubscriptionsManagerService,
    private fKeysService: ForeignKeysService,
    private selIdsService: SelectionIdsService,
    private iconsService: IconsService,
    private getpermission: GetPermissionService
  ) {
    // REVISAR
    // userInfo.personalInfo$.subscribe(info => this.userId = info.personalInfo.datos_persona.id)


  }

  getColor = (color:string | null) => {

    if (color == null) {  color = localStorage.getItem('Color')  }

    if (color=='primary') {
      this.bodybgcolor = this.objcolors.primary.bodybgcolor;
      this.pagination = this.objcolors.primary.pagination;
      this.tablehead = this.objcolors.primary.tablehead;
      this.url = this.photo.primary;
    }
    if (color=='success') {
      this.bodybgcolor = this.objcolors.success.bodybgcolor;
      this.pagination = this.objcolors.success.pagination;
      this.tablehead = this.objcolors.success.tablehead;
      this.url = this.photo.success;
    }
    if (color=='info') {
      this.bodybgcolor = this.objcolors.info.bodybgcolor;
      this.pagination = this.objcolors.info.pagination;
      this.tablehead = this.objcolors.info.tablehead;
      this.url = this.photo.info;
    }

}


  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.userId = info.personalInfo.usuario.id}}),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['RegistroActividad'],info)}})

    ).subscribe()

    this.editable = new Map();
    this.inputIsEnabled = new Map();
    this.isEdited = new Map();
    this.descripciones = new Map();
    this.descripcionesToSave = new Map();
    this.indexToId = new Map();
    this.mainTableUpper = lowerUpperTables[this.mainTable];
    this.selIdsService.subscribe(
      'registroactividad',
      (message: Notification) =>
      this.updateData(message)
    );
    this.alerts.push(this.successfulSaveAlert);
    this.alerts.push(this.errorAlert);
    this.changeFnsArray = [
      this.emptyFunction,
      this.emptyFunction,
      this.emptyFunction,
      this.emptyFunction,
    ];
  }

  ngOnDestroy() {
    this.subsManagerService.unsubscribeAll();
  }

  updateData(notification: Notification | null = null) {
    if (!notification || notification.message == 'updated') {
      for (let tbl of this.fKeysSel) {
        if (this.selIdsService.getId(tbl) === 0) {
          // just don't update
          this.mainQuery = [];
          return;
        }
      }
      const fks = this.selIdsService.getIds(
        this.fKeysService.getFKeys('registro_actividad_by_mes')!);
      const subs = this.crud
        .getDataCustom(this.mainTable, 'registro_actividad_by_mes', fks)!
        .subscribe((query) => {
          if ( query.length == 0 ) {
            this.populateRegistroActividadMes()
          } else {
            this.mainQuery = query;

            for ( const [index, entry] of query.entries() ) {
              this.indexToId.set(index, entry.id);
              // this.editable.set(index, entry.Profesor.id == this.userId); console.log(entry.Profesor.id,this.userId) OJO
              this.editable.set(index, true);
              this.inputIsEnabled.set(index, false);
              this.descripciones.set(index, entry.descripcion);
              this.descripcionesToSave.set(index, entry.descripcion);
            }
          }
        });
      this.subsManagerService.registerSubscription(subs, 'registro-actividad');
    }
  }

  emptyFunction(e: any) {}

  populateRegistroActividadMes() {
    const colegioId = this.selIdsService.getId('colegio');
    const cursoId = this.selIdsService.getId('curso');
    const asignaturaId = this.selIdsService.getId('asignatura');
    const anno = parseInt(this.selIdsService.getText(this.yearTable));
    const annoId = this.selIdsService.getId(this.yearTable);
    const mesId = this.selIdsService.getId(this.monthTable);
    const subsPopulateMes = this.crud
      .createDataCustom({ anno: anno }, this.mainTable, 'populate_mes', [
        colegioId,
        cursoId,
        asignaturaId,
        annoId,
        mesId,
      ])
      .subscribe(() => {
        this.updateData({message: 'updated'});
      });
    this.subsManagerService.registerSubscription(
      subsPopulateMes,
      `${colegioId}|${cursoId}|${annoId}|${mesId}|${asignaturaId}|populateMes`
    );
  }

  getBiClass(route: string) {
    // permite acceder a iconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  enableDisableInput(index: number) {
    this.inputIsEnabled.set(index, !this.inputIsEnabled.get(index));
    if ( !this.inputIsEnabled.get(index) ) {
      this.saveValues(index);
    }
  }

  onKeyFieldText(index: number, textInput: any) {
    const defaultValue = this.descripciones.get(index);
    this.isEdited.set(index, textInput.value != defaultValue);
    this.descripcionesToSave.set(index, textInput.value);
  }

  resetValue(index: number, textInput: any) {
    const oldValue = this.descripciones.get(index);
    textInput.value = oldValue;
    this.descripcionesToSave.set(index, oldValue);
    this.isEdited.set(index, false);
    textInput.blur();
  }

  saveValuesAt(index: number) {
    let registroActividad = {
      id: this.indexToId.get(index),
      descripcion: this.descripcionesToSave.get(index)
    }
    const subs = this.crud.putData(registroActividad, this.mainTable)
      .subscribe(
        (response) => {
          if ( response ? response.success : true ) {
            this.descripciones.set(index, this.descripcionesToSave.get(index)!);
            this.isEdited.set(index, false);
            this.displayAlert(this.successfulSaveAlert, 800);
          } else {  // algo no se guardo
            this.displayAlert(this.errorAlert, 300);
          }
        }
      );
      this.subsManagerService.registerSubscription(
        subs, `saveValues-${index}-${Date.now()}`);
  }

  saveValues(index: number | null = null) {
    if ( index == null ) {
      this.isEdited.forEach((edited, idx) => {
        if ( edited ) {
          this.saveValuesAt(idx);
        }
      });
    } else if (this.isEdited.get(index)) {
      this.saveValuesAt(index);
    }
  }

  displayAlert(alerta: Alert, delayMilliseconds: number) {
    alerta.show = true;
    this.closeAlert(alerta, delayMilliseconds);
  }

  closeAlert(alert: Alert, delayMilliseconds: number | null = null) {
    if (delayMilliseconds) {
      setTimeout(() => (alert.show = false), delayMilliseconds);
    } else {
      alert.show = false;
    }
  }
}
