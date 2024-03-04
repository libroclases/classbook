import { Component, HostListener, OnInit } from '@angular/core';
import { ColorService } from '../../shared/services/color-service/color.service';
import { environment, attributesLabels, fKeysByTable, tableLabels, lowerUpperTables } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Notification } from '../../interfaces/generic.interface';
import { IconsService } from 'src/app/shared/services/icons/icons.service';

@Component({
  selector: 'app-ficha-alumno',
  templateUrl: './ficha-alumno.component.html',
  styleUrls: ['./ficha-alumno.component.css']
})
export class FichaAlumnoComponent implements OnInit{

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  objcolors = environment.colors;

  alumnos:any = attributesLabels.alumno;
  apoderados:any = attributesLabels.apoderado;
  matriculas:any = attributesLabels.matricula;

  matricula:any;
  alumno:any;
  apoderado:any;

  alumnofk:any = fKeysByTable['alumno'];
  apoderadofk:any = fKeysByTable['apoderado'];
  matriculafk:any = fKeysByTable['matricula'];

  labels:any = tableLabels;
  lowerUpper:any = lowerUpperTables

  lista_curso_nombres$!: Observable<any>
  // matricula!:any;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

// Selectores

selTables = [  "colegio", "curso",  "anno" ];
tableLabels = ['Colegio' ,'Curso', 'Año' ];
ignoreFkRequirements: string[] = ['asignatura'];
changeFnsArray: Function[] = [];
patchFKsFromStorage = ['colegio', 'anno'];

setAny(valor:any): any { return valor }

constructor(
   private cs : ColorService,
   private router: ActivatedRoute,
   private selIdsService: SelectionIdsService,
   private crud: CrudService,
   private iconsService: IconsService
  ) {

  router.params.subscribe(params => console.log(JSON.stringify(params)))
  
  cs.color_msg.pipe(
    tap(
      (color:any) =>  {


        if (color=='azul') {
          this.bodybgcolor = this.objcolors.azul.bodybgcolor;
          this.pagination = this.objcolors.azul.pagination;
          this.tablehead = this.objcolors.azul.tablehead;
        }
        if (color=='verde') {
          this.bodybgcolor = this.objcolors.verde.bodybgcolor;
          this.pagination = this.objcolors.verde.pagination;
          this.tablehead = this.objcolors.verde.tablehead;
    
        }
        if (color=='naranjo') {
          this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
          this.pagination = this.objcolors.naranjo.pagination;
          this.tablehead = this.objcolors.naranjo.tablehead;
        }
        
      }
    )
  )
  .subscribe()


}

actualiza_ficha(id: number) { 
  this.crud.getDataPk('matricula',id)
  .subscribe(mat => { 
    this.matricula = mat;
    this.crud.getDataPk('alumno', mat.alumnoId)
    .subscribe(alumno => this.alumno = alumno);
    this.crud.getDataPk('apoderado', mat.apoderadoId)
    .subscribe(apoderado => this.apoderado = apoderado); 
 
  }) 
}

getmatricula(key:any) : any { if (this.matricula) return this.matricula[key] }
getalumno(key:any) : any { if (this.alumno) return this.alumno[key] }
getapoderado(key:any) : any { if (this.apoderado) return this.apoderado[key] }

getBiClass(route: string) {
  // permite acceder a iconsService.getBiClass desde html
  return this.iconsService.getBiClass(route);
}

getIconLabel(route: string) {
  // permite acceder a iconsService.getLabel desde html
  return this.iconsService.getLabel(route);
}

updateTable(notification: (Notification | null) = null) {

  let ides = [
    this.selIdsService.getId('colegio'),
    this.selIdsService.getId('curso'),
    this.selIdsService.getId('anno')
  ]

  console.log(ides);

  if ( !notification || notification.message == "updated" ) {
    if (ides[0] * ides[1] * ides[2]  > 0) {
      this.lista_curso_nombres$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres', ides )      
    }

  }
}


  ngOnInit(): void {
 
    
    this.selIdsService.msg.pipe(
      tap((message: (Notification)) =>  this.updateTable(message))
    )
    .subscribe() ;
  }


}


