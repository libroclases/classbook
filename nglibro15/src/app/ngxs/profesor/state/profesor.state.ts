import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ProfesorAction } from './profesor.actions';

export class ProfesorStateModel {
  public items!: string[];
}

const defaults = {
  items: []
};

@State<ProfesorStateModel>({
  name: 'profesor',
  defaults
})
@Injectable()
export class ProfesorState {
  @Action(ProfesorAction)
  add({ getState, setState }: StateContext<ProfesorStateModel>, { payload }: ProfesorAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
