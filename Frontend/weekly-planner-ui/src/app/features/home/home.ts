import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { PlannerApiService } from '../../core/planner-api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',  // Fixed: .component.html
  styleUrls: ['./home.css']     // Fixed: .component.css
})
export class HomeComponent implements OnInit {
  userName = 'jj';
  hasActivePlan = false;

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    // this.api.getUserProfile().subscribe(profile => this.userName = profile.name);
    // this.api.getActivePlan().subscribe(exists => this.hasActivePlan = exists);
  }
}
