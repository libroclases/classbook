import { Component } from '@angular/core';

@Component({
  selector: 'app-ventana',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./ventana.component.css']
})
export class VentanaComponent {
// Tabla Principal

mainTable: string = 'ventana';
tableTitle = 'Ventana Modificaciones';
textFields = ['dias'];
booleanFields = [];
dateFields = [];
// displayFKFields: CamelCase
displayFKFields = ["Colegio","Tabla"];
redirectRoutes!: string[];

// Selectores

selTables = ["colegio","tabla"];
changeFnsArray: Function[] = [];
ignoreFkRequirements: string[] = [];
patchFKsFromStorage = [];

constructor( ) { }

emptyFn = (e: any) => { };

ngOnInit(): void {

  this.changeFnsArray = [this.emptyFn, this.emptyFn];

}

}
