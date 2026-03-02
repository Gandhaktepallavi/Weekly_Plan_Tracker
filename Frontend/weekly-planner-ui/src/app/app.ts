import { Component, signal } from '@angular/core';
import { TeamSetupComponent } from './pages/team-setup/team-setup';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TeamSetupComponent],
  template: `<app-team-setup></app-team-setup>`
})
export class AppComponent {}