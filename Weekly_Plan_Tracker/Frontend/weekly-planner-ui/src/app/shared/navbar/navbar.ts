import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  darkMode: boolean = true;

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadProfile();
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
    }
    this.applyTheme();
  }

  loadProfile() {
    this.api.getTeamMembers().subscribe({
      next: (members: any) => {
        const lead = members.find((m: any) => m.isLead);
        if (lead) {
          this.userName = lead.name;
          this.isLead = true;
        } else if (members.length > 0) {
          this.userName = members[0].name;
        }
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.userName = 'User';
      }
    });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.darkMode) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
}

