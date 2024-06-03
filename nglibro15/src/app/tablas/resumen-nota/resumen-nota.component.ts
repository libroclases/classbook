import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { ForeignKeysService } from 'src/app/shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from 'src/app/shared/services/icons/icons.service';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';
import { environment, modalDataObject } from 'src/environments/environment';

import { Notification } from '../../interfaces/generic.interface';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Permission } from 'src/environments/environment.development';

@Component({
  selector: 'app-resumen-nota',
  templateUrl: './resumen-nota.component.html',
  styleUrls: ['./resumen-nota.component.css']
})
export class ResumenNotaComponent implements OnInit{
  idsMap!: Map<string, number>;
  mainTableForeignKeys!: string[];
  fkIds:any=[];

  isInVentana$!: Observable<any>;

  mainTable: string = 'resumennota';

  valorPromedio: any = [];

  disable = {};
  currentDate:Date = new Date();

  tablaId = 5;

  currPage = 0;
  countNotas: any = {};
  sumaAsignaturaMap : any = new Map<number, number>();

  matriculaPromedioMap: any = new Map<number, any>();
  promedioMatriculaMap: any = new Map<number, number>();
  promedioAsignaturaMap: any = new Map<number, number>();
  asignaturaMap: any = new Map<number, object>();

  ponderacionMap: any = new Map<number,number>();
  notasIndiceMap: any = new Map<string, string>();

  asignaturaEdit = 0;  // marca columna a editar
  edita = false;
  showtable = true;
  promedio: number | null = 0;

  // Modal

  modalDataObj!: any;

  // Tabla Principal


  tableTitle = 'Notas';
  textFields = ['hora'];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = [];
  redirectRoutes!: string[];

  // Selectores

  selTables = [  "anno", "periodo", "colegio", "curso"  ];
  tableLabels = ['Año', 'Periodo','Colegio' ,'Curso' ];
  ignoreFkRequirements: string[] = ['asignatura'];
  changeFnsArray: Function[] = [];
  patchFKsFromStorage = ['anno','periodo','colegio'];

  fatherId=0;
  father='';

  resumennotaFk:any=[]

  asignatura$!: Observable<any>;
  matricula$!: Observable<any>;
  resumennota$!: Observable<any>;

  ponderacion = 0;
  // numMatriculas = 0;
  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";
  // notasForm!: FormGroup;

  //   colores

  numColumns = 8

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  bgmodal!:string;
  modalbutton!:string;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  // size screen

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;


  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  constructor(private crud: CrudService,
      // route: ActivatedRoute,
      private selIdsService: SelectionIdsService,
      // public dialog: MatDialog,
      private fkService: ForeignKeysService,
      private iconsService: IconsService,
      private getpermission: GetPermissionService,
      // private fb: FormBuilder,
      // private dt: GetdatetimeService
    ) {
      /*
      const getPermision = (msg: any) => { if(msg) {
        const year = this.currentDate.getFullYear();
        this.disable = (msg.esUtp && msg.anno.id == (year - 2020) && msg.colegio==1) ? false : true;
        }

      }
      */

/*

this.usuario$.subscribe(info => {
  if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
  else { getColor(localStorage.getItem('Color')) }
});

*/
/*
  this.userInfo.personalInfo$.subscribe(info => info.inscripcionColegio.forEach((el:any) => {
    getPermision({esUtp: el.esUtp,anno: el.Anno, colegio: el.Colegio.id});
    getColor(info.personalInfo.usuario.Tema.nombre);
  }))
*/
      // this.notasForm = new FormGroup({})

     }

  numcols = 0;
  numrows = 0;

 getcolor(promedio: number):string { return (promedio>=4) ? 'black' : 'red' }

 getnumber(num1:any, num2:number ) : number { return num1/num2 }

