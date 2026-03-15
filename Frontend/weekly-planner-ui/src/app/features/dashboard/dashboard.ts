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
<<<<<<< HEAD
  showBanner: boolean = true;
=======
  showBanner = true;
  activeUserName = 'Team Lead';
  activeUserRole = 'Team Lead';
>>>>>>> backend-setup

  constructor(
    private api: PlannerApiService,
    private router: Router,
  ) {}

  ngOnInit() {
<<<<<<< HEAD
=======
    const activeUserRaw = localStorage.getItem('activeUser');
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw);
      this.activeUserName = activeUser?.name ?? this.activeUserName;
      this.activeUserRole = activeUser?.isTeamLead ? 'Team Lead' : 'Team Member';
    }

>>>>>>> backend-setup
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
<<<<<<< HEAD
    this.router.navigate(['/planning']);
=======
    this.router.navigate(['/plan-work']);
>>>>>>> backend-setup
  }

  goToBacklog() {
    this.router.navigate(['/backlog']);
  }

  goToTeam() {
    this.router.navigate(['/team']);
  }

  goToPastWeeks() {
<<<<<<< HEAD
    this.router.navigate(['/review']);
=======
    this.router.navigate(['/history']);
>>>>>>> backend-setup
  }
}
