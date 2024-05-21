import { Component } from '@angular/core';


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
 booleanFields = [];
 dateFields = ['fecha'];
 // displayFKFields: CamelCase
 displayFKFields = ['Colegio', 'Curso', 'Profesor', 'AsignaturaProfesor', 'Anno', 'Periodo', 'TipoEvaluacion'];
 redirectRoutes!: string[];

 // Selectores

 selTables = ["anno", "periodo" , "colegio", "curso", "profesor", "asignaturaprofesor"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = ["asignatura"];
 patchFKsFromStorage = ['anno', 'colegio','periodo','curso'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn]

 }

}
