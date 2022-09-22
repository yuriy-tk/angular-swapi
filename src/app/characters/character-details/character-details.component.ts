import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersFacade } from '../characters.facade';
import { format } from 'date-fns';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  activeCharacter$ = this.charactersFacade.activeCharacter$;
  activeCharacterFilms$ = this.charactersFacade.activeCharacterFilms$;
  filmsIsLoading$ = this.charactersFacade.filmsIsLoading$;

  constructor(
    private readonly charactersFacade: CharactersFacade,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const characterId = this.activatedRoute.snapshot.params['id'];

    this.charactersFacade.loadCharacterInfo(characterId);
  }

  formattedDate(date: string): string {
    return `${format(new Date(date), 'PPP')}`;
  }
}
