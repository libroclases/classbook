import { Component } from '@angular/core';

@Component({
  selector: 'app-matricula',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent {

 // Tabla Principal

 mainTable: string = 'matricula';
 tableTitle = 'Matricula';
 textFields = ['nombre', 'procedencia'];
 booleanFields = [];
 dateFields = ['incorporacion'];
 // displayFKFields: CamelCase
 displayFKFields = ['Alumno', 'Apoderado', 'Vinculo', 'Anno', 'Colegio', 'Curso'];
 redirectRoutes = ['/curso'];

 // Selectores

 selTables = ['alumno','apoderado','anno', 'colegio', 'curso'];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = ['colegio'];
 patchFKsFromStorage = ['anno', 'colegio','curso'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn]
 }

}
