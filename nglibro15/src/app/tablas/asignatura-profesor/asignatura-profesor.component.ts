import { Component } from '@angular/core';


@Component({
  selector: 'app-asignatura-profesor',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./asignatura-profesor.component.css']
})
export class AsignaturaProfesorComponent {

  // Tabla Principal

  mainTable: string = 'asignaturaprofesor';
  tableTitle = 'Inscripción Asignatura';
  textFields = [];
  booleanFields = [];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Profesor', 'Asignatura'];
  redirectRoutes = [];

  // Selectores

  selTables = ['profesor', 'asignatura'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = ['profesor'];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }

}
