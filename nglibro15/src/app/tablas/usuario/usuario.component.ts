import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  // Tabla Principal

  mainTable: string = 'usuario';
  tableTitle = 'Usuario';
  textFields = ['username','email'];
  booleanFields = [];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = ['TipoUsuario','Tema'];
  redirectRoutes = [];

  // Selectores

  selTables = ["tipousuario","tema"];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {

    this.changeFnsArray = [this.emptyFn, this.emptyFn];

  }
}
