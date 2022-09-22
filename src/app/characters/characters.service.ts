import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character, CharactersResponse } from './models/character';
import { getCharacterIdFromUrl } from './+state/characters.reducer';
import { Movie } from './models/movie';

const FILM_HTTP_URL_LENGTH = `'https://swapi.dev/api/films/`.length;

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private readonly http: HttpClient) {}

  getCharactersList(pageNumber: number): Observable<CharactersResponse> {
    return this.http
      .get<CharactersResponse>(
        `https://swapi.dev/api/people/?page=${pageNumber}`
      )
      .pipe(map((characters) => characters));
  }

  getCharacter(characterId: number): Observable<Character> {
    return this.http
      .get<Character>(`https://swapi.dev/api/people/${characterId}`)
      .pipe(
        map((character) => {
          character.id = getCharacterIdFromUrl(character.url);
          return character;
        })
      );
  }

  getFilmsByCharacter(films: string[]): Observable<Movie[]> {
    return forkJoin(
      films.map((filmUrl) =>
        this.http.get<Movie>(filmUrl).pipe(
          map((film) => {
            film.id = this.getFilmId(film.url);

            return film;
          })
        )
      )
    );
  }

  private getFilmId(filmUrl: string): number {
    return parseInt(
      filmUrl.substring(FILM_HTTP_URL_LENGTH, filmUrl.length - 2),
      10
    );
  }
}
