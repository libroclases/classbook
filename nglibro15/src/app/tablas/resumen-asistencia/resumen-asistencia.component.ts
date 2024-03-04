import { Component, HostListener } from '@angular/core';
import { ColorService } from '../../shared/services/color-service/color.service';
import { CrudService } from '../../shared/services/crud/crud.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../shared/services/subscriptions-manager/subscriptions-manager.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-resumen-asistencia',
  templateUrl: './resumen-asistencia.component.html',
  styleUrls: ['./resumen-asistencia.component.css']
})
export class ResumenAsistenciaComponent {

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }


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

  // ----
  // paginacion

  selTables: string[] = ['colegio', 'anno', 'mes'];
  changeFnsArray!: Function[];
  patchFksFromStorage = ['colegio', 'anno', 'mes'];

  constructor(private crud: CrudService,
    cs: ColorService,
    private subsManagerService: SubscriptionsManagerService,
    private selIdsService: SelectionIdsService) { 

      cs.color_msg.subscribe(color =>  {

        //  TODO  Asignar dinamicamente los indices
  
        if (color=='azul') { 
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.pagination;
        }
        if (color=='verde') { 
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.pagination;
        }
        if (color=='naranjo') { 
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.pagination; 
        }      
      })
  

    }

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFunction, this.emptyFunction,
      this.emptyFunction];
  }

  emptyFunction(){ }

}
