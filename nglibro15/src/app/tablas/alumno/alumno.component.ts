import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { GetAlumno } from 'src/app/ngxs/alumno/state/alumno.actions';
import { AlumnoState } from 'src/app/ngxs/alumno/state/alumno.state';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
 // Selector asociado a la propiedad people del estado
 @Select(AlumnoState.alumno)
 alumno$!: Observable<any>;

 searchTerm$ = new Subject<string>();

 // Array donde almacenaremos las personas
 public alumnoFiltered: any = [];

 // Atributo para el filtro del nombre
 public filterName: string;
 
 constructor(private store: Store) {
   this.filterName = '';
 }

 search(event: Event): void {
  console.log('poronga');
  const element = event.currentTarget as HTMLInputElement;
  this.searchTerm$.next(element.value);
  this.filterName=element.value;
  this.filter()
}

 ngOnInit() {
   this.fetchAlumno();
 }


 fetchAlumno(){
   // Nos subscribimos para estar pendiente de los cambios de la propiedad
   this.alumno$.subscribe({
     next: () => {
       // Obtenemos el array de personas de la store
       this.alumnoFiltered = this.store.selectSnapshot(AlumnoState.alumno);
       console.log('Alumno ha cambiado', this.store.snapshot());
     }
   })
 }

 filter() {
   // Activo la acción, dandole el nombre a filtrar
   console.log('filterName', this.filterName)
   this.store.dispatch(new GetAlumno({ nombre: this.filterName }));
   
 }



  // Tabla Principal
  /*
  mainTable: string = 'alumno';
  tableTitle = 'Alumnos';
  textFields = ['apellido1','apellido2','nombre', 'rut', 'direccion', 'celular'];
  dateFields = ['nacimiento'];
  // displayFKFields: CamelCase
  displayFKFields = ['Sexo', 'Region', 'Provincix','Comuna'];
  redirectRoutes = ['/matricula'];

  // Selectores

  selTables = ['sexo', 'region', 'provincix', 'comuna'];
  changeFnsArray: Function[] = [];
  ignoreFkRequirements: string[] = [];
  patchFKsFromStorage = [];

  // Route: from parent
  parentTable: string | null = null;
  parentId: number | null = null;

  constructor( ) { }

  emptyFn = (e: any) => { };

  ngOnInit(): void {

    this.changeFnsArray = [ this.emptyFn, this.emptyFn ];

  }
  */
}
