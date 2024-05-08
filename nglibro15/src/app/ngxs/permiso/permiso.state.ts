import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Permiso } from './permiso.model';
import { GetPermiso } from './permiso.actions';
import { from, of, tap } from 'rxjs';

export class PermisosStateModel {
  public permiso!: Permiso;
}


const defaults = {
  permiso: { leer: null, editar:null, crear: null }
};



@State<PermisosStateModel>({
  name: 'permiso',
  defaults
})

@Injectable()
export class PermisoState {

  @Selector()
  static permiso(state: PermisosStateModel) {
    return state.permiso;
  }


  // permiso:any =  { Colegio : [{leer : 'profesor', editar: 'admin' , crear: 'admin' }]}
  constructor(){}

  @Action(GetPermiso)
  getPermiso({getState, patchState}: StateContext<PermisosStateModel>, { permisos }: GetPermiso) {
    return from(permisos)!.pipe(
      tap((res:any) => {
        console.log('poronga',res)

        patchState({
          permiso:  res
        });


      }
    )
  )
}


}
