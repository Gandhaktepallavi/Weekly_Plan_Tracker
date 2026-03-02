import { Routes } from '@angular/router';
import { BacklogListComponent } from './features/backlog/backlog-list/backlog-list';
import { HomeComponent } from './features/home/home';  // ← ADD

export const routes: Routes = [
  { path: '', component: HomeComponent },  // ← HOME FIRST
  { path: 'backlog', component: BacklogListComponent },
  { path: 'planning/new', loadComponent: () => import('./features/planning/planning.component').then(m => m.default) },
  // Add team/history later
  { path: '**', redirectTo: '' }  // Fallback to home
];
