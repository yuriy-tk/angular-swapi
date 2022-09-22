import { Component, OnInit } from '@angular/core';
import { CharactersFacade } from '../characters.facade';
import { Character } from '../models/character';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  charactersList$ = this.charactersFacade.charactersList$;

  constructor(
    private readonly router: Router,
    private readonly charactersFacade: CharactersFacade,
  ) {
    this.charactersFacade.loadMoreCharacters(1);
  }

  ngOnInit() {}

  charactersTrackBy(index: number, character: Character) {
    return character.id;
  }

  loadMoreCharacters() {
    this.charactersFacade.loadMoreCharacters();
  }

  onOpenCharacterDetails(id: number) {
    this.router.navigate(['/people', id]);
  }
}
