import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from './characters.reducer';
import { CharactersService } from '../characters.service';
import {
  fetchCharacterFilms,
  fetchCharacterFilmsSuccess,
  fetchCharacterInfo,
  fetchCharacterInfoFailure,
  fetchCharacterInfoSuccess,
  fetchCharacters,
  fetchCharactersFailure,
  fetchCharactersSuccess,
} from './characters.actions';
import { delay, EMPTY, filter, mergeMap, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../app.state';

@Injectable()
export class CharactersEffects {
  fetchCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCharacters),
      withLatestFrom(this.store),
      filter(([action, state]) =>
        Boolean(action.page || state.characters?.nextPageNumber)
      ),
      switchMap(([action, state]) => {
        const nextPage = action.page || state.characters?.nextPageNumber || 1;
        return this.charactersService.getCharactersList(nextPage).pipe(
          catchError((err) => EMPTY),
          mergeMap((data) =>
            !data.previous
              ? [
                  fetchCharactersSuccess({ payload: data }),
                  fetchCharacters({ page: 2, force: !data.previous }),
                ]
              : [fetchCharactersSuccess({ payload: data })]
          )
        );
      })
    );
  });

  fetchCharacter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCharacterInfo),
      switchMap((action) =>
        this.charactersService.getCharacter(action.id).pipe(
          catchError((err) => EMPTY),
          mergeMap((data) => [
            fetchCharacterInfoSuccess({ payload: data }),
            fetchCharacterFilms(),
          ])
        )
      )
    );
  });

  fetchCharacterMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCharacterFilms),
      delay(1000),
      withLatestFrom(this.store),
      switchMap(([action, state]) => {
        const films = state.characters?.selectedCharacter?.films || [];
        return this.charactersService.getFilmsByCharacter(films).pipe(
          catchError((err) => EMPTY),
          map((data) => fetchCharacterFilmsSuccess({ payload: data }))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private charactersService: CharactersService
  ) {}
}
