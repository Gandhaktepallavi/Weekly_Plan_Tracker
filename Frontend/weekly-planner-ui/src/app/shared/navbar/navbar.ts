import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { PlannerApiService } from '../../core/planner-api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {

  userName: string = '';
  isLead: boolean = false;
  darkMode = true;
  private readonly themeStorageKey = 'weeklyplanner.theme';

  constructor(private api: PlannerApiService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
    this.initializeTheme();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.loadProfile());
  }

  loadProfile() {
    const activeUserRaw = localStorage.getItem('activeUser');
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw);
      this.userName = activeUser.name ?? '';
      this.isLead = !!activeUser.isTeamLead;
      return;
    }

    this.api.getUserProfile().subscribe({
      next: (data: any) => {
        this.userName = data.name;
        this.isLead = data.role === 'Team Lead' || data.role === 'Lead';
      },
      error: () => {
        this.userName = '';
        this.isLead = false;
      }
    });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    localStorage.setItem(this.themeStorageKey, this.darkMode ? 'dark' : 'light');
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    this.darkMode = savedTheme !== 'light';
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('light-theme', !this.darkMode);
  }
}
