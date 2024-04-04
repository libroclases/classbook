import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ColegioAction } from './colegio.actions';

export class ColegioStateModel {
  public items!: string[];
}

const defaults = {
  items: []
};

@State<ColegioStateModel>({
  name: 'colegio',
  defaults
})
@Injectable()
export class ColegioState {
  @Action(ColegioAction)
  add({ getState, setState }: StateContext<ColegioStateModel>, { payload }: ColegioAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
