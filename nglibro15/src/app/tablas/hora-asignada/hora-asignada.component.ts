import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-horaasignada',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./hora-asignada.component.css']
})
export class HoraAsignadaComponent implements OnInit {

  mainTable: string = 'horaasignada';
  tableTitle = 'Horas Asignadas';
  textFields = ['numero', 'horario'];
  booleanFields = [];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Colegio'];
  redirectRoutes = []

  // Selectores

  selTables = ['colegio'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = ['colegio'];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }

}
