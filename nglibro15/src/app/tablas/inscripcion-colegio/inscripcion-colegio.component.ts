import { Component } from '@angular/core';

@Component({
  selector: 'app-inscripcion-colegio',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./inscripcion-colegio.component.css']
})
export class InscripcionColegioComponent {

  // Tabla Principal

  mainTable: string = 'inscripcioncolegio';
  tableTitle = 'Colegio Profesor';
  textFields = [];
  booleanFields = ['esPie','esUtp'];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Anno','Colegio', 'Profesor'];
  redirectRoutes = ['/curso', '/profesor']

  // Selectores

  selTables = ['anno', 'colegio','profesor'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }


}
