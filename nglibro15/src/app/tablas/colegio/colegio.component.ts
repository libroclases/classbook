import { Component, OnInit } from '@angular/core';
import { MaintainerComponent } from '../../shared/componentes/maintainer/maintainer.component';

@Component({
  selector: 'app-colegio',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./colegio.component.css']
})
export class ColegioComponent implements OnInit {

  // Tabla Principal

  mainTable: string = 'colegio';
  tableTitle = 'Colegios';
  textFields = ['nombre', 'telefono', 'direccion', 'rut', 'email'];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['Region', 'Provincix', 'Comuna', 'TipoColegio'];
  redirectRoutes = ['/curso', '/profesor']

  // Selectores

  selTables = ['region', 'provincix', 'comuna', 'tipocolegio'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {
    this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
  }

}
