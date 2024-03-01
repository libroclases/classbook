import { Component } from '@angular/core';
import { MaintainerComponent } from '../../shared/componentes/maintainer/maintainer.component';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './../../shared/componentes/maintainer-template/maintainer-template.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {

 // Tabla Principal

 mainTable: string = 'evaluacion';
 tableTitle = 'Evaluaciones';
 textFields = ['nombre', 'hora', 'ponderacion'];
 dateFields = ['fecha'];
 // displayFKFields: CamelCase
 displayFKFields = ['Colegio', 'Curso', 'Profesor', 'AsignaturaProfesor', 'Anno', 'Periodo', 'TipoEvaluacion'];
 redirectRoutes!: string[];

 // Selectores

 selTables = ["profesor", "asignaturaprofesor", "anno", "periodo" , "colegio", "curso"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = ["asignatura"];
 patchFKsFromStorage = ['anno', 'colegio'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn]

 }

}
