import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { UtpAction } from './utp.actions';

export class UtpStateModel {
  public items!: string[];
}

const defaults = {
  items: []
};

@State<UtpStateModel>({
  name: 'utp',
  defaults
})
@Injectable()
export class UtpState {
  @Action(UtpAction)
  add({ getState, setState }: StateContext<UtpStateModel>, { payload }: UtpAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
