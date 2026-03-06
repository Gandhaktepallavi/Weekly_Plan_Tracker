import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

interface TeamMember {
  id: string;
  name: string;
  isLead: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.html',
  styleUrls: ['./team.css']
})
export class TeamComponent implements OnInit {

  members: TeamMember[] = [];
  name = '';
  showToast = false;
  loading = false;

  constructor(private api: PlannerApiService, private router: Router) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.api.getTeamMembers().subscribe({
      next: (data: any) => {
        this.members = data.map((m: any) => ({
          id: m.id,
          name: m.name,
          isLead: m.isLead,
          isActive: m.isActive
        }));
      },
      error: (err) => console.error('Error loading members:', err)
    });
  }

  addMember() {
    if (!this.name.trim()) return;

    const member = {
      name: this.name.trim(),
      isLead: this.members.length === 0, // First member becomes lead
      isActive: true
    };

    this.api.addTeamMember(member).subscribe({
      next: () => {
        this.loadMembers();
        this.name = '';
        this.showSuccess();
      },
      error: (err) => console.error('Error adding member:', err)
    });
  }

  editName(member: TeamMember) {
    const updated = prompt('Edit name:', member.name);
    if (!updated || updated === member.name) return;

    const updatedMember = { ...member, name: updated };

    this.api.updateTeamMember(updatedMember).subscribe({
      next: () => {
        this.loadMembers();
      },
      error: (err) => console.error('Error updating member:', err)
    });
  }

  makeLead(member: TeamMember) {
    if (member.isLead) return;
    
    this.api.makeLead(member.id).subscribe({
      next: () => {
        this.loadMembers();
      },
      error: (err) => console.error('Error making lead:', err)
    });
  }

  deactivate(member: TeamMember) {
    if (confirm(`Are you sure you want to deactivate ${member.name}?`)) {
      this.api.deactivateMember(member.id).subscribe({
        next: () => {
          this.loadMembers();
        },
        error: (err) => console.error('Error deactivating member:', err)
      });
    }
  }

  activate(member: TeamMember) {
    this.api.activateMember(member.id).subscribe({
      next: () => {
        this.loadMembers();
      },
      error: (err) => console.error('Error activating member:', err)
    });
  }

  deleteMember(member: TeamMember) {
    if (confirm(`Are you sure you want to delete ${member.name}? This action cannot be undone.`)) {
      this.api.deleteMember(member.id).subscribe({
        next: () => {
          this.loadMembers();
        },
        error: (err) => console.error('Error deleting member:', err)
      });
    }
  }

  showSuccess() {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000);
  }

  get activeMembers() {
    return this.members.filter(m => m.isActive);
  }

  get inactiveMembers() {
    return this.members.filter(m => !m.isActive);
  }
}

