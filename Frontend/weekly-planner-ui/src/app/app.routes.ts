import { Routes } from '@angular/router';
import { TeamSetupComponent } from './pages/team-setup/team-setup';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  { path: '', component: TeamSetupComponent },
  { path: 'home', component: HomeComponent },
  {
  path: 'planning/new',
  loadComponent: () =>
    import('./features/planning/planning.component')
      .then((m) => m.PlanningComponent),
},
{
  path: 'dashboard',
  loadComponent: () =>
    import('./features/dashboard/dashboard')
      .then(m => m.DashboardComponent)
},
{
  path: 'review',
  loadComponent: () =>
    import('./features/review/review')
      .then(m => m.ReviewComponent)
},
{
  path: 'history',
  loadComponent: () =>
    import('./features/history/history')
      .then(m => m.HistoryComponent)
},
{
  path: 'backlog',
  loadComponent: () =>
    import('./features/backlog/backlog')
      .then(m => m.BacklogComponent)
},
{
  path: 'team',
  loadComponent: () =>
    import('./features/team/team')
      .then(m => m.TeamComponent)
},
  { path: '**', redirectTo: '' }, // Fallback to home
];
