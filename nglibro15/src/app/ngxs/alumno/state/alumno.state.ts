import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Person } from 'src/app/models/person';
import { GetAlumno } from './alumno.actions';
import { tap } from 'rxjs';

export class AlumnoStateModel {
  public alumno!: Person[];
}

const defaults = {
  alumno: []
};

@State<AlumnoStateModel>({
  name: 'alumno',
  defaults
})
@Injectable()
export class AlumnoState {

  @Selector()
  static alumno(state: AlumnoStateModel) {
    return state.alumno;
  }
 

  constructor(private crud: CrudService){ }

  @Action(GetAlumno)
  getAlumno({ setState }: StateContext<any>, { payload }: GetAlumno) {
     console.log('payload',payload)
     return this.crud.makeSearch('alumno',payload.nombre)!.pipe(
      tap((alumno:any) => { setState({alumno}) })
     )   
  }

  /*
  add({ getState, setState }: StateContext<AlumnoStateModel>, { payload }: GetAlumno) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
  */
}
