import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignatura',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit{
 // Tabla Principal

 mainTable: string = 'asignatura';
 tableTitle = 'Asignaturas';
 textFields = ['nombre'];
 dateFields = [];
 booleanFields = [];
 // displayFKFields: CamelCase
 displayFKFields = ['TipoColegio'];
 redirectRoutes = ['/curso', '/profesor']

 // Selectores

 selTables = ["tipocolegio"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = [];
 patchFKsFromStorage = [];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn];

}
}
