import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {

// Tabla Principal

mainTable: string = 'tabla';
tableTitle = 'Tablas';
textFields = ['nombre'];
booleanFields = [];
dateFields = [];
// displayFKFields: CamelCase
displayFKFields = [];
redirectRoutes!: string[];

// Selectores

selTables = [];
changeFnsArray: Function[] = [];
ignoreFkRequirements: string[] = [];
patchFKsFromStorage = [];

constructor( ) { }

emptyFn = (e: any) => { };

ngOnInit(): void {

  this.changeFnsArray = [this.emptyFn, this.emptyFn];

}


}
