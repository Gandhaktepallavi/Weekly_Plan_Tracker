import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
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
export class TeamSetupComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  name: string = '';
  members: TeamMember[] = [];
  selectedUserId: string = '';
  isSwitchMode = false;

  ngOnInit() {
    this.isSwitchMode = this.route.snapshot.queryParamMap.get('mode') === 'switch';

    const storedMembers = localStorage.getItem('teamMembers');
    if (storedMembers) {
      this.members = JSON.parse(storedMembers);
    }

    const activeUserRaw = localStorage.getItem('activeUser');
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw);
      this.selectedUserId = activeUser.id ?? '';
    }
  }

  get hasExistingMembers(): boolean {
    return this.members.length > 0;
  }

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

  chooseMember(member: TeamMember) {
    this.selectedUserId = member.id;
    localStorage.setItem('activeUser', JSON.stringify(member));

    if (member.isTeamLead) {
      this.router.navigate(['/home']);
      return;
    }

    this.router.navigate(['/planning/new']);
  }
}
