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
  dashboardData: any = null;
  showBanner: boolean = true;
  loading: boolean = false;

  constructor(
    private api: PlannerApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.api.getDashboard().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.showBanner = data.hasActivePlan && !data.isFrozen;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard:', err);
        this.loading = false;
      }
    });
  }

  cancelPlanning() {
    if (confirm('Are you sure you want to cancel this week\'s planning? This will delete all tasks.')) {
      if (this.dashboardData && this.dashboardData.planId) {
        this.api.deletePlan(this.dashboardData.planId).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => console.error('Error canceling plan:', err)
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
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
    this.router.navigate(['/past-weeks']);
  }
}

