import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  // Tabla Principal

  mainTable: string = 'alumno';
  tableTitle = 'Alumnos';
  textFields = ['apellido1','apellido2','nombre', 'rut', 'direccion', 'celular'];
  dateFields = ['nacimiento'];
  // displayFKFields: CamelCase
  displayFKFields = ['Sexo', 'Region', 'Provincix','Comuna'];
  redirectRoutes = ['/matricula'];

  // Selectores

  selTables = ['sexo', 'region', 'provincix', 'comuna'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  // Route: from parent
  parentTable: string | null = null;
  parentId: number | null = null;

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {

    this.changeFnsArray = [ this.emptyFn, this.emptyFn ];

  }

}
