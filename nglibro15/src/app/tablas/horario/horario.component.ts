import { Component, OnDestroy, OnInit, HostListener, Inject } from '@angular/core';
import { CrudService } from '../../shared/services/crud/crud.service';
// import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, of, share, Subscription, take, tap } from 'rxjs';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { Notification } from '../../interfaces/generic.interface';
import { modalDataObject, lowerUpperTables, fKeysByTable, environment  } from '../../../environments/environment';
import { ModalDialogComponent } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { OriginTableIdService } from '../../shared/services/origin-table-id/origin-table-id.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Permission } from 'src/environments/environment.development';
import { ActivatedRoute } from '@angular/router';



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

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

  btable!:string;

  crear = true;
  editar = true;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  disabled = {};

  currentDate:Date = new Date();

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  stateOfButtonPlus=true;
  stateOfButtonEdit=true;

  modalDataObj!: any;

  takenDaysMap = new Map<number, number[]>([[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]]]);
  takenDaysProf:any = []
  horaasignada$!: Observable<any>;

  selecTableRange!:number[];
  selecTablePeriod:number[]=[...Array(12).keys()];
  // selecTablePeriodMap: any = new Map<number, any[]>();
  // selecTableDays:number[]=[...Array(6).keys()];

  cursoProfesorMap:any =  new Map<number, any>();

  mainQuery$!:Observable<any>;
  mainTableForeignKeys!: string[];
  changeFnsArray: Function[] = [];
  changeFnsModalArray: Function[] = [];

  // Selectores

  selTables = ["anno", "colegio", "curso","cursoprofesor"];
  mainTable = 'horario';
  ignoreFkRequirements = ['profesor','asignatura'];
  patchFKsFromStorage = ['colegio', 'curso', 'anno'];

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
   {id:5, nombre: 'Viernes'}];

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

  bgmodal!:string;
  modalbutton!:string;
  matbutton!:string;

  constructor(private crud: CrudService,
    
    originTableIdsService: OriginTableIdService,
    activatedRoute: ActivatedRoute,
    private subsManagerService: SubscriptionsManagerService,
    public dialog: MatDialog,
    private selIdsService: SelectionIdsService,
    private fkService: ForeignKeysService,
    private iconsService: IconsService,
    private getpermission: GetPermissionService

     ) {

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

    }

      this.vhorario$!.pipe(
        map((val:any) => busca1(val)),
        share()
      ).subscribe()
  }

  initValidators2() {
    this.takenDaysProf = [];
    const busca2 = (val:any):any => {

       val.forEach((v:any) => this.takenDaysProf.push({hora: v.hora, dia: v.Dix.id, cursoprofesor: v.CursoProfesor.id}))

    }

      this.phorario$!.pipe(
        map((val:any) => busca2(val)),
        take(1)
      ).subscribe()
  }

  getColor = (color:string | null) => {

    if (color == null) {  color = localStorage.getItem('Color')  }

    if (color=='primary') {
      this.btable = "table table-primary table-striped table-bordered table-sm";
      this.bodybgcolor = this.objcolors.primary.bodybgcolor;
      this.pagination = this.objcolors.primary.pagination;
      this.tablehead = this.objcolors.primary.tablehead;
      this.bgmodal = this.objcolors.primary.bgmodal;
      this.modalbutton = this.objcolors.primary.modalbutton;
      this.matbutton = this.objcolors.primary.matbutton
      this.url = this.photo.primary;
    }
    if (color=='success') {
      this.btable = "table table-success table-striped table-bordered table-sm";
      this.bodybgcolor = this.objcolors.success.bodybgcolor;
      this.pagination = this.objcolors.success.pagination;
      this.tablehead = this.objcolors.success.tablehead;
      this.bgmodal = this.objcolors.success.bgmodal;
      this.modalbutton = this.objcolors.success.modalbutton;
      this.matbutton = this.objcolors.success.matbutton;
      this.url = this.photo.success;
    }
    if (color=='info') {
      this.btable = "table table-info table-striped table-bordered table-sm";
      this.bodybgcolor = this.objcolors.info.bodybgcolor;
      this.pagination = this.objcolors.info.pagination;
      this.tablehead = this.objcolors.info.tablehead;
      this.bgmodal = this.objcolors.info.bgmodal;
      this.modalbutton = this.objcolors.info.modalbutton;
      this.matbutton = this.objcolors.info.matbutton;
      this.url = this.photo.info;

    }
}


  ngOnInit(): void {


    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) {
        let disabled = this.getpermission.getPermission(Permission['Horario'],info)
        this.editar = disabled.editar;
        this.crear = disabled.crear;
      }

      }

      ),share()

    ).subscribe()

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
    // let i=0
    let horaMap = new Map<number, any>();
    let vjson:any[] = [];

    horario?.forEach((h:any) => {
         // console.log('h:', h.CursoProfesor.id, this.cursoProfesorMap.get(h.CursoProfesor.id));

         horaMap.set(h.hora, { id: h.id, hora: h.hora,
         CursoProfesor: {...h.CursoProfesor, asignatura:this.cursoProfesorMap.get(h.CursoProfesor.id)[1]},
         profesor: this.cursoProfesorMap.get(h.CursoProfesor.id)[0], Dix: h.Dix})

        }
        )

    for (let key of this.selecTablePeriod) {
        if (horaMap.has(key+1)) {  // console.log(horaMap.get(key+1));
          vjson.push(horaMap.get(key+1)) // para validador hora
        } else {
          vjson.push({})
        } ;
    }

    this.dayOfWeekMap.set(dia,vjson);

  };

  getDaysOfWeek(): void {

    let fks = this.getForeignKeysOfMainTable()

    // Validadiones

    if (this.mainTable=='horario') {
      this.vhorario$ = this.crud.getData('horario',[fks[0],fks[1],fks[2],0,0])! // validar tipo 1 => mismo horario
      this.initValidators1()
      this.phorario$ = this.crud.getData('horario',[fks[0],fks[1],0,0,0])! // validar tipo 2 => profesor distintos cursos
      this.initValidators2()
    }

    const getHorarios = () => {

      this.days.forEach((d:any) => {

        const subscribe:any =  this.horarios$.pipe(
          map(horario => horario.filter((h:any) => +h.Dix.id == d.id)),
          tap(horario => this.obtenerHorasAsignadas(horario, d.id-1)),
          share()
        ).subscribe(() => this.subsManagerService.registerSubscription(subscribe, "sh-msg"))
        })
    }
    /*  else {
        this.dayOfWeekMap.clear();
        this.stateOfButtonPlus=true;
    }*/

    //}

    if (fks[0] * fks[1] * fks[2] > 0) {

      this.horarios$ = this.crud.getData('horario',fks)!;

      this.crud.getData('cursoprofesor',[fks[0],fks[1],fks[2],0,0])!.pipe(
        tap(val => val.forEach((v:any) => this.cursoProfesorMap.set(
            v.id,[v.Profesor.apellido1 + ' ' + v.Profesor.apellido2 + ' ' + v.Profesor.nombre, v.Asignatura.nombre]
          )
        )),
      ).subscribe(() => getHorarios())

      this.stateOfButtonPlus=false;

      if (fks[3] > 0) { this.stateOfButtonEdit= (this.editar == false) ?  false : true;  }
      else { this.stateOfButtonEdit = true; }

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

    reg['bgmodal'] = this.bgmodal;
    reg['modalbutton'] = this.modalbutton;

    let modaldata : any = this.modalData

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {registro: reg, valida1: this.takenDaysMap, valida2: this.takenDaysProf,
       ...modaldata, tabla: 'Horario'}, height: this.modalHeight , width: '600px',
    });

    dialogRef.afterClosed().pipe(
      tap(result => {
          this.updateTable();
          console.log('The dialog was closed', result);
      }),share()
    )
    .subscribe();
  }
}
