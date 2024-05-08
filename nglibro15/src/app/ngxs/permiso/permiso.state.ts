import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Permiso } from './permiso.model';
import { GetPermiso } from './permiso.actions';
import { from, tap } from 'rxjs';

export class PermisoStateModel {
  public permiso!: Permiso;
}


const defaults = {
  permiso: { leer: null, editar:null, crear: null }
};



@State<PermisoStateModel>({
  name: 'permiso',
  defaults
})

@Injectable()
export class PermisoState {

  @Selector()
  static permiso(state: PermisoStateModel) {
    return state.permiso;
  }

  constructor(){ }

  @Action(GetPermiso)
  getPermiso({getState, patchState}: StateContext<PermisoStateModel>, { permisos }: GetPermiso) {
    return from(permisos)!.pipe(
      tap((res:any) => {
        patchState({
          permiso:  res
        });


      }
    )
  )
}


}
