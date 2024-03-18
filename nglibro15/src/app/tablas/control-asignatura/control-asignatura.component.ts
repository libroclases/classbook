import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from '../../shared/services/crud/crud.service';
import { ControlAsignatura } from '../../interfaces/controlasignatura.interface';
import { Notification } from '../../interfaces/generic.interface';
import { LabelsService } from '../../shared/services/labels/labels.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { fullDaysOfWeek, fullMonths, yearTable, monthTable, dayOfWeekTable, lowerUpperTables, environment } from '../../../environments/environment';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { Anno } from '../../interfaces/anno.interface';
import { IconsService } from '../../shared/services/icons/icons.service';
import { Alert } from '../../interfaces/generic.interface';
import { ProfesorPie } from '../../interfaces/profesor.interface';
import { MessageService } from '../../shared/services/message/message.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';
import { TipoUsuario } from '../../interfaces/tipousuario.interface';


const fieldsArray = ['inasistentesHombres', 'inasistentesMujeres', 'atrasos', 'observaciones'];

@Component({
  selector: 'app-controlasignatura',
  templateUrl: './control-asignatura.component.html',
  styleUrls: ['./control-asignatura.component.css']
})
export class ControlAsignaturaComponent implements OnInit, OnDestroy{

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = environment.cabecera.margen_superior_tabla;

