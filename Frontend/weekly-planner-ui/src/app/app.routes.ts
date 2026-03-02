
import { Routes } from '@angular/router';
import { BacklogListComponent } from './features/backlog/backlog-list/backlog-list';
export const routes: Routes = [
  { path: '', redirectTo: '/backlog', pathMatch: 'full' },
  { path: 'backlog', component: BacklogListComponent },
  // Add planning, dashboard later
];
