import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistente-colegio',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./asistente-colegio.component.css']
})
export class AsistenteColegioComponent implements OnInit {

 // Tabla Principal

 mainTable: string = 'asistentecolegio';
 tableTitle = 'Profesionales no-docentes';
 textFields = ['apellido1','apellido2','nombre', 'rut', 'direccion','celular'];
 booleanFields = [];
 dateFields = ['nacimiento'];
 // displayFKFields: CamelCase
 displayFKFields = ['TipoAsistente', 'Sexo', 'Region', 'Provincix', 'Comuna'];
 redirectRoutes = ['/curso']

 // Selectores

 selTables = ["region", "provincix", "comuna","tipoasistente", "sexo", ];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = [];
 patchFKsFromStorage = [];
 middleTables: any = {};

 // Route: from parent
 parentTable: string | null = null;
 parentId: number | null = null;

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {
   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
 }


}
