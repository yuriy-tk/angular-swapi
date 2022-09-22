import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { State } from './characters.reducer';
import { Character } from '../models/character';

export const getState = (state: AppState): State => {
  return state.characters;
};

export const getCharacters = createSelector(
  getState,
  (charactersState: State): Character[] => charactersState.data || []
);

export const getActiveCharacter = createSelector(
  getState,
  (charactersState: State): Character | null => charactersState.selectedCharacter
);

export const getIsLoading = createSelector(
  getState,
  (state) => state.isLoading
);

export const getCharacterFilms = createSelector(
  getState,
  (state) => state.selectedCharacterFilms
);

export const getCharacterFilmsIsLoading = createSelector(
  getState,
  (state) => state.filmsIsLoading
);

export const getIsFirstPage = createSelector(
  getState,
  (state) => !state.previous
);
export const getIsLastPage = createSelector(getState, (state) => !state.next);
