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
 textFields = ['nombre'];
 dateFields = [];
 // displayFKFields: CamelCase
 displayFKFields = ['Curso', 'Asignatura'];
 redirectRoutes = [];

 // Selectores

 selTables = ['curso', 'asignatura'];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = [];
 patchFKsFromStorage = ['curso'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {
   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
 }

}