  getAsignaturaData() {
       const fks = [
        this.selIdsService.getId('anno'),
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        0
      ]

      this.asignatura$.pipe(
          tap(asignatura => {
            this.numcols = Object.keys(asignatura).length
            /*
              this.ponderacion=0;
              asignatura.forEach((e:any) => {
                this.numcols++;
                this.asignaturaMap.set(e.id,e);

                this.sumaAsignaturaMap.set(e.id, 0);

                this.countNotas[e.id]=0;
                this.ponderacion+=e.ponderacion

              }
            );
            */
           }
          ),
       )
       .subscribe(() => {
        this.getMatriculaData();
        }
        )
  }

  matricula:any={};
  asignatura:any={};

  getMatriculaData():  void {
    let anno = this.selIdsService.getId('anno');
    let curso = this.selIdsService.getId('curso');
    let colegio = this.selIdsService.getId('colegio');
    let periodo = this.selIdsService.getId('periodo');
    let ides = [
      colegio,
      curso,
      anno
    ]
      const mostranotas = (res:any) : void => {
        let tmp_mat:any={};
        let tmp_asig:any={};
        res.forEach((r:any) => {
          tmp_mat[r.Matricula.id] = (this.matricula[r.Matricula.id]) ? this.matricula[r.Matricula.id] : 0;
          tmp_asig[r.Asignatura.id] = (this.asignatura[r.Asignatura.id]) ? this.asignatura[r.Asignatura.id] : 0;

          this.matricula[r.Matricula.id] = tmp_mat[r.Matricula.id] + r.promedio
          this.asignatura[r.Asignatura.id] = tmp_asig[r.Asignatura.id] + r.promedio
        })
        // console.log(Object.keys(this.matricula).length)
      }

      this.matricula$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres',ides )?.pipe(

        tap(mat => {
          mat.forEach((m:any) => {

            this.matriculaPromedioMap.set(m.id,
              this.crud.getData('resumennota',[anno,periodo,colegio,curso,0,m.id])?.pipe(
                tap(res => mostranotas(res)
              )
             )
            )
            }
          )
       }
      ),
      tap(mat => this.numrows = Object.keys(mat).length)
    )
  }

  getBiClass(route: string) {
      return this.iconsService.getBiClass(route);
    }

  getForeignKeys(table: string) {
    let fKeys = [];
    for ( let t of this.fkService.getFKeys(table)!) {
      fKeys.push(this.selIdsService.getId(t));
    }
    return fKeys;
  }

     updateTable(notification: (Notification | null) = null) {

      this.resumennotaFk = this.getForeignKeys('resumennota')

      if ( !notification || notification.message == "updated" ) {
        /*console.log(this.selIdsService.getId('anno'),
        this.selIdsService.getId('periodo'),
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'));*/

        if (this.selIdsService.getId('anno') *
            this.selIdsService.getId('periodo') *
            this.selIdsService.getId('colegio') *
            this.selIdsService.getId('curso') > 0) {

            this.getAsignaturaData();


        }

      }
    }

    getColor = (color:string | null) => {

      if (color=='primary' || !color) {
        this.bodybgcolor = this.objcolors.primary.bodybgcolor;
        this.pagination = this.objcolors.primary.pagination;
        this.tablehead = this.objcolors.primary.tablehead;
        this.bgmodal =  this.objcolors.primary.bgmodal;
        this.modalbutton = this.objcolors.primary.modalbutton;
        this.url = this.photo.primary;
      }
      else if (color=='success') {
        this.bodybgcolor = this.objcolors.success.bodybgcolor;
        this.pagination = this.objcolors.success.pagination;
        this.tablehead = this.objcolors.success.tablehead;
        this.bgmodal =  this.objcolors.success.bgmodal;
        this.modalbutton = this.objcolors.success.modalbutton;
        this.url = this.photo.success;
      }
      else if (color=='info') {
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.tablehead;
        this.bgmodal =  this.objcolors.info.bgmodal;
        this.modalbutton = this.objcolors.info.modalbutton;
        this.url = this.photo.info;
      }
}

    ngOnInit(): void {

      this.usuario$.pipe(
        tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
        tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['Nota'],info)}})

      ).subscribe()

      this.modalDataObj = modalDataObject['Asignatura']

      this.selIdsService.msg.pipe(
        tap((message: (Notification)) =>  this.updateTable(message))
      )
      .subscribe() ;
    }


 }
