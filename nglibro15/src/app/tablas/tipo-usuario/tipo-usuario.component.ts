import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent {
 // Tabla Principal

 mainTable: string = 'tipousuario';
 tableTitle = 'Tipo Usuario';
 textFields = ['nombre', 'descripcion'];
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
 middleTables: any = {};

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn]
 }

}
