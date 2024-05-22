import { Component, HostListener, OnInit } from '@angular/core';
import { CrudService } from '../../shared/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Notification } from '../../interfaces/generic.interface';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { environment, modalDataObject } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Evaluacion } from '../../interfaces/evaluacion.interface';
import { GetdatetimeService } from 'src/app/shared/services/getdatetime/getdatetime.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Permission } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  idsMap!: Map<string, number>;
  mainTableForeignKeys!: string[];
  fkIds:any=[];

  isInVentana$!: Observable<any>;

  mainTable: string = 'nota';

  // colorPromedio!:string;
  // colorPromedioEvaluacion!:string;
  valorPromedio: any = [];

  tablaId = 5;

  currPage = 0;
  countNotas: any = {};
  sumaEvaluacionMap : any = new Map<number, number>();

  matriculaNotaMap: any = new Map<number, any>();
  promedioMatriculaMap: any = new Map<number, number>();
  promedioEvaluacionMap: any = new Map<number, number>();
  evaluationMap: any = new Map<number, object>();

  ponderacionMap: any = new Map<number,number>();
  notasIndiceMap: any = new Map<string, string>();

  evaluationEdit = 0;  // marca columna a editar
  edita = false;
  showtable = true;
  promedio: number | null = 0;

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

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

  selTables = [  "anno", "periodo", "colegio", "curso", "profesor", "asignaturaprofesor",  ];
  tableLabels = ['Año', 'Periodo','Colegio' ,'Curso','Profesor','AsignaturaProfesor', ];
  ignoreFkRequirements: string[] = ['asignatura'];
  changeFnsArray: Function[] = [];
  patchFKsFromStorage = ['anno','periodo','colegio','curso'];

  fatherId=0;
  father='';

  evaluation$!: Observable<any>;
  matricula$!: Observable<any>;

  ponderacion = 0;
  // numMatriculas = 0;

  notasForm!: FormGroup;

  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  bgmodal!:string;
  modalbutton!:string;

  disable:any = {};
  currentDate:Date = new Date();

  // size screen

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = 0;

  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height + 155) + 'px';
  }

  constructor(private crud: CrudService,
      // route: ActivatedRoute,
      private selIdsService: SelectionIdsService,
      public dialog: MatDialog,
      private fkService: ForeignKeysService,
      private iconsService: IconsService,
      private fb: FormBuilder,
      private dt: GetdatetimeService,
      private getpermission: GetPermissionService,
      private toastr: ToastrService,

    ) {
      /*
      const getPermision = (msg: any) => { if(msg) {
        const year = this.currentDate.getFullYear();
        this.disable = (msg.esUtp && msg.anno.id == (year - 2020) && msg.colegio==1) ? false : true;
        }

      }
     */

/*
this.userInfo.personalInfo$.subscribe(info => info.inscripcionColegio.forEach((el:any) => {
    getPermision({esUtp: el.esUtp,anno: el.Anno, colegio: el.Colegio.id});
    getColor(info.personalInfo.usuario.Tema.nombre);
  }))
*/
/*
this.usuario$.subscribe(info => {
  if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
  else { getColor(localStorage.getItem('Color')) }
});
*/

      this.notasForm = new FormGroup({})

     }

  numcols = 2;

  getEvaluationData() {

       // this.getForeignKeys('evaluacion')
       let fkevaluacion = this.getForeignKeys('evaluacion')
       // fkevaluacion[3] = 1 // OJO
       this.evaluation$ = this.crud.getData('evaluacion', fkevaluacion )!
       this.evaluation$.pipe(
          tap(evaluacion => {
              this.ponderacion=0;
              evaluacion.forEach((e:any) => {
                this.numcols++;
                this.evaluationMap.set(e.id,e);

                this.sumaEvaluacionMap.set(e.id, 0);

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

  getSumEvaluacion(e: number) : any {
    let nota = this.sumaEvaluacionMap.get(e)/this.countNotas[e];
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

   sumaPromedioEvaluacion(evaluacionId: number, nota: number) {

    this.sumaEvaluacionMap.set(evaluacionId, this.sumaEvaluacionMap.get(evaluacionId) + nota);
   }

 colorNota(nota: number): string { return ( nota>=4.0) ? "blue" : "red"}

  getMatriculaData():  void {

      const sortByDate = (nota:any[]) : any => {
        nota.sort((x,y) => x.Evaluacion.fecha < y.Evaluacion.fecha ? -1 : 1);
        return nota;
      }

      const cleanVariables = () : void => {
        this.promedioMatriculaMap.clear();
        this.promedioEvaluacionMap.clear();

        this.matriculaNotaMap.clear();


      }

      const getNotasData = (matriculaId:number): Observable<any> => {

          let fknota:any = this.getForeignKeys('nota');
          fknota[6] = matriculaId

          let notas$ : Observable<any> = this.crud.getData('nota', fknota)!;

          notas$.pipe(map((data) => {
            data.sort((a:Evaluacion, b:Evaluacion) => {
                return a.fecha < b.fecha ? -1 : 1;
             });
            return data;
            }))

          notas$.pipe(
            tap(nota => {
              sortByDate(nota);
              nota.forEach((n:any) => {
              if (n.nota) {
                this.countNotas[n.Evaluacion.id]+=1;
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

            this.sumaPromedioMatricula(n.Matricula.id, n.nota * this.evaluationMap.get(n.Evaluacion.id).ponderacion/100 );
            this.sumaPromedioEvaluacion(n.Evaluacion.id, n.nota);
            let nota = (n.nota) ? n.nota.toString(): '0';  // OJO
            const indice = n.Evaluacion.id.toString() + '-' + n.Matricula.id.toString() + '-' + nota;
            this.notasIndiceMap.set(n.id, indice);

          }

            ))

        }

      }),




    )!



  }

  getCountNotas(evaluacionId: any):number {  return this.countNotas[+evaluacionId] }

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

            this.getEvaluationData();


        }

      }
    }

    getColor = (color:string | null) => {

      if (color == null) {  color = localStorage.getItem('Color')  }

      if (color=='azul') {
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
        this.url = this.photo.azul;
      }
      else if (color=='info') {
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.tablehead;
        this.bgmodal =  this.objcolors.info.bgmodal;
        this.modalbutton = this.objcolors.info.modalbutton;
        this.url = this.photo.azul;
      }
}


    ngOnInit(): void {

      this.usuario$.pipe(
        tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
        tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['ResumenNota'],info)}})

      ).subscribe()

      this.modalDataObj = modalDataObject['Evaluacion']

      this.selIdsService.msg.pipe(
        tap((message: (Notification)) =>  this.updateTable(message))
      )
      .subscribe() ;
    }


   /*
    getPromedioEvaluation(promedio: any ): number {
      let valor = promedio.value / this.getCountNotas(promedio.key);
      this.colorPromedioEvaluacion = (valor >=4) ? 'blue' : 'red'
      return valor;
    }
  */
    showdata(msg:any) {
      if (msg?.message) {this.toastr.success(msg?.message, 'Notas', {positionClass:'toast-top-right'})}
      else {this.toastr.error(msg?.error, 'Notas')}
    }

    editaValoresForm(eventoid: number) {

      Object.entries(this.notasForm.value).forEach(([key, value]) => {
        let keyvalue = key + '-' + value;
        if (value) { if (key.split('-')[1] == (eventoid).toString() ) {
          const [notaid, evaluacionid, matriculaid, nota] = keyvalue.split('-');
          const notasIndice = notaid + '-' + this.notasIndiceMap.get(+key.split('-')[0]);
          if (keyvalue !== notasIndice) {
            this.crud.putData({id: notaid, nota: nota},'nota').pipe(
              tap(() => this.updateTable()),
              tap(res => this.showdata(res))
            )
            .subscribe();
          }
        }}
      })

    }

    generaForm() {

      for (let notas of this.notasIndiceMap.entries()) {
        const data = notas[1].split('-')

        if (this.evaluationEdit.toString() == data[0])
        {
          let controlname = notas[0].toString() + '-' + data[0]+ '-' +data[1];
          const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
          // console.log('genera', controlname)
          this.notasForm.addControl( controlname ,  this.fb.control(data[2],
             [Validators.required,
              Validators.pattern(numericNumberReg),
              Validators.min(1),
              Validators.max(7)
            ]));

        }
      }
    }

    deleteForm() {

      for (let notas of this.notasIndiceMap.entries()) {
        const data = notas[1].split('-')

        if (this.evaluationEdit.toString() == data[0])
        {
          let controlname = notas[0].toString() + '-' + data[0]+ '-' +data[1];
          // console.log('delete',controlname)
          if (this.notasForm.contains(controlname) == true) {
            this.notasForm.removeControl( controlname );
          }
        }
      }

    }

    editaEvaluacion(evaluacionId: number,colegioId: number, fecha: Date) {

      this.isInVentana$ = this.dt.getDays(colegioId, 'nota', fecha)!

      this.edita = (this.edita) ? false : true;
      this.evaluationEdit = evaluacionId;
      if (this.edita== true) {
        this.generaForm();
      }
      else {
        this.editaValoresForm(evaluacionId);
        this.deleteForm();
      }
    }


  openDialog(reg: any = null): void {

    const getIdsNota = () : any => {

      let ids:any=[];

      ids.push(this.selIdsService.getId('anno'));
      ids.push(this.selIdsService.getId('periodo'));
      ids.push(this.selIdsService.getId('colegio'));
      ids.push(this.selIdsService.getId('curso'));
      ids.push(this.selIdsService.getId('profesor'));
      ids.push(this.selIdsService.getId('asignaturaprofesor'));

      return ids;

   }



    let matIds: any=[]

    if (!reg) {
          var reg:any = {};

          reg['id'] = 0;
          this.modalDataObj.tables.forEach((table: string) => reg[table] = {
            id: this.selIdsService.getId(table.toLocaleLowerCase()) || 0})
          this.modalDataObj.textFields.forEach((text: string) => reg[text] = null)
          this.modalDataObj.dateFields.forEach((date: string) => reg[date] = null)
       }

    reg['bgmodal'] = this.bgmodal;
    reg['modalbutton'] = this.modalbutton;


    let modaldata: any = this.modalDataObj;
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        registro: reg,
        ...modaldata,
        tabla: 'Evaluacion',
        generaRegistro: matIds!,
        generaForanea: getIdsNota()
      },
        height: this.modalDataObj.height, width: '600px',
    });

    dialogRef.afterClosed().pipe(

      tap(result => console.log('The dialog was closed', result)),
      // tap(() => this.updateTable()),
    )
    .subscribe();

  }

}

