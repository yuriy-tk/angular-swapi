import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchCharacterFilms,
  fetchCharacterFilmsSuccess,
  fetchCharacterInfoSuccess,
  fetchCharacters,
  fetchCharactersFailure,
  fetchCharactersSuccess,
} from './characters.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Character } from '../models/character';
import { Movie } from '../models/movie';

const CHARACTER_HTTP_URL_LENGTH = `https://swapi.dev/api/people/`.length;

export interface State {
  isLoading: boolean;
  error: HttpErrorResponse | null;
  count: number;
  data: Character[] | null;
  selectedCharacter: Character | null;
  selectedCharacterFilms: Movie[] | null;
  filmsIsLoading: boolean;
  next: string | null;
  previous: string | null;
  nextPageNumber: number | null;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  count: 0,
  data: [],
  selectedCharacter: null,
  selectedCharacterFilms: null,
  filmsIsLoading: false,
  next: null,
  previous: null,
  nextPageNumber: null,
};

export const reducer = createReducer(
  initialState,
  on(fetchCharacters, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fetchCharactersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    count: action.payload.count,
    next: action.payload.next,
    previous: action.payload.previous,
    data: [...(state.data || []), ...addCharactersId(action.payload.results)],
    nextPageNumber: !!action.payload?.next
      ? Number(action.payload.next?.split('?')[1].split('=')[1])
      : null,
  })),
  on(fetchCharactersFailure, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(fetchCharacterInfoSuccess, (state, action) => ({
    ...state,
    selectedCharacter: action.payload,
  })),
  on(fetchCharacterFilms, (state, action) => ({
    ...state,
    filmsIsLoading: true,
  })),
  on(fetchCharacterFilmsSuccess, (state, action) => ({
    ...state,
    filmsIsLoading: false,
    selectedCharacterFilms: action.payload,
  }))
);

function addCharactersId(characters: Character[]): Character[] {
  return characters.map((character) => {
    return {
      ...character,
      id: getCharacterIdFromUrl(character.url),
    };
  });
}

export function getCharacterIdFromUrl(characterUrl: string): number {
  return parseInt(
    characterUrl.substring(CHARACTER_HTTP_URL_LENGTH, characterUrl.length - 1),
    10
  );
}
