import { Component, HostListener } from '@angular/core';
// import { CrudService } from '../../shared/services/crud/crud.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { environment } from '../../../environments/environment';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { Observable } from 'rxjs';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-resumen-asistencia',
  templateUrl: './resumen-asistencia.component.html',
  styleUrls: ['./resumen-asistencia.component.css']
})
export class ResumenAsistenciaComponent {

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  url!:string;
  photo = environment.photo;
  position = "center";
  size = "cover";

  title = 'Asistencia: Resumen mensual';
  rowLabel = 'Curso';
  totalLabel = 'Asistencia total';
  table = 'asistencia';
  endpoint_suffix = 'totalesMesColegio';
  endpoint_foreign_keys = ['colegio', 'anno', 'mes'];

  rowCountTitle = '# Alumnos';
  rowCountTable = 'matricula';
  rowCountEndpointSuffix = 'countCursos';
  rowCountForeignKeys = ['colegio', 'anno'];

  updateIfSelected = ['colegio', 'anno', 'mes'];
  yearTable = 'anno';
  monthTable = 'mes';
  holidaysTable = 'feriado';

  //   colores

  objcolors = environment.colors;
  
  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  disable = true;
  currentDate:Date = new Date();


  // ----
  // paginacion

  selTables: string[] = ['colegio', 'anno', 'mes'];
  changeFnsArray!: Function[];
  patchFksFromStorage = ['colegio', 'anno', 'mes'];

  constructor(
    private subsManagerService: SubscriptionsManagerService,
    private selIdsService: SelectionIdsService) { 

      const getPermision = (msg: any) => { if(msg) {
        const year = this.currentDate.getFullYear();
        this.disable = (msg.esUtp && msg.anno.id == (year - 2020) && msg.colegio==1) ? false : true;
        } 
  
      }
  
     const getColor = (color:string | null) => {

      if (color=='azul' || !color) { 
        this.bodybgcolor = this.objcolors.azul.bodybgcolor;
        this.pagination = this.objcolors.azul.pagination;
        this.tablehead = this.objcolors.azul.pagination;
        this.url = this.photo.azul;
      }
      if (color=='verde') { 
        this.bodybgcolor = this.objcolors.verde.bodybgcolor;
        this.pagination = this.objcolors.verde.pagination;
        this.tablehead = this.objcolors.verde.pagination;
        this.url = this.photo.verde;
      }
      if (color=='info') { 
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.pagination;
        this.url = this.photo.info; 
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

  }

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFunction, this.emptyFunction,
      this.emptyFunction];
  }

  emptyFunction(){ }

}
