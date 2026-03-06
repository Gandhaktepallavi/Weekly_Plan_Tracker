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
  displayName = '';
  isTeamLead = true;
  hasActivePlan: boolean = false;

  constructor(private api: PlannerApiService) {}


  ngOnInit() {
    const activeUserRaw = localStorage.getItem('activeUser');
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw) as TeamMember;
      this.displayName = activeUser?.name ?? '';
      this.isTeamLead = !!activeUser?.isTeamLead;
    } else {
      const stored = localStorage.getItem('teamMembers');
      if (stored) {
        const members: TeamMember[] = JSON.parse(stored);
        const lead = members.find(m => m.isTeamLead);
        if (lead) {
          this.displayName = lead.name;
          this.isTeamLead = true;
        }
      }
    }

    this.api.getActivePlan().subscribe({
      next: (exists) => this.hasActivePlan = !!exists,
      error: () => this.hasActivePlan = false
    });
  }
}
