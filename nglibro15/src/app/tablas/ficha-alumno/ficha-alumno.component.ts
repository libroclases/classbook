import { Component, HostListener, OnInit } from '@angular/core';

import { environment, attributesLabels, fKeysByTable, tableLabels, lowerUpperTables, Permission } from 'src/environments/environment';
// import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SelectionIdsService } from 'src/app/shared/services/selection-ids/selection-ids.service';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Notification } from '../../interfaces/generic.interface';
import { IconsService } from 'src/app/shared/services/icons/icons.service';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-ficha-alumno',
  templateUrl: './ficha-alumno.component.html',
  styleUrls: ['./ficha-alumno.component.css']
})
export class FichaAlumnoComponent implements OnInit{

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;

  disable = true;
  currentDate:Date = new Date();

  objcolors = environment.colors;

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

  alumnos:any = attributesLabels.alumno;
  apoderados:any = attributesLabels.apoderado;
  matriculas:any = attributesLabels.matricula;
  anotaciones:any = attributesLabels.anotacion;

  matricula:any;
  alumno:any;
  apoderado:any;
  anotacion:any;

  alumnofk:any = fKeysByTable['alumno'];
  apoderadofk:any = fKeysByTable['apoderado'];
  matriculafk:any = fKeysByTable['matricula'];
  anotacionfk:any = fKeysByTable['anotacion'];

  labels:any = tableLabels;
  lowerUpper:any = lowerUpperTables

  lista_curso_nombres$!: Observable<any>


  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

// Selectores

selTables = [  "colegio", "anno",  "curso" ];
tableLabels = ['Colegio' ,'Año', 'Curso' ];
ignoreFkRequirements: string[] = ['asignatura'];
changeFnsArray: Function[] = [];
patchFKsFromStorage = ['colegio', 'anno','curso'];

setAny(valor:any): any { return valor }

@Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;


constructor(
   private userInfo: UserInfoService,
   private selIdsService: SelectionIdsService,
   private crud: CrudService,
   private iconsService: IconsService,
   private getpermission: GetPermissionService
  ) {
    }





actualiza_ficha(id: number) {
  this.crud.getDataPk('matricula',id)
  .subscribe(mat => {
    this.matricula = mat;
    this.crud.getDataPk('alumno', mat.alumnoId)
    .subscribe(alumno => this.alumno = alumno);
    this.crud.getDataPk('apoderado', mat.apoderadoId)
    .subscribe(apoderado => this.apoderado = apoderado);
    this.crud.getData('anotacion', [this.matricula.id,0,this.selIdsService.getId('anno'),
    this.selIdsService.getId('colegio'),
    this.selIdsService.getId('curso')])?.subscribe((anotacion:any) => this.anotacion = anotacion);


  })
}

getmatricula(key:any) : any { if (this.matricula) return this.matricula[key] }
getalumno(key:any) : any { if (this.alumno) return this.alumno[key] }
getapoderado(key:any) : any { if (this.apoderado) return this.apoderado[key] }
// getanotacion(key:any) : any { if (this.anotacion) return this.anotacion[key] }

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

  if ( !notification || notification.message == "updated" ) {
    if (ides[0] * ides[1] * ides[2]  > 0) {
      this.lista_curso_nombres$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres', ides )

     //  this.lista_curso_nombres$.subscribe(lista => console.log(lista))
    }

  }
}

getColor(color:string) {

  if (color=='azul') {
    this.bodybgcolor = this.objcolors.azul.bodybgcolor;
    this.pagination = this.objcolors.azul.pagination;
    this.tablehead = this.objcolors.azul.tablehead;
    this.url = this.photo.azul;
  }
  if (color=='verde') {
    this.bodybgcolor = this.objcolors.verde.bodybgcolor;
    this.pagination = this.objcolors.verde.pagination;
    this.tablehead = this.objcolors.verde.tablehead;
    this.url = this.photo.verde;

  }
  if (color=='info') {
    this.bodybgcolor = this.objcolors.info.bodybgcolor;
    this.pagination = this.objcolors.info.pagination;
    this.tablehead = this.objcolors.info.tablehead;
    this.url = this.photo.info;
  }
}

  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['FichaAlumno'],info)}})

    ).subscribe()

    this.selIdsService.msg.pipe(
      tap((message: (Notification)) =>  this.updateTable(message))
    )
    .subscribe() ;
  }


}


