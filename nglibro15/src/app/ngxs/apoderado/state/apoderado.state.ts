import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ApoderadoAction } from './apoderado.actions';

export class ApoderadoStateModel {
  public items!: string[];
}

const defaults = {
  items: []
};

@State<ApoderadoStateModel>({
  name: 'apoderado',
  defaults
})
@Injectable()
export class ApoderadoState {
  @Action(ApoderadoAction)
  add({ getState, setState }: StateContext<ApoderadoStateModel>, { payload }: ApoderadoAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
