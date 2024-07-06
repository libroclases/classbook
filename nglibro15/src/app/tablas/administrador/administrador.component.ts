import { Component } from '@angular/core';

@Component({
  selector: 'app-utp',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  // Tabla Principal

  mainTable: string = 'administrador';
  tableTitle = 'Administrador';
  textFields = ['apellido1','apellido2','nombre','rut','celular','direccion'];
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

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {

    this.changeFnsArray = [this.emptyFn, this.emptyFn];

  }

}
