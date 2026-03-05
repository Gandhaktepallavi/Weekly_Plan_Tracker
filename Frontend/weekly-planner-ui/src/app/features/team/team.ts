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

  constructor(private api: PlannerApiService, private router: Router) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.api.getTeamMembers().subscribe((data: any) => {
      this.members = data;
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
      this.showSuccess();
    });
  }

  editName(member: TeamMember) {
    const updated = prompt('Edit name:', member.name);
    if (!updated) return;

    const updatedMember = { ...member, name: updated };

    this.api.updateMember(updatedMember).subscribe(() => {
      this.loadMembers();
    });
  }

  makeLead(member: TeamMember) {
    this.api.makeLead(member.id).subscribe(() => {
      this.loadMembers();
    });
  }

  deactivate(member: TeamMember) {
    this.api.deactivateMember(member.id).subscribe(() => {
      this.loadMembers();
    });
  }

  showSuccess() {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000);
  }

  get activeMembers() {
    return this.members.filter(m => m.isActive);
  }
}