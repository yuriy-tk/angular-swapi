import { RouterNavigationAction, routerReducer } from '@ngrx/router-store';
import { storeLogger } from 'ngrx-store-logger';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import {
  reducer as fromCharacters,
  State as CharactersReducerState,
} from './characters/+state/characters.reducer';

export type All = RouterNavigationAction;

export interface AppState {
  characters: CharactersReducerState;
}

export const reducer = {
  layout: fromCharacters,
  routerReducer,
};

export function logger(
  actionReducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return storeLogger()(actionReducer);
}

export const reducerToken = new InjectionToken<ActionReducerMap<AppState>>(
  'Registered Reducers'
);
