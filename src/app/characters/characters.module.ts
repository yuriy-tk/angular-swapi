import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffects } from './+state/characters.effects';
import { RouterModule, Routes } from '@angular/router';
import { CharactersService } from './characters.service';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharactersFacade } from './characters.facade';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CharacterDetailsComponent } from './character-details/character-details.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
  },
  {
    path: 'people/:id',
    component: CharacterDetailsComponent,
  },
];
@NgModule({
  declarations: [CharactersListComponent, CharacterDetailsComponent],
  providers: [CharactersService, CharactersFacade],
  imports: [
    CommonModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([CharactersEffects]),
    SharedModule,
  ],
})
export class CharactersModule {}
