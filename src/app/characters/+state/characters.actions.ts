import { createAction, props } from '@ngrx/store';
import { Character, CharactersResponse } from '../models/character';
import { Movie } from "../models/movie";

export const enum Pagination {
  NEXT,
  PREV,
}

export const fetchCharacters = createAction(
  '[Character] Fetch Characters',
  props<{ page?: number; force?: boolean }>()
);

export const fetchCharactersSuccess = createAction(
  '[Character] Fetch Characters Success',
  props<{ payload: CharactersResponse }>()
);

export const fetchCharactersFailure = createAction(
  '[Character] Fetch Characters Failure',
  props<{ payload: any }>()
);

export const fetchCharacterInfo = createAction(
  '[Character] Fetch Character Info',
  props<{ id: number }>()
);

export const fetchCharacterInfoSuccess = createAction(
  '[Character] Fetch Character Info Success',
  props<{ payload: Character }>()
);

export const fetchCharacterInfoFailure = createAction(
  '[Character] Fetch Character Info Failure',
  props<{ payload: any }>()
);

export const fetchCharacterFilms = createAction(
    '[Character] Fetch Character Films',
);

export const fetchCharacterFilmsSuccess = createAction(
    '[Character] Fetch Character Films Success',
    props<{ payload: Movie[] }>()
);

export const fetchCharacterFilmsFailure = createAction(
    '[Character] Fetch Character Films Failure',
);
