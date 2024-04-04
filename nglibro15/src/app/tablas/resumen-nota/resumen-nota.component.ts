import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { ForeignKeysService } from 'src/app/shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from 'src/app/shared/services/icons/icons.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';
import { environment, modalDataObject } from 'src/environments/environment';

import { Notification } from '../../interfaces/generic.interface';

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

  mainTable: string = 'nota';

  valorPromedio: any = [];

  tablaId = 5;

  currPage = 0;
  countNotas: any = {};
  sumaAsignaturaMap : any = new Map<number, number>();

  matriculaNotaMap: any = new Map<number, any>();
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

  selTables = [  "anno", "periodo", "colegio", "curso", "profesor"  ];
  tableLabels = ['Año', 'Periodo','Colegio' ,'Curso','Profesor', ];
  ignoreFkRequirements: string[] = [];
  changeFnsArray: Function[] = [];
  patchFKsFromStorage = [];

  fatherId=0;
  father='';

  asignatura$!: Observable<any>;
  matricula$!: Observable<any>;

  ponderacion = 0;
  // numMatriculas = 0;

  // notasForm!: FormGroup;

  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  bgmodal!:string;
  modalbutton!:string;

  // size screen

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = 0;

  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height + 155) + 'px';
  }

  constructor(private crud: CrudService,
      // route: ActivatedRoute,
      ms : MessageService,
      private selIdsService: SelectionIdsService,
      // public dialog: MatDialog,
      private fkService: ForeignKeysService,
      private iconsService: IconsService,
      // private fb: FormBuilder,
      // private dt: GetdatetimeService
    ) {


      ms.color_msg.subscribe(color =>  {


        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
          this.bgmodal =  this.objcolors.azul.bgmodal;
          this.modalbutton = this.objcolors.azul.modalbutton;
        }
        else if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
          this.bgmodal =  this.objcolors.verde.bgmodal;
          this.modalbutton = this.objcolors.verde.modalbutton;
        }
        else if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.tablehead;
          this.bgmodal =  this.objcolors.naranjo.bgmodal;
          this.modalbutton = this.objcolors.naranjo.modalbutton;
        }
      })


      // this.notasForm = new FormGroup({})

     }

  numcols = 2;

  getAsignaturaData() {

     
       let fkasignatura = this.getForeignKeys('asignatura')
    
       this.asignatura$ = this.crud.getData('asignatura', fkasignatura )!
       this.asignatura$.pipe(
          tap(asignatura => {
              this.ponderacion=0;
              asignatura.forEach((e:any) => {
                this.numcols++;
                this.asignaturaMap.set(e.id,e);

                this.sumaAsignaturaMap.set(e.id, 0);

                this.countNotas[e.id]=0;
                this.ponderacion+=e.ponderacion
              });
           }),
       )
       .subscribe(() => { this.getMatriculaData(); }
        )
  }



  sumaPromedioMatricula(matriculaId: number, nota: number) {
      this.promedioMatriculaMap.set(+matriculaId, nota  + this.promedioMatriculaMap.get(+matriculaId))
    }

  getSumAsignatura(e: number) : any {
    let nota = this.sumaAsignaturaMap.get(e)/this.countNotas[e];
    return [nota, (nota>=4) ? "blue" : "red"]
  }


  sumPromedioMatricula(): any {
    let total = 0;
    let cont = 0;
    let nota = 0;
    for (let valor of this.promedioMatriculaMap.values()) {
      total+=valor;
      cont++;
    }
    nota = total/cont;

    return [nota, (nota>=4) ? "blue" : "red"] ;
  }

   getPromedioMatricula(m: number) : any {
       let nota = this.promedioMatriculaMap.get(m);
       return [(nota==0) ? "" : nota , (nota>=4) ? "blue" : "red"]
    }

   sumaPromedioAsignatura(asignaturaId: number, nota: number) {

    this.sumaAsignaturaMap.set(asignaturaId, this.sumaAsignaturaMap.get(asignaturaId) + nota);
   }

 colorNota(nota: number): string { return ( nota>=4.0) ? "blue" : "red"}

  getMatriculaData():  void {

      const sortByDate = (nota:any[]) : any => {
        nota.sort((x,y) => x.Asignatura.fecha < y.Asignatura.fecha ? -1 : 1);
        return nota;
      }

      const cleanVariables = () : void => {
        this.promedioMatriculaMap.clear();
        this.promedioAsignaturaMap.clear();

        this.matriculaNotaMap.clear();


      }

      const getNotasData = (matriculaId:number): Observable<any> => {

          let fknota:any = this.getForeignKeys('nota');
          fknota[6] = matriculaId

          let notas$ : Observable<any> = this.crud.getData('nota', fknota)!;
          /*
          notas$.pipe(map((data) => {
            data.sort((a:Asignatura, b:Asignatura) => {
                return a.fecha < b.fecha ? -1 : 1;
             });
            return data;
            }
            
          ))
          */

          notas$.pipe(
            tap(nota => {
              sortByDate(nota);
              nota.forEach((n:any) => {
              if (n.nota) {
                this.countNotas[n.Asignatura.id]+=1;
            }
          }

          )
        }),

        ).subscribe();

          return notas$;
    }


     cleanVariables();

    let ides = [
      this.selIdsService.getId('colegio'),
      this.selIdsService.getId('curso'),
      this.selIdsService.getId('anno')
    ]
      this.matricula$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres',ides )?.pipe(

      tap(mat => {
        mat.forEach((m:any) => {
        this.matriculaNotaMap.set(m.id, getNotasData(m.id));
        this.promedioMatriculaMap.set(m.id, 0);
      }

      )}),

      tap(() =>  {

        for (let mnm of this.matriculaNotaMap.entries()) {
          mnm[1].subscribe((m:any) => m.forEach((n:any)=>{

            this.sumaPromedioMatricula(n.Matricula.id, n.nota * this.asignaturaMap.get(n.Asignatura.id).ponderacion/100 );
            this.sumaPromedioAsignatura(n.Asignatura.id, n.nota);
            let nota = (n.nota) ? n.nota.toString(): '0';  // OJO
            const indice = n.Asignatura.id.toString() + '-' + n.Matricula.id.toString() + '-' + nota;
            this.notasIndiceMap.set(n.id, indice);

          }

            ))

        }

      }),




    )!



  }

  getCountNotas(asignaturaId: any):number {  return this.countNotas[+asignaturaId] }

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

      if ( !notification || notification.message == "updated" ) {
        if (this.selIdsService.getId('anno') *
            this.selIdsService.getId('periodo') *
            this.selIdsService.getId('colegio') *
            this.selIdsService.getId('curso') *
            this.selIdsService.getId('profesor') *
            this.selIdsService.getId('asignaturaprofesor') > 0) {

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
