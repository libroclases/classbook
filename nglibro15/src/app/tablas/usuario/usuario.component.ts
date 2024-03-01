import { Component } from '@angular/core';
import { MaintainerComponent } from '../../shared/componentes/maintainer/maintainer.component';

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
