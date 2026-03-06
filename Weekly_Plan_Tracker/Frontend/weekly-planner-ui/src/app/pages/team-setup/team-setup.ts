import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 
interface TeamMember {
  id: string;
  name: string;
  isTeamLead: boolean;
}

@Component({
  selector: 'app-team-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-setup.html',
  styleUrl: './team-setup.css',
  
})
export class TeamSetupComponent {

  constructor(private router: Router) {}

  name: string = '';
  members: TeamMember[] = [];

  addMember() {
    if (!this.name.trim()) return;

    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: this.name.trim(),
      isTeamLead: false
    };

    this.members.push(newMember);
    this.name = '';
  }

  setTeamLead(id: string) {
    this.members.forEach(member => {
      member.isTeamLead = member.id === id;
    });
  }

  removeMember(id: string) {
    this.members = this.members.filter(m => m.id !== id);
  }

  canProceed(): boolean {
    const hasMembers = this.members.length > 0;
    const hasLead = this.members.some(m => m.isTeamLead);
    return hasMembers && hasLead;
  }

   goToHome() {
    if (!this.canProceed()) return;
      localStorage.setItem('teamMembers', JSON.stringify(this.members));

    this.router.navigate(['/home']);
  }
}