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
  darkMode = false;

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.api.getUserProfile().subscribe((data: any) => {
      this.userName = data.name;
      this.isLead = data.role === 'Team Lead';
    });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('light-theme');
  }

}