import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCharacters from '../characters/+state/characters.reducer';

export interface State {
  characters: fromCharacters.State;
}

export const reducers: ActionReducerMap<State> = {
  characters: fromCharacters.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
