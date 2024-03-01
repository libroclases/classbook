import { Component } from '@angular/core';

@Component({
  selector: 'app-utp',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./utp.component.css']
})
export class UtpComponent {
  // Tabla Principal

  mainTable: string = 'utp';
  tableTitle = 'UTP';
  textFields = ['apellido1','apellido2','nombre','rut','celular','direccion'];
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
