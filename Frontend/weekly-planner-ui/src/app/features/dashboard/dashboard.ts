import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any[] = [];
  showBanner = true;
  activeUserName = 'Team Lead';
  activeUserRole = 'Team Lead';

  constructor(
    private api: PlannerApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    const activeUserRaw = localStorage.getItem('activeUser');
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw);
      this.activeUserName = activeUser?.name ?? this.activeUserName;
      this.activeUserRole = activeUser?.isTeamLead ? 'Team Lead' : 'Team Member';
    }

    this.api.getDashboard().subscribe((data: any) => {
      this.dashboardData = data;
    });
  }

  cancelPlanning() {
    this.router.navigate(['/home']);
  }

  goToReview() {
    this.router.navigate(['/review']);
  }
  goToPlanning() {
    this.router.navigate(['/plan-work']);
  }

  goToBacklog() {
    this.router.navigate(['/backlog']);
  }

  goToTeam() {
    this.router.navigate(['/team']);
  }

  goToPastWeeks() {
    this.router.navigate(['/history']);
  }
}
