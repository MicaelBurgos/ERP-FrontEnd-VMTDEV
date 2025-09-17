import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then( r => r.routes)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
