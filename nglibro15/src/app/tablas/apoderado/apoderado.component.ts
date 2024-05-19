import { Component } from '@angular/core';

@Component({
  selector: 'app-apoderado',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./apoderado.component.css']
})
export class ApoderadoComponent {

 // Tabla Principal

 mainTable: string = 'apoderado';
 tableTitle = 'Apoderados';
 textFields = ['apellido1','apellido2','nombre', 'rut', 'direccion', 'celular'];
 dateFields = ['nacimiento'];
 booleanFields = [];
 // displayFKFields: CamelCase
 displayFKFields = ['NivelEducacional',  'Region', 'Provincix', 'Comuna', 'Sexo'];
 redirectRoutes = ['/matricula'];

 // Selectores

 selTables = ["niveleducacional",  "region", "provincix", "comuna", "sexo"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = [];
 patchFKsFromStorage = [];

 // Route: from parent
 parentTable: string | null = null;
 parentId: number | null = null;

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn];

 }

}
