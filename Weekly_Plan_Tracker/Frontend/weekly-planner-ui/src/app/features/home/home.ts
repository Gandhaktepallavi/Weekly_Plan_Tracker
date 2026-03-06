import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { PlannerApiService } from '../../core/planner-api';

interface TeamMember {
  id: string;
  name: string;
  isTeamLead: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',  
  styleUrls: ['./home.css']     
})
export class HomeComponent implements OnInit {
  teamLeadName: string = '';
  hasActivePlan: boolean = false;

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadTeamMembers();
    this.checkActivePlan();
  }

  loadTeamMembers() {
    this.api.getTeamMembers().subscribe({
      next: (members: any) => {
        const lead = members.find((m: any) => m.isLead);
        if (lead) {
          this.teamLeadName = lead.name;
        }
      },
      error: (err) => console.error('Error loading team members:', err)
    });
  }

  checkActivePlan() {
    this.api.getDashboard().subscribe({
      next: (data: any) => {
        this.hasActivePlan = data && data.hasActivePlan;
      },
      error: (err) => {
        console.error('Error checking active plan:', err);
        this.hasActivePlan = false;
      }
    });
  }
}

