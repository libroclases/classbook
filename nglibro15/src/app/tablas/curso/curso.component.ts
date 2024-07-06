import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

// Tabla Principal

mainTable: string = 'curso';
tableTitle = 'Cursos';
textFields = ['nombre', 'profesor_jefe'];
booleanFields = [];
dateFields = [];
// displayFKFields: CamelCase
displayFKFields = ['Colegio', 'Anno'];
redirectRoutes!: string[];

// Selectores

selTables = ['colegio', 'anno'];
changeFnsArray: Function[] = [];
ignoreFkRequirements: string[] = [];
patchFKsFromStorage = ['colegio', 'anno'];

constructor( ) { }

emptyFn = (e: any) => { };

ngOnInit(): void {

  this.changeFnsArray = [this.emptyFn, this.emptyFn];

}


}
