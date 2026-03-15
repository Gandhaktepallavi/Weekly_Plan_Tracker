import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
=======
import { RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

>>>>>>> backend-setup

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

<<<<<<< HEAD
  constructor(private api: PlannerApiService, private router: Router) {}
=======
  constructor(private api: PlannerApiService) {}
>>>>>>> backend-setup

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
<<<<<<< HEAD
    this.api.getTeamMembers().subscribe((data: any) => {
      this.members = data;
=======
    this.api.getTeamMembers().subscribe({
      next: (data: any) => {
        this.members = data ?? [];
        this.syncTeamMembersToLocalStorage();
      },
      error: () => {
        const localMembersRaw = localStorage.getItem('teamMembers');
        const localMembers = localMembersRaw ? JSON.parse(localMembersRaw) : [];
        this.members = localMembers.map((m: any) => ({
          id: m.id,
          name: m.name,
          isTeamLead: !!m.isTeamLead,
          isActive: true
        }));
      }
>>>>>>> backend-setup
    });
  }

  addMember() {
    if (!this.name.trim()) return;

    const member = {
      name: this.name.trim()
    };

<<<<<<< HEAD
    this.api.addTeamMember(member).subscribe(() => {
      this.loadMembers();
      this.name = '';
      this.showSuccess();
    });
  }

  editName(member: TeamMember) {
    const updated = prompt('Edit name:', member.name);
    if (!updated) return;

    const updatedMember = { ...member, name: updated };

    this.api.updateMember(updatedMember).subscribe(() => {
      this.loadMembers();
=======
    this.api.addTeamMember(member).subscribe({
      next: () => {
        this.loadMembers();
        this.name = '';
        this.showSuccess('Team member added!');
      },
      error: () => {
        const newMember: TeamMember = {
          id: crypto.randomUUID(),
          name: this.name.trim(),
          isTeamLead: this.activeMembers.length === 0,
          isActive: true
        };
        this.members = [...this.members, newMember];
        this.name = '';
        this.syncTeamMembersToLocalStorage();
        this.showSuccess('Team member added locally (API unavailable).');
      }
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

    this.api.updateMember(updatedMember).subscribe({
      next: () => {
        this.loadMembers();
        this.updateActiveUserName(updatedMember.id, updatedName);
        this.cancelEdit();
        this.showSuccess('Team member updated.');
      },
      error: () => {
        this.members = this.members.map((m) =>
          m.id === member.id ? { ...m, name: updatedName } : m
        );
        this.updateActiveUserName(member.id, updatedName);
        this.syncTeamMembersToLocalStorage();
        this.cancelEdit();
        this.showSuccess('Team member updated locally.');
      }
>>>>>>> backend-setup
    });
  }

  makeLead(member: TeamMember) {
<<<<<<< HEAD
    this.api.makeLead(member.id).subscribe(() => {
      this.loadMembers();
=======
    this.api.makeLead(member.id).subscribe({
      next: () => {
        this.loadMembers();
        this.updateActiveUserLead(member.id);
        this.showSuccess('Team lead updated.');
      },
      error: () => {
        this.members = this.members.map((m) => ({ ...m, isTeamLead: m.id === member.id }));
        this.updateActiveUserLead(member.id);
        this.syncTeamMembersToLocalStorage();
        this.showSuccess('Team lead updated locally.');
      }
>>>>>>> backend-setup
    });
  }

  deactivate(member: TeamMember) {
<<<<<<< HEAD
    this.api.deactivateMember(member.id).subscribe(() => {
      this.loadMembers();
=======
    if (member.isTeamLead) {
      return;
    }

    this.api.deactivateMember(member.id).subscribe({
      next: () => {
        this.loadMembers();
        this.removeInactiveUserFromActiveSelection(member.id);
        this.showSuccess('Team member deactivated.');
      },
      error: () => {
        this.members = this.members.map((m) =>
          m.id === member.id ? { ...m, isActive: false } : m
        );
        this.removeInactiveUserFromActiveSelection(member.id);
        this.syncTeamMembersToLocalStorage();
        this.showSuccess('Team member deactivated locally.');
      }
>>>>>>> backend-setup
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
