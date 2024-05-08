import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Permiso } from './permiso.model';
import { GetPermiso } from './permiso.actions';
import { from, tap } from 'rxjs';
import { Permission } from 'src/environments/environment.development';

export class PermisosStateModel {
  public permiso!: Permiso;
}

const defaults = {
  permiso: {leer: true, editar:true, crear: true}
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


  constructor(){ }

  @Action(GetPermiso)
  getPermiso({getState, patchState}: StateContext<PermisosStateModel>, { tabla }: GetPermiso) {
    return from(Permission(tabla))!.pipe(
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
