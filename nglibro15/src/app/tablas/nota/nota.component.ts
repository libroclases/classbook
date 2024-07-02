import { Component, HostListener, OnInit } from '@angular/core';
import { CrudService } from '../../shared/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, map, tap } from 'rxjs';
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

  evaluacionMap = new Map<number, any>();
  matriculasNotasMap = new Map<number, any>();
  matriculasPromediosMap = new Map<number, any>();

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

  selTables = [  "anno", "periodo", "colegio", "curso", "cursoprofesor"];

  ignoreFkRequirements: string[] = ['asignatura','profesor'];
  changeFnsArray: Function[] = [];
  patchFKsFromStorage = ['anno','periodo','curso','colegio'];
  customEndpoints = null;
  middleTables = {}; // 'cursoprofesor': ['anno','colegio','curso']

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

  evaluacion$: Observable<any> | undefined;

  title:any = {}

  notas$!: Observable<any>;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height + 155) + 'px';
  }

  constructor(private crud: CrudService,
    private selIdsService: SelectionIdsService,
    private fkService: ForeignKeysService,
    private iconsService: IconsService,
    private getpermission: GetPermissionService,

    ) {

      this.notasForm = new FormGroup({})

     }

     getColor = (color: string | null) => {

      if (color == 'primary' || !color) {
        this.bodybgcolor = this.objcolors.primary.bodybgcolor;
        this.pagination = this.objcolors.primary.pagination;
        this.tablehead = this.objcolors.primary.tablehead;
        this.bgmodal = this.objcolors.primary.bgmodal;
        this.modalbutton = this.objcolors.primary.modalbutton;
        this.url = this.photo.primary;
      }
      else if (color == 'success') {
        this.bodybgcolor = this.objcolors.success.bodybgcolor;
        this.pagination = this.objcolors.success.pagination;
        this.tablehead = this.objcolors.success.tablehead;
        this.bgmodal = this.objcolors.success.bgmodal;
        this.modalbutton = this.objcolors.success.modalbutton;
        this.url = this.photo.success;
      }
      else if (color == 'info') {
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.tablehead;
        this.bgmodal = this.objcolors.info.bgmodal;
        this.modalbutton = this.objcolors.info.modalbutton;
        this.url = this.photo.info;
      }
    }

    getMatriculaData(): void {

      let ides = [
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        this.selIdsService.getId('anno')
      ]

      this.matricula$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres', ides);

    }

    getEvaluacionData() {
      const fks = [
        this.selIdsService.getId('anno'),
        this.selIdsService.getId('periodo'),
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        this.selIdsService.getId('cursoprofesor'),
        0,
      ]
      let i=0;
      this.evaluacion$ = this.crud.getData('evaluacion', fks)?.pipe(
        tap(eva => eva.forEach((e: Evaluacion) => { this.evaluacionMap.set(e.id, e) }))
      )!;
      this.getMatriculaData();
      this.getNotaData();
    }

    getNotaData(): void {


      let tmp:any=[];
      let mat_ant=0;
      let cont = 0;

      let ides = [
        this.selIdsService.getId('anno'),
        this.selIdsService.getId('periodo'),
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        this.selIdsService.getId('cursoprofesor')
      ]

      this.crud.getDataCustom('nota','poblateNota', ides)?.pipe(
        tap(notas => notas?.forEach((nota: any) => {

          this.matriculasNotasMap.set(nota[0], nota[1]);
          this.matriculasPromediosMap.set(nota[0], nota[2]);
          console.log(nota[0],nota[1],nota[2])

        }

      ))).subscribe();

    }


    updateTable(notification: (Notification | null) = null) {


      if (!notification || notification.message == "updated")  {
        if (this.selIdsService.selectEnableKeys(['anno', 'periodo', 'colegio', 'curso','cursoprofesor'])) {
          this.getEvaluacionData();
        }

      }
    }

  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['Nota'], info) } })

    ).subscribe()



    this.selIdsService.msg.pipe(
      tap((message: (Notification)) => this.updateTable(message))
    )
      .subscribe();
  }


}

