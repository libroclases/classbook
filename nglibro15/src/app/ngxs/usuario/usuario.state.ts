import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Usuario } from './usuario.model';
import { GetUsuario, SetUsuario } from './usuario.actions';
import { tap } from 'rxjs';

export class UsuarioStateModel {
  public usuario!: Usuario;
}

const defaults = {
  usuario: {personalInfo: null, inscripcionColegio: null, uuid: null}
};

@State<UsuarioStateModel>({
  name: 'usuario',
  defaults
})

@Injectable()
export class UsuarioState {

  @Selector()
  static usuario(state: UsuarioStateModel) {
    return state.usuario;
  }


  constructor(private crud: CrudService){ }

  @Action(GetUsuario)
  getUsuario({getState, patchState}: StateContext<UsuarioStateModel>, { email }: GetUsuario) {
    return this.crud.getDataCustom('usuario', 'where', [], {
      email: email,
    })!.pipe(
      tap((res:any) => {
        patchState({
          usuario:  res
      });
     }
    )
  )
}

@Action(SetUsuario)
setUsuario({getState, patchState}: StateContext<UsuarioStateModel>, { color, usuario}: SetUsuario) {
  return this.crud.putData({Tema: color, id: usuario},'usuario')!.pipe(
    tap((res:any) => {
      const state = getState();
      const todo = [state.usuario];
      
      patchState({
        usuario: res.data
    });
   }
  )
)
}


}
