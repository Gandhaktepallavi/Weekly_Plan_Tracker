import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';


interface TeamMember {
  id: string;
  name: string;
  isTeamLead: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './team.html',
  styleUrls: ['./team.css']
})
export class TeamComponent implements OnInit {

  members: TeamMember[] = [];
  name = '';
  showToast = false;
  toastMessage = '';
  editingMemberId: string | null = null;
  editNameValue = '';

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.api.getTeamMembers().subscribe((data: any) => {
      this.members = data ?? [];
      this.syncTeamMembersToLocalStorage();
    });
  }

  addMember() {
    if (!this.name.trim()) return;

    const member = {
      name: this.name.trim()
    };

    this.api.addTeamMember(member).subscribe(() => {
      this.loadMembers();
      this.name = '';
      this.showSuccess('Team member added!');
    }, () => {
      this.showSuccess('Failed to add team member. Check API connectivity.');
    });
  }

  startEdit(member: TeamMember) {
    this.editingMemberId = member.id;
    this.editNameValue = member.name;
  }

  cancelEdit() {
    this.editingMemberId = null;
    this.editNameValue = '';
  }

  saveEdit(member: TeamMember) {
    const updatedName = this.editNameValue.trim();
    if (!updatedName) return;

    const updatedMember = { ...member, name: updatedName };

    this.api.updateMember(updatedMember).subscribe(() => {
      this.loadMembers();
      this.updateActiveUserName(updatedMember.id, updatedName);
      this.cancelEdit();
      this.showSuccess('Team member updated.');
    });
  }

  makeLead(member: TeamMember) {
    this.api.makeLead(member.id).subscribe(() => {
      this.loadMembers();
      this.updateActiveUserLead(member.id);
      this.showSuccess('Team lead updated.');
    });
  }

  deactivate(member: TeamMember) {
    if (member.isTeamLead) {
      return;
    }

    this.api.deactivateMember(member.id).subscribe(() => {
      this.loadMembers();
      this.removeInactiveUserFromActiveSelection(member.id);
      this.showSuccess('Team member deactivated.');
    });
  }

  closeToast() {
    this.showToast = false;
  }

  showSuccess(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000);
  }

  get activeMembers() {
    return this.members.filter(m => m.isActive);
  }

  private syncTeamMembersToLocalStorage() {
    const localMembers = this.activeMembers.map(member => ({
      id: member.id,
      name: member.name,
      isTeamLead: member.isTeamLead
    }));
    localStorage.setItem('teamMembers', JSON.stringify(localMembers));
  }

  private updateActiveUserName(memberId: string, newName: string) {
    const activeUserRaw = localStorage.getItem('activeUser');
    if (!activeUserRaw) return;

    const activeUser = JSON.parse(activeUserRaw);
    if (activeUser.id === memberId) {
      activeUser.name = newName;
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
    }
  }

  private updateActiveUserLead(newLeadId: string) {
    const activeUserRaw = localStorage.getItem('activeUser');
    if (!activeUserRaw) return;

    const activeUser = JSON.parse(activeUserRaw);
    activeUser.isTeamLead = activeUser.id === newLeadId;
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
  }

  private removeInactiveUserFromActiveSelection(memberId: string) {
    const activeUserRaw = localStorage.getItem('activeUser');
    if (!activeUserRaw) return;

    const activeUser = JSON.parse(activeUserRaw);
    if (activeUser.id === memberId) {
      localStorage.removeItem('activeUser');
    }
  }
}
