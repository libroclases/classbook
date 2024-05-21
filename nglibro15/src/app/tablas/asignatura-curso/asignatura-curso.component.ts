import { Component } from '@angular/core';

@Component({
  selector: 'app-asignatura-curso',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./asignatura-curso.component.css']
})
export class AsignaturaCursoComponent {

// Tabla Principal

 mainTable: string = 'asignaturacurso';
 tableTitle = 'Asignatura Curso';
 textFields = [];
 booleanFields = [];
 dateFields = [];
 // displayFKFields: CamelCase
 displayFKFields = ['Anno','Colegio','Curso', 'Asignatura'];
 redirectRoutes = [];

 // Selectores

 selTables = ['anno','colegio', 'curso', 'asignatura'];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = [];
 patchFKsFromStorage = ['anno','colegio','curso'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {
   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
 }

}
