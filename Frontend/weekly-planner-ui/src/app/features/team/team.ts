import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('teamMembers');
    if (stored) {
      this.members = JSON.parse(stored);
    }
  }

  save() {
    localStorage.setItem('teamMembers', JSON.stringify(this.members));
  }

  addMember() {
    if (!this.name.trim()) return;

    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: this.name.trim(),
      isLead: this.members.length === 0,
      isActive: true
    };

    this.members.push(newMember);
    this.save();

    this.name = '';
    this.showSuccess();
  }

  editName(member: TeamMember) {
    const updated = prompt('Edit name:', member.name);
    if (updated) {
      member.name = updated;
      this.save();
    }
  }

  makeLead(member: TeamMember) {
    this.members.forEach(m => m.isLead = false);
    member.isLead = true;
    this.save();
  }

  deactivate(member: TeamMember) {
    member.isActive = false;
    this.save();
  }

  showSuccess() {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000);
  }

  get activeMembers() {
    return this.members.filter(m => m.isActive);
  }
}