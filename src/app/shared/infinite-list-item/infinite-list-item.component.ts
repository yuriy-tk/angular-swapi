import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../../characters/characters.service';
import { Character } from '../../characters/models/character';

@Component({
  selector: 'app-infinite-list-item',
  templateUrl: './infinite-list-item.component.html',
  styleUrls: ['./infinite-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteListItemComponent {
  @Input() character: Character | undefined;

  @Output() openCharacterDetails = new EventEmitter();

  get additionalCharacterInfo(): string {
    return this.character
      ? `${this.character?.gender}, ${this.character?.birth_year}, ${this.character?.height}`
      : '';
  }

  onGetDetails() {
    this.openCharacterDetails.emit();
  }
}