  height = window.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';
  }

  profPieFormGroup!: FormGroup;

  model!: NgbDateStruct;
  today!: Date;
  isToday = true;
  editable = new Map<number, boolean>();

  mainTable = 'controlasignatura'
  fKeysSel: string[] = ['anno','colegio', 'curso'];
  yearToTableId: Map<number, number> = new Map();
  monthToTableId: Map<number, number> = new Map();

  profesoresPie: ProfesorPie[] = [];

  requiredSelectorsByTable: (string[])[] = [[], [], ['colegio']];
  changeFnsArray!: Function[];
  patchFksFromStorage = ['colegio', 'anno'];

  fKeysAll!: string[];
  numEntries = 0;
  indicesHoras: number[] = [];
  nombresAsignaturas!: Map<number, string>;
  nombresProfesores!: Map<number, string>;

  values!: Map<string, Map<number, any>>;
  valuesToSave!: Map<string, Map<number, any>>;
  horaToId!: Map<number, number>;
  isEdited!: Map<string, Map<number, boolean>>;

  pieNombres!: Map<number, string>;
  pieValues!: Map<number, number | null>;
  pieValuesToSave!: Map<number, number | null>;
  pieIsEdited!: Map<number, boolean>;

  inputIsEnabled!: boolean[];
  allSelectorsSet = false;

  selectedDay = 0;
  selectedDate!: Date;

  dias: number[] = [];
  n_hombres = 0;
  n_mujeres = 0;
  n_curso = 0;

  tipoUsuario:any=null;

 //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

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

  constructor(
    ms: MessageService,
    auth: AuthService,
    userInfo: UserInfoService,
    private crud: CrudService,
    private subsManagerService: SubscriptionsManagerService,
    private fKeysService: ForeignKeysService,
    private selIdsService: SelectionIdsService,
    private labelsService: LabelsService,
    private fb: FormBuilder,
    private ngbCalendar: NgbCalendar,
    private iconsService: IconsService) {

      auth.isAuthenticated$.subscribe(isAuth => { if(isAuth) { 
        userInfo.personalInfo$.subscribe(info => {
          if (info) { 
            this.tipoUsuario = info.usuario.TipoUsuario.nombre;
          } 
        }  )
      }})

      ms.color_msg.subscribe(color =>  {

        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
        }
        else if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
        }
        else if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead =  this.objcolors.naranjo.tablehead;
        }
      })


    this.inputIsEnabled = [];
    for ( let i=1; i<13; i++){
      this.indicesHoras.push(i);
      this.inputIsEnabled.push(false);
    }
    }

  ngOnInit(): void {

    this.profPieFormGroup = new FormGroup({});
    for ( let hr=1; hr<13; hr++) {
      this.profPieFormGroup.addControl(hr.toString(), this.fb.control(0));
      this.editable.set(hr, false);
    }

    this.alerts.push(this.successfulSaveAlert);
    this.alerts.push(this.errorAlert);

    this.fKeysAll = this.fKeysService.getFKeys(this.mainTable)!;
    this.model = this.ngbCalendar.getToday();
    // this.model = new NgbDate(2024, 3, 14);
    const newSubsYears = this.crud.getData(yearTable)!.subscribe(query => {
      query.forEach((yearEntry: Anno) => this.yearToTableId.set(yearEntry.numero, yearEntry.id));
      const newSubsMonths = this.crud.getData(monthTable)!.subscribe(query => {
        query.forEach((monthEntry: Anno) => this.monthToTableId.set(monthEntry.numero, monthEntry.id));
        this.setSelectedDateIds();
        this.selIdsService.subscribe(
          'control-asignatura', (message: (Notification)) => this.updateTable(message));
      });
      this.subsManagerService.registerSubscription( newSubsMonths, 'control-asignatura-months');
    });
    this.subsManagerService.registerSubscription( newSubsYears, 'control-asignatura-years');

    this.changeFnsArray = [this.emptyFunction, this.emptyFunction, this.emptyFunction, this.emptyFunction];

    this.nombresAsignaturas = new Map();
    this.nombresProfesores = new Map();

    this.values = new Map();
    this.valuesToSave = new Map();
    this.valuesToSave = new Map();
    this.horaToId = new Map();
    this.isEdited = new Map();
    this.pieIsEdited = new Map();
    this.pieValues = new Map();
    this.pieValuesToSave = new Map();
    this.pieNombres = new Map();
    for ( let i=0; i<13; i++ )  {
      this.pieIsEdited.set(i, false);
      this.pieValues.set(i, null);
      this.pieValuesToSave.set(i, null);
    }
    fieldsArray.forEach(field => {
      this.values.set(field, new Map());
      this.valuesToSave.set(field, new Map());
      this.isEdited.set(field, new Map());
    });

  }

  deleteForm() {
    Object.keys(this.profPieFormGroup.controls).forEach(
      name => this.profPieFormGroup.removeControl(name));
  }

  ngOnDestroy(): void {
    this.deleteForm();
    this.subsManagerService.unsubscribeAll();
  }

	get selectedDateAsString() {
    const selectedDate = new Date(this.model.year, this.model.month-1, this.model.day);
		const dayString = fullDaysOfWeek[selectedDate.getDay()];
    const monthString = fullMonths[selectedDate.getMonth()];
    const dayOfMonth = selectedDate.getDate();
    const fullYear = selectedDate.getFullYear();
    return `${dayString} ${dayOfMonth} de ${monthString}, ${fullYear}`;
	}

  setSelectedDateIds() {
    this.selIdsService.setId(yearTable, this.yearToTableId.get(this.model.year)!);
    this.selIdsService.setId(monthTable, this.monthToTableId.get(this.model.month)!);
    this.selectedDay = this.model.day;
    this.selectedDate = new Date(this.model.year, this.model.month-1,this.model.day);
    // this.today = new Date();
    this.today = new Date();
    this.isToday = (
      (this.today.getFullYear() == this.selectedDate.getFullYear())
      && (this.today.getMonth() == this.selectedDate.getMonth())
      && (this.today.getDate() == this.selectedDate.getDate()));
    let dixId = this.selectedDate.getDay();  // 0: Dom, 1: Lun, ...
    if ( dixId === 0 ) {
      dixId = 7;
    }
    this.selIdsService.setId(dayOfWeekTable, dixId);
  }

  datePickerCallback() {
    this.setSelectedDateIds();
    this.selIdsService.notifyUpdated();
  }

  emptyFunction(e: any) {

  }

  getSelectorText(table: string) {
    return this.selIdsService.getText(table);
  }

  getLabel(table: string, object: any) {
    return this.labelsService.getObjectLabel(table, object);
  }

  getObjectLabel(table: string, object: Object) {
    // para usar LabelsService.getObjectLabel desde html
    return this.labelsService.getObjectLabel(table, object);
  }

  asistenciaHombres(hora: number) {
    return this.n_hombres - this.valuesToSave.get('inasistentesHombres')!.get(hora)!;
  }

  asistenciaMujeres(hora: number) {
    return this.n_mujeres - this.valuesToSave.get('inasistentesMujeres')!.get(hora)!;
  }

  enableDisableInput(hora: number) {
    this.inputIsEnabled[hora] = !this.inputIsEnabled[hora];
    if ( !this.inputIsEnabled[hora] ) {
      this.saveValues(hora);
    }
  }

  updateTable(notification: (Notification | null) = null) {
    this.numEntries = 0;
    this.allSelectorsSet = false;
    if ( !notification || notification.message == 'updated' ) {
      if ( this.selIdsService.getId('colegio')*this.selIdsService.getId('curso') > 0 ) {
        this.allSelectorsSet = true;
        let subsMain = this.crud.getDataCustom(
          this.mainTable, 'porDia',
          this.selIdsService.getIds(this.fKeysAll), 
          // {dia: this.selIdsService.getId(dayOfWeekTable)})
          {dia: this.model.day})
        .subscribe(query => {
        // console.log(this.fKeysAll, this.selIdsService.getIds(this.fKeysAll))
        const subsProfPie = this.crud.getDataCustom(
          'inscripcioncolegio', 'profesPie',
          this.selIdsService.getIds(['colegio', 'anno']))
          .subscribe((profesoresPie: ProfesorPie[]) => {
            // console.log("profesoresPie", this.selIdsService.getIds(['colegio', 'anno']));
            console.log(profesoresPie);
            this.profesoresPie = profesoresPie;
            profesoresPie.forEach(profPie => {
              this.pieNombres.set(profPie.id, `${profPie.apellido}, ${profPie.nombre}`);
            });
            const queryIds = this.selIdsService.getIds(['colegio', 'curso', 'anno']);
            const subsCount = this.crud.getDataCustom(
              'matricula', 'countHombresMujeres', queryIds)
              .subscribe(
                result => {
                  this.n_hombres = result["n_hombres"];
                  this.n_mujeres = result["n_mujeres"];
                  this.n_curso = this.n_mujeres + this.n_hombres;
                }
              );
            this.subsManagerService.registerSubscription(subsCount, "subsCount"); 
            if ( query.length === 0 ) {   
              // consulta al horario para crear entradas en ControlAsignatura

              let subsPopulateDia = this.crud.createDataCustom(
                {
                  anno: this.model.year,
                  mes: this.model.month,
                  dia: this.model.day,
                  diaSemana: this.selIdsService.getId(dayOfWeekTable)
                },
                'controlasignatura', 'populateDia',
                [this.selIdsService.getId('colegio'),
                this.selIdsService.getId('curso'),
                this.selIdsService.getId(yearTable)]
                ).subscribe(message => {
                  if ( message.newData ) {
                    this.updateTable();
                  }
                });
              this.subsManagerService.registerSubscription(
                subsPopulateDia, 'populateDia');
            } else {  // console.log('query.length:', query.length, query)
              this.processQuery(query);
            }
          });
          this.subsManagerService.registerSubscription(subsProfPie, 'profPie');
        });
        this.subsManagerService.registerSubscription(
          subsMain, 'control-asignatura-main');
      } else {
        this.clearTable();
      }
    }
  }

  clearTable() {
    this.numEntries = 0;
    this.horaToId.clear();
    this.nombresAsignaturas.clear();
    this.nombresProfesores.clear();
    for ( let i=0; i<13; i++ )  {
      this.editable.set(i+1, false);
      this.pieIsEdited.set(i, false);
      this.pieValues.set(i, null);
      this.pieValuesToSave.set(i, null);
    }
    fieldsArray.forEach(field => {
      this.values.get(field)!.clear();
      this.valuesToSave.get(field)!.clear();
      this.isEdited.get(field)!.clear();
    });
  }

  changeProfPie(hora: number, event: any) {

    const newId = +event.target.value;
    const isEdited = newId != this.pieValues.get(hora);
    this.pieValuesToSave.set(hora, newId);
    this.pieIsEdited.set(hora, isEdited);

  }

  processEntry(entry: any) {
    this.numEntries += 1;
    const hora = entry.hora; // .log('isToday:',this.isToday)
    if ( this.isToday ) {
      const editable = ( this.tipoUsuario == 'profesor' );
      // console.log(this.tipoUsuario, editable)
      this.editable.set(hora, editable);
    }
    this.nombresAsignaturas.set(hora, entry.Asignatura.nombre );
    this.nombresProfesores.set(hora, `${entry.Profesor.apellido1} ${entry.Profesor.apellido2} ${entry.Profesor.nombre}`);
    this.horaToId.set(hora, entry.id);
    fieldsArray.forEach( fd => this.isEdited.get(fd)!.set(hora, false));
    fieldsArray.forEach(field => {
      if ( entry.hasOwnProperty(field) ) {
        this.values.get(field)?.set(hora, entry[field]);
        this.valuesToSave.get(field)?.set(hora, entry[field]);
      }
    });
    const profPieId = entry.ProfesorPie == null ? 0 : entry.ProfesorPie.id;
    this.pieValues.set(hora, profPieId);
    if ( profPieId != 0 ) {
      if ( hora != null ) {
        let value: any = {};
        const hr = hora.toString();
        value[hr] = profPieId;
        this.profPieFormGroup.patchValue(value);
      }
    }
  }

  processQuery(query: ControlAsignatura[]) {
    this.clearTable(); // console.log('poronga',query)
    for ( let caEntry of query ) {  // console.log('poronga entry',caEntry)
      this.processEntry(caEntry);
    }
  }

  saveValues(hora: number | null = null) {
    let anyEditedSet = new Set<number>();

    if ( hora == null ) {
      for ( let hr=1; hr<13; hr++) {
        if ( this.pieIsEdited.get(hr)) { anyEditedSet.add(hr); }
        this.isEdited.forEach((editedMap, field) => {
          if ( editedMap.get(hr) ) { anyEditedSet.add(hr) }
        });
      }
    } else {
      if ( this.pieIsEdited.get(hora)) { anyEditedSet.add(hora); }
      this.isEdited.forEach((editedMap, field) => {
        if ( editedMap.get(hora) ) { anyEditedSet.add(hora) }
      });
    }

    anyEditedSet.forEach(hr => {
      let controlAsignatura: any = {
        id: this.horaToId.get(hr)
      };
      for ( let fd of fieldsArray) {
        if ( this.isEdited.get(fd)!.get(hr) ) {
          controlAsignatura[fd] = this.valuesToSave.get(fd)!.get(hr);
        }
      }
      const pieValue = this.pieValuesToSave.get(hr);
      controlAsignatura['ProfesorPie'] = pieValue == 0 ? null : pieValue;
      const subs = this.crud.putData(controlAsignatura, this.mainTable)
      .subscribe(
        (response) => {
          if ( response ? response.success : true ) {
            this.pieValues.set(hr, this.pieValuesToSave.get(hr)!);
            this.pieIsEdited.set(hr, false);
            this.displayAlert(this.successfulSaveAlert, 800);
            fieldsArray.forEach( field => {
                this.values.get(field)!.set(
                  hr, this.valuesToSave.get(field)!.get(hr));
                this.isEdited.get(field)!.set(hr, false);
              }
            );
          } else {  // algo no se guardo
            this.displayAlert(this.errorAlert, 300);
          }
        }
      );
      this.subsManagerService.registerSubscription(
        subs, `saveValues-${hr}-${Date.now()}`);
    });

  }

  resetValue(field: string, hora: number, textInput: any) {
    const oldValue = this.values.get(field)!.get(hora)!;
    textInput.value = oldValue;
    this.valuesToSave.get(field)!.set(hora, oldValue);
    for ( let fd of fieldsArray ) {
      if ( fd != field ) {}
    }
    this.isEdited.get(field)!.set(hora, false);
    textInput.blur();
  }

  onKeyField(field:string, hora: number, textInput: any, n_max: number) {
    const defaultValue = this.values.get(field)!.get(hora)!
    let value = Number(textInput.value);
    const edited = Number.isInteger(value) && value >= 0 && value <= n_max && (value != defaultValue);
    this.isEdited.get(field)!.set(hora, edited);
    if ( !edited ) {
      value = defaultValue;
      textInput.value = defaultValue;
    }
    this.valuesToSave.get(field)!.set(hora, value);
  }

  onKeyFieldText(field: string, hora: number, textInput: any) {
    const defaultValue = this.values.get(field)!.get(hora)!
    this.isEdited.get(field)!.set(hora, textInput.value != defaultValue);
    this.valuesToSave.get(field)!.set(hora, textInput.value);
  }
}
