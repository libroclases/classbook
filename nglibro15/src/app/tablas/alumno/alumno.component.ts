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
  booleanFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Region', 'Provincix','Comuna','Colegio','Sexo'];
  redirectRoutes = ['/matricula'];

  // Selectores

  selTables = ['region', 'provincix', 'comuna','colegio','sexo'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = ['tipocolegio','provincix', 'comuna'];
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
