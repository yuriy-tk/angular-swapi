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
  selector: 'app-infinite-list-item-placeholder',
  templateUrl: './infinite-list-item-placeholder.component.html',
  styleUrls: ['./infinite-list-item-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteListItemPlaceholderComponent {
  @Input() show: boolean = false;
}
