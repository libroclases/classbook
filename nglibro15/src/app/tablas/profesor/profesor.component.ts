import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesor',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  // Tabla Principal

  mainTable: string = 'profesor';
  tableTitle = 'Profesor';
  textFields = ['nombre', 'apellido1','apellido2','rut','celular','direccion'];
  booleanFields = [];
  dateFields = ['nacimiento'];
  // displayFKFields: CamelCase
  displayFKFields = ['Sexo','Region','Provincix','Comuna'];
  redirectRoutes = ['/curso', '/profesor'];

  // Selectores

  selTables = ["sexo", "region", "provincix", "comuna"];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];
  middleTables: any = {};

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {

    this.changeFnsArray = [this.emptyFn, this.emptyFn];

  }

}
