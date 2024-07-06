import { Component } from '@angular/core';

@Component({
  selector: 'app-curso-profesor',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./curso-profesor.component.css']
})
export class CursoProfesorComponent {

  // Tabla Principal

  mainTable: string = 'cursoprofesor';
  tableTitle = 'Inscripción Curso';
  textFields = [];
  booleanFields = [];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Anno', 'Colegio', 'Curso','Asignatura','Profesor'];
  redirectRoutes = ['/curso', '/profesor']

  // Selectores

  selTables = ['anno', 'colegio', 'curso','asignatura','profesor'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = ['anno','colegio','curso'];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }


}
