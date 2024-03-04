import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { CrudService } from '../../shared/services/crud/crud.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, of, Subscription, take, tap } from 'rxjs';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { Notification } from '../../interfaces/generic.interface';
import { modalDataObject, lowerUpperTables, fKeysByTable, environment  } from '../../../environments/environment';
import { ModalDialog } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { OriginTableIdService } from '../../shared/services/origin-table-id/origin-table-id.service';
import { MessageService } from '../../shared/services/message/message.service';
import { CommonModule, NgFor } from '@angular/common';
import { MultiSelectComponent } from '../../shared/componentes/multi-select/multi-select.component';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})

export class HorarioComponent implements OnInit, OnDestroy {

  titulo="Horario Curso";
  tabla="Horario";

  idColegio = 0;
  idCurso = 0;
  idAnno = 0;
  idProfesor = 0;
  idDix = 0;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  stateOfplusButton=false;
  stateOfModalEdit=false;

  modalDataObj!: any;

  takenDaysMap = new Map<number, number[]>([[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]]]);
  takenDaysProf:any = []
  horaasignada$!: Observable<any>;

  selecTableRange!:number[];
  selecTablePeriod:number[]=[...Array(12).keys()];
  // selecTablePeriodMap: any = new Map<number, any[]>();
  // selecTableDays:number[]=[...Array(6).keys()];

  mainQuery$!:Observable<any>;
  mainTableForeignKeys!: string[];
  changeFnsArray: Function[] = [];
  changeFnsModalArray: Function[] = [];

  // Selectores

  selTables = ["anno", "colegio", "curso", "profesor","asignaturaprofesor","dix"];
  mainTable = 'horario';
  ignoreFkRequirements = ['asignatura'];
  patchFKsFromStorage = ['colegio', 'profesor', 'anno'];


  // Principal

  selectablas = [];
  campos = [];
  fechas = []
  tablas = []

  // Modal

  modalData = modalDataObject.Horario;
  modalHeight = modalDataObject.height;
  // dictio = lowerUpperTables;

  // Router
  multiSelectInitIds: {[key: string]: number} = {};

  days: any = [{ id:1, nombre: 'Lunes'}, {id:2, nombre: 'Martes'}, {id:3 , nombre: 'Miercoles'}, {id:4 , nombre: 'Jueves'},
   {id:5, nombre: 'Viernes'}, {id:6, nombre: 'Sabados'}];

  mostraHorario = false;

  todas: Array<any> = [];

  fatherId=0;
  father='';


  horarios$! : Observable<any>;
  vhorario$! : Observable<any>;


  phorario$: Observable<any> = this.crud.getData('horario',[this.idAnno,this.idColegio,0,this.idProfesor,0,this.idDix])! // valida tipo 2 prfesor

  todos: Array<any> = [];

  dayOfWeekMap = new Map<number, any[]>();


  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  constructor(private crud: CrudService,
    // route: ActivatedRoute,
    ms: MessageService,
    originTableIdsService: OriginTableIdService,
    activatedRoute: ActivatedRoute,
    private subsManagerService: SubscriptionsManagerService,
    public dialog: MatDialog,
    private selIdsService: SelectionIdsService,
    private fkService: ForeignKeysService,
    private iconsService: IconsService,

     ) {

      ms.color_msg.subscribe(color =>  {


        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
        }
        if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
        }
        if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.tablehead;
        }
      })


      activatedRoute.params.subscribe(params =>
        this.crud.getDataPk('region', 1)
        .subscribe( () => { originTableIdsService.nextMsg(params); })
      )
    }

     getBiClass(route: string) {
      // permite acceder a iconsService.getBiClass desde html
      return this.iconsService.getBiClass(route);
    }

     updateTable(notification: (Notification | null) = null) {


      if ( !notification || notification.message == "updated" ) { this.getDaysOfWeek(); }
    }


  initValidators1() {
    this.takenDaysMap.clear();
    this.takenDaysMap.set(1,[]);
    this.takenDaysMap.set(2,[]);
    this.takenDaysMap.set(3,[]);
    this.takenDaysMap.set(4,[]);
    this.takenDaysMap.set(5,[]);
    this.takenDaysMap.set(6,[]);

    const busca1 = (val:any):any => {

      var arreglo:number[] = [];
      const getmapa = (mapa:any) : any => { return mapa }

      val.forEach((v:any) => {
        arreglo=[];
        if (v.hora) {
            arreglo = getmapa(this.takenDaysMap.get(v.Dix.id))
            arreglo?.push(v.hora)
            this.takenDaysMap.set(v.Dix.id,arreglo)
          }
       })
       // console.log(mapa)
    }

      this.vhorario$!.pipe(
        map((val:any) => busca1(val)),
        take(1)
      ).subscribe()
  }

  initValidators2() {
    this.takenDaysProf = [];
    const busca2 = (val:any):any => {

       val.forEach((v:any) => this.takenDaysProf.push({hora: v.hora, dia: v.Dix.id, profesor: v.Profesor.id}))

    }

      this.phorario$!.pipe(
        map((val:any) => busca2(val)),
        take(1)
      ).subscribe()
  }


  ngOnInit(): void {


    this.horaasignada$ = this.crud.getData('horaasignada',[this.getId('colegioId')])!;

    this.modalDataObj = modalDataObject['Horario']
    this.mainTableForeignKeys = this.fkService.getFKeys(this.mainTable)!;
    this.selIdsService.subscribe(
      'horario', (message: (Notification)) =>  this.updateTable(message) );
  }

  onPrint() {
    window.print();
  }



  getForeignKeysOfMainTable() {
    let fKeys = [];
    for ( let t of this.mainTableForeignKeys) {
      fKeys.push(this.selIdsService.getId(t));
    }
    return fKeys;
  }

  getId(table: string) {
    return this.selIdsService.getId(table);
  }

  obtenerHorasAsignadas(horario: any, dia: number)  {
    let i=0
    let horamap = new Map<number, any>();
    let vjson:any[] = [];


    horario.forEach((h:any) => horamap.set(h.hora, { id: h.id, hora: h.hora,
      Profesor: h.Profesor,AsignaturaProfesor: h.AsignaturaProfesor,  Colegio: h.Colegio, Curso: h.Curso, Anno: h.Anno, Dix: h.Dix}))

    for (let key of this.selecTablePeriod) {
        if (horamap.has(key+1)) {
          vjson.push(horamap.get(key+1)) // para validador hora
        } else {
          vjson.push({})
        } ;
    }
    // console.log(dia,vjson)
    this.dayOfWeekMap.set(dia,vjson);

  };

  getDaysOfWeek(): void {

    let fks = this.getForeignKeysOfMainTable()
    // console.log('fks->',fks)

    // Validadiones
    if (this.mainTable=='horario') {
      this.vhorario$ = this.crud.getData('horario',[fks[0],fks[1],fks[2],0,0,0])! // validar tipo 1 => mismo horario
      this.initValidators1()
      this.phorario$ = this.crud.getData('horario',[fks[0],fks[1],0,0,0,0])! // validar tipo 2 => profesor distintos cursos
      this.initValidators2()
    }

    if (fks[0] * fks[1] * fks[2] > 0) {



      this.stateOfplusButton=true;
      this.stateOfModalEdit= (fks[0] * fks[1] * fks[2] * fks[3] > 0) ?  true : false;

      this.horarios$ = this.crud.getData('horario',fks)!;

      this.days.forEach((d:any) => {

      const subscribe:any =  this.horarios$.pipe(
        map(horario => horario.filter((h:any) => +h.Dix.id == d.id)),
        tap(horario => this.obtenerHorasAsignadas(horario, d.id-1)),

      ).subscribe(() => this.subsManagerService.registerSubscription(subscribe, "sh-msg"))
      })
    }
  }

  ngOnDestroy() {
    this.subsManagerService.unsubscribeAll();
  }


  openDialog(reg: any, type: string): void {



    if (reg) {


      this.modalDataObj.tables.forEach((table: string) => {

        reg[lowerUpperTables[table]] = {
            id: this.selIdsService.getId(table.toLocaleLowerCase()) || 0
          }

        })

      reg['Anno'] = { id: this.getId('anno') }
      reg['Colegio'] = { id: this.getId('colegio') }
      reg['Curso'] = { id: this.getId('curso') }

      if (type=='create') {

        reg['Dix'] = { id: reg['Dix'] }
        reg['id']  = 0
      }

   }

    let modaldata : any = this.modalData

    const dialogRef = this.dialog.open(ModalDialog, {
      data: {registro: reg, valida1: this.takenDaysMap, valida2: this.takenDaysProf,
       ...modaldata, tabla: 'Horario'}, height: this.modalHeight , width: '600px',
    });

    dialogRef.afterClosed().pipe(
      tap(result => {
          this.updateTable();
          console.log('The dialog was closed', result);
      })
    )
    .subscribe();
  }
}
