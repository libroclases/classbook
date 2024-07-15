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
 displayFKFields = ['Anno','Periodo','Colegio', 'Curso', 'CursoProfesor', 'TipoEvaluacion'];
 redirectRoutes!: string[];

 // Selectores

 selTables = ["anno", "periodo" , "colegio", "curso", "cursoprofesor","tipoevaluacion"];
 changeFnsArray: Function[] = [];
 ignoreFkRequirements: string[] = ['asignatura','profesor'];
 patchFKsFromStorage = ['anno','periodo','colegio','curso'];

 constructor( ) { }

 emptyFn = (e: any) => { };

 ngOnInit(): void {

   this.changeFnsArray = [this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn, this.emptyFn]

 }

}
