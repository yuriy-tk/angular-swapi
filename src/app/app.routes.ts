import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full',
  },
  {
    path: 'people',
    loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule),
  },
];
