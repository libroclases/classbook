import { Component } from '@angular/core';


@Component({
  selector: 'app-horas-inscritas',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./horas-incritas.component.css']
})
export class HorasInscritasComponent {

 // Tabla Principal

 mainTable: string = 'horario';
 tableTitle = 'Horas Inscritas';
 textFields = ['TotalHoras'];
 booleanFields = [];
 dateFields = [];
 // displayFKFields: CamelCase
 displayFKFields = ['Anno', 'Colegio', 'Curso'];
 redirectRoutes = []

 // Selectores

 selTables = ["anno", "colegio", "curso", "cursoprofesor"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = [];
 patchFKsFromStorage = ['asignatura', 'profesor'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {
   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
 }


}

