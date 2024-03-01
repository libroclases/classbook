import { Component, OnInit } from '@angular/core';
import { MaintainerComponent } from '../../shared/componentes/maintainer/maintainer.component';

@Component({
  selector: 'app-horaasignada',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./hora-asignada.component.css']
})
export class HoraAsignadaComponent implements OnInit {

  mainTable: string = 'horaasignada';
  tableTitle = 'Horas Asignadas';
  textFields = ['numero', 'horario'];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Colegio'];
  redirectRoutes = []

  // Selectores

  selTables = ['colegio'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }

}
