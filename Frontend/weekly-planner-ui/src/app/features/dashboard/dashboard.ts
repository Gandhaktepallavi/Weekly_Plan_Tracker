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
  showBanner: boolean = true;

  constructor(
    private api: PlannerApiService,
    private router: Router,
  ) {}

  ngOnInit() {
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
    this.router.navigate(['/planning']);
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
