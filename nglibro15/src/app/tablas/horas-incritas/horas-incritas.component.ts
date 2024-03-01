import { Component } from '@angular/core';
import { MaintainerComponent } from '../../shared/componentes/maintainer/maintainer.component';
import { MultiSelectComponent } from '../../shared/componentes/multi-select/multi-select.component';

@Component({
  selector: 'app-horas-inscritas',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./horas-incritas.component.css']
})
export class HorasInscritasComponent {

 // Tabla Principal

 mainTable: string = 'horario';
 tableTitle = 'Horas Inscritas';
 textFields = ['TotalHoras'];
 dateFields = [];
 // displayFKFields: CamelCase
 displayFKFields = ['Profesor','AsignaturaProfesor','Anno', 'Colegio', 'Curso'];
 redirectRoutes = []

 // Selectores

 selTables = ["profesor", "asignaturaprofesor", "anno", "colegio", "curso"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = ['asignatura'];
 patchFKsFromStorage = ['anno', 'colegio'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {
   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn];
 }


}

