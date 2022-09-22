import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  getActiveCharacter,
  getCharacterFilms,
  getCharacterFilmsIsLoading,
  getCharacters
} from './+state/characters.selector';
import {
  fetchCharacterFilms,
  fetchCharacterInfo,
  fetchCharacters,
} from './+state/characters.actions';

@Injectable()
export class CharactersFacade {
  constructor(private readonly store: Store<AppState>) {}

  charactersList$ = this.store.select(getCharacters);
  activeCharacter$ = this.store.select(getActiveCharacter);
  activeCharacterFilms$ = this.store.select(getCharacterFilms);
  filmsIsLoading$ = this.store.select(getCharacterFilmsIsLoading);

  loadMoreCharacters(pageNumber?: number) {
    this.store.dispatch(fetchCharacters({ page: pageNumber }));
  }

  loadCharacterInfo(characterId: number) {
    this.store.dispatch(fetchCharacterInfo({ id: characterId }));
  }
}
