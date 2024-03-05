import { Component } from '@angular/core';

@Component({
  selector: 'app-estado-alumno',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./estado-alumno.component.css']
})
export class EstadoAlumnoComponent {

  // Tabla Principal

  mainTable: string = 'estadoalumno';
  tableTitle = 'EstadoAlumno';
  textFields = [];
  dateFields = ['fecha'];
  // displayFKFields: CamelCase
  displayFKFields = ['Alumno', 'Matricula', 'TipoEstado'];
  redirectRoutes = [];

  // Selectores

  selTables = ['alumno', 'matricula', 'tipoestado'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }



}
