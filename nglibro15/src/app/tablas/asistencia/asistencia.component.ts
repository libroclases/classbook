import { Component, HostListener, OnInit } from '@angular/core';
import { CrudService } from '../../shared/services/crud/crud.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { environment, Permission, lowerUpperTables } from '../../../environments/environment';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { Observable, tap } from 'rxjs';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';

const DIAS_POR_PAGINA = 31;
const minDiasPorPagina = 7;

function dobuleZeroPad(num: number) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
})
export class AsistenciaComponent implements OnInit {
  objcolors = environment.colors;

  pagination!: string;
  bodybgcolor!: string;

  disable = true;
  currentDate:Date = new Date();

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  url!:string;
  photo = environment.photo;
  position = "center";
  size = "cover";

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  table = 'asistencia';
  title = 'Asistencia';
  checkField = 'presente';
  updateIfSelected = ['colegio', 'anno', 'curso', 'mes'];
  rowTable = 'alumno';
  yearTable = 'anno';
  monthTable = 'mes';
  holidaysTable = 'feriado';
  dayNumberField = 'dia';
  columnField = 'dia';
  // ----
  // paginacion
  diasPorPagina = Math.max(DIAS_POR_PAGINA, minDiasPorPagina);

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  selTables: string[] = ['colegio', 'anno', 'curso', 'mes'];
  changeFnsArray!: Function[];
  patchFksFromStorage = ['colegio', 'anno', 'curso'];

  constructor(
    private crud: CrudService,
    // private userInfo: UserInfoService,
    private subsManagerService: SubscriptionsManagerService,
    private selIdsService: SelectionIdsService,
    private getpermission: GetPermissionService
  ) {


}

getColor = (color:string | null) => {

  if (color == null) {  color = localStorage.getItem('Color')  }

  if (color == 'primary') {
    this.bodybgcolor = this.objcolors.primary.bodybgcolor;
    this.pagination = this.objcolors.primary.pagination;
    this.url = this.photo.primary;

  }
  if (color == 'success') {
    this.bodybgcolor = this.objcolors.success.bodybgcolor;
    this.pagination = this.objcolors.success.pagination;
    this.url = this.photo.success;

  }
  if (color == 'info') {
    this.bodybgcolor = this.objcolors.info.bodybgcolor;
    this.pagination = this.objcolors.info.pagination;
    this.url = this.photo.info;

  }
}


  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['Asistencia'],info)}})

    ).subscribe()


    this.changeFnsArray = [
      this.emptyFunction,
      this.emptyFunction,
      this.emptyFunction,
      this.emptyFunction,
    ];
  }

  emptyFunction() {}

  populateAsistenciaMes(callback: Function) {
    const colegioId = this.selIdsService.getId('colegio');
    const cursoId = this.selIdsService.getId('curso');
    const anno = parseInt(this.selIdsService.getText(this.yearTable));
    const annoId = this.selIdsService.getId(this.yearTable);
    const mesId = this.selIdsService.getId(this.monthTable);
    const subsPopulateMes = this.crud
      .createDataCustom({ anno: anno }, 'asistencia', 'populateMes', [
        colegioId,
        cursoId,
        annoId,
        mesId,
      ])
      .subscribe(() => callback());
    this.subsManagerService.registerSubscription(
      subsPopulateMes,
      `${colegioId}|${cursoId}|${annoId}|${mesId}|populateMes`
    );
  }
}
