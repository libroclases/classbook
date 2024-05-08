import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { ForeignKeysService } from 'src/app/shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from 'src/app/shared/services/icons/icons.service';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';
import { environment, modalDataObject } from 'src/environments/environment';

import { Notification } from '../../interfaces/generic.interface';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';

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

  disable = true;
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
  patchFKsFromStorage = [];

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
      // private fb: FormBuilder,
      // private dt: GetdatetimeService
    ) {

      const getPermision = (msg: any) => { if(msg) {
        const year = this.currentDate.getFullYear();
        this.disable = (msg.esUtp && msg.anno.id == (year - 2020) && msg.colegio==1) ? false : true;
        } 
  
      }
  
     const getColor = (color:string | null) => {
      
      if (color=='azul' || !color) {
        this.bodybgcolor = this.objcolors.azul.bodybgcolor;
        this.pagination = this.objcolors.azul.pagination;
        this.tablehead = this.objcolors.azul.tablehead;
        this.bgmodal =  this.objcolors.azul.bgmodal;
        this.modalbutton = this.objcolors.azul.modalbutton;
        this.url = this.photo.azul;
      }
      else if (color=='verde') {
        this.bodybgcolor = this.objcolors.verde.bodybgcolor;
        this.pagination = this.objcolors.verde.pagination;
        this.tablehead = this.objcolors.verde.tablehead;
        this.bgmodal =  this.objcolors.verde.bgmodal;
        this.modalbutton = this.objcolors.verde.modalbutton;
        this.url = this.photo.verde;
      }
      else if (color=='naranjo') {
        this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
        this.pagination = this.objcolors.naranjo.pagination;
        this.tablehead = this.objcolors.naranjo.tablehead;
        this.bgmodal =  this.objcolors.naranjo.bgmodal;
        this.modalbutton = this.objcolors.naranjo.modalbutton;
        this.url = this.photo.naranjo;
      }
}
 


this.usuario$.subscribe(info => {
  if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
  else { getColor(localStorage.getItem('Color')) }
});


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
      
      this.asignatura$ = this.crud.getData('asignaturacurso', fks)!
      
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
          tmp_asig[r.AsignaturaCurso.id] = (this.asignatura[r.AsignaturaCurso.id]) ? this.asignatura[r.AsignaturaCurso.id] : 0;

          this.matricula[r.Matricula.id] = tmp_mat[r.Matricula.id] + r.promedio
          this.asignatura[r.AsignaturaCurso.id] = tmp_asig[r.AsignaturaCurso.id] + r.promedio
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

    ngOnInit(): void {

      this.modalDataObj = modalDataObject['Asignatura']

      this.selIdsService.msg.pipe(
        tap((message: (Notification)) =>  this.updateTable(message))
      )
      .subscribe() ;
    }


 }
