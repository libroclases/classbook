import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Person } from './usuario.model';
import { GetUsuario } from './usuario.actions';
import { tap } from 'rxjs';

export class UsuarioStateModel {
  public usuario!: Person[];
}

const defaults = {
  usuario: []
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
  getUsuario({getState, setState}: StateContext<UsuarioStateModel>, { email }: GetUsuario) {
    return this.crud.getDataCustom('usuario', 'where', [], {
      email: email,
    })!.pipe(
      tap((res:any) => {
        const state = getState();
        setState({
          ...state,
          usuario: res,
      });
     }
    )
  )
}

}
