import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="layout">
      <app-navbar></app-navbar>

      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      background: #0f172a;
    }

    .content {
      flex: 0 0 auto;
    }
  `]
})
export class AppComponent {}
