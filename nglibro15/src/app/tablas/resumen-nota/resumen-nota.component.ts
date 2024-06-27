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
export class ResumenNotaComponent implements OnInit {

  // idsMap!: Map<string, number>;
  // mainTableForeignKeys!: string[];
  // fkIds: any = [];

  // isInVentana$!: Observable<any>;

  mainTable: string = 'resumennota';

  // valorPromedio: any = [];

  disable:any = {};
  title:any = {}
  // currentDate: Date = new Date();

  // tablaId = 5;

  // currPage = 0;
  // countNotas: any = {};
  // sumaAsignaturaMap: any = new Map<number, number>();

  matriculaMap: any = new Map<number,any[]>();

  ponderacionMap: any = new Map<number, number>();
  notasIndiceMap: any = new Map<string, string>();

  asignaturaEdit = 0;  // marca columna a editar
  edita = false;
  showtable = true;
  promedio: any = {};

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

  selTables = ["anno", "periodo", "colegio", "curso"];
  tableLabels = ['Año', 'Periodo', 'Colegio', 'Curso'];
  ignoreFkRequirements: string[] = ['asignatura'];
  changeFnsArray: Function[] = [];
  patchFKsFromStorage = ['anno', 'periodo', 'colegio'];
  middleTables: any = {};

  // fatherId = 0;
  // father = '';

  asignatura$!: Observable<any>;
  matricula$!: Observable<any>;
  // resumennota$!: Observable<any>;

 //  ponderacion = 0;
  // numMatriculas = 0;
  url!: string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";
  // notasForm!: FormGroup;

  //   colores

  // numColumns = 8

  objcolors = environment.colors;

  bodybgcolor!: string;
  pagination!: string;
  tablehead!: string;

  bgmodal!: string;
  modalbutton!: string;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  // size screen

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;


  innerHeight = window.innerHeight

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

  ) {



  }

  // numcols = 0;
  // numrows = 0;




  getAsignaturaData() {
    const fks = [
      this.selIdsService.getId('anno'),
      this.selIdsService.getId('colegio'),
      this.selIdsService.getId('curso'),
      0,
      0
    ]
    let i=0;
    this.asignatura$ = this.crud.getData('cursoprofesor', fks)?.pipe(
      tap(asig => asig.forEach((a:any) => { this.title[i] = a.Asignatura.nombre; i++;}))
    )!; console.log('title:', this.title)
    this.getMatriculaData();
    this.getResumenNotaData();
  }


  getMatriculaData(): void {

    let ides = [
      this.selIdsService.getId('colegio'),
      this.selIdsService.getId('curso'),
      this.selIdsService.getId('anno')
    ]

    this.matricula$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres', ides);

  }

  getcolor(n:number) : string {
    if (n >= 3.95) return 'blue';
    else { return 'red'}

  }

  getpromedioMat(id:number, a:any) {

    this.promedio[id] = a.reduce((a:number, b:number) => a + b, 0) / a.length;

  }

  getResumenNotaData(): void {

    let asignaturaMap: any = new Map<number,any[]>();
    let tmp:any=[];
    let mat_ant=0;
    let cont = 0;

    let ides = [
      this.selIdsService.getId('anno'),
      this.selIdsService.getId('periodo'),
      this.selIdsService.getId('colegio'),
      this.selIdsService.getId('curso'),0,0
    ]

    this.crud.getDataCustom('resumennota', 'poblateResumenNota', ides).pipe(
      tap(promedios => promedios.forEach((promedio: any) => {
        let mat = promedio[0];
        let asig = promedio[1];
        let prom = promedio[2];
        // if (mat == 475) console.log(cont , mat,asig, prom);

        if (mat_ant != mat) {
          mat_ant = mat;
          tmp=[];

        }
        tmp.push(prom);
        asignaturaMap.set(asig, tmp);
        this.getpromedioMat(mat, asignaturaMap.get(asig, tmp));
        this.matriculaMap.set(mat, asignaturaMap.get(asig, tmp));
        cont++;
      }))
    ).subscribe();

  }

  getBiClass(route: string) {
    return this.iconsService.getBiClass(route);
  }

  getForeignKeys(table: string) {
    let fKeys = [];
    for (let t of this.fkService.getFKeys(table)!) {
      fKeys.push(this.selIdsService.getId(t));
    }
    return fKeys;
  }


  updateTable(notification: (Notification | null) = null) {


    if (!notification || notification.message == "updated")  {
      if (this.selIdsService.selectEnableKeys(['anno', 'periodo', 'colegio', 'curso'])) {
        this.getAsignaturaData();
      }

    }
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

  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['Nota'], info) } })

    ).subscribe()

    this.modalDataObj = modalDataObject['Asignatura']

    this.selIdsService.msg.pipe(
      tap((message: (Notification)) => this.updateTable(message))
    )
      .subscribe();
  }


}
