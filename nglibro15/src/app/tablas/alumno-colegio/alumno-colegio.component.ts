import { Component } from '@angular/core';

@Component({
  selector: 'app-alumno-colegio',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./alumno-colegio.component.css']
})
export class AlumnoColegioComponent {
  // Tabla Principal

  mainTable: string = 'alumnocolegio';
  tableTitle = 'Alumno Colegio';
  textFields = [];
  booleanFields = [];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Anno','Colegio','Alumno'];
  patchFksFromStorage = [];
  redirectRoutes = [];

  // Selectores

  selTables = ['anno','colegio','alumno'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = ['anno','colegio'];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }

}
