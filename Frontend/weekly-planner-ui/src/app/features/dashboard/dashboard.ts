import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  planning: any;
  showBanner: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('activePlanning');
    if (stored) {
      this.planning = JSON.parse(stored);
    } else {
      this.router.navigate(['/home']);
    }
  }

  cancelPlanning() {
    localStorage.removeItem('activePlanning');
    this.router.navigate(['/home']);
  }
  goToReview() {
  this.router.navigate(['/review']);
}
}