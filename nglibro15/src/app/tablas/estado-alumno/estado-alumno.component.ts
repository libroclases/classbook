import { Component } from '@angular/core';

@Component({
  selector: 'app-estado-alumno',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./estado-alumno.component.css']
})
export class EstadoAlumnoComponent {

  // Tabla Principal

  mainTable: string = 'estadoalumno';
  tableTitle = 'EstadoAlumno';
  textFields = [];
  dateFields = ['fecha'];
  // displayFKFields: CamelCase
  displayFKFields = ['Matricula','Alumno'];
  redirectRoutes = [];

  // Selectores

  selTables = ['matricula','alumno'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = ['anno','colegio','curso'];
  patchFKsFromStorage = [];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }



}
