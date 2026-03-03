import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface TeamMember {
  id: string;
  name: string;
  isTeamLead: boolean;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.html',
  styleUrls: ['./planning.css']
})
export class PlanningComponent implements OnInit {

  constructor(private router: Router) {}
  planningDate: string = '';
  workPeriod: string = '';

  teamMembers: TeamMember[] = [];
  selectedMembers: string[] = [];

  clientPercent: number = 0;
  techDebtPercent: number = 0;
  rndPercent: number = 0;

  totalHours: number = 0;

  ngOnInit() {
    const stored = localStorage.getItem('teamMembers');
    if (stored) {
      this.teamMembers = JSON.parse(stored);
    }
  }

  // -------------------------
  // Date Logic
  // -------------------------
  onDateChange() {
    if (!this.planningDate) return;

    const selected = new Date(this.planningDate);
    const day = selected.getDay();

    // Must be Tuesday (2)
    if (day !== 2) {
      alert('Please pick a Tuesday');
      this.planningDate = '';
      this.workPeriod = '';
      return;
    }

    const start = new Date(selected);
    start.setDate(start.getDate() + 1); // Wednesday

    const end = new Date(selected);
    end.setDate(end.getDate() + 6); // Monday

    this.workPeriod =
      `${start.toISOString().split('T')[0]} to ${end.toISOString().split('T')[0]}`;
  }

  // -------------------------
  // Team Selection
  // -------------------------
  toggleMember(id: string) {
    if (this.selectedMembers.includes(id)) {
      this.selectedMembers = this.selectedMembers.filter(m => m !== id);
    } else {
      this.selectedMembers.push(id);
    }

    this.calculateTotalHours();
  }

  calculateTotalHours() {
    // Example: 30 hours per member
    this.totalHours = this.selectedMembers.length * 30;
  }

  // -------------------------
  // Percentage Validation
  // -------------------------
  get totalPercent(): number {
    return this.clientPercent + this.techDebtPercent + this.rndPercent;
  }

  get isValid(): boolean {
    return this.totalPercent === 100
      && this.selectedMembers.length > 0
      && !!this.planningDate;
  }

 openPlanning() {
  if (!this.isValid) return;

  const planningData = {
    planningDate: this.planningDate,
    workPeriod: this.workPeriod,
    selectedMembers: this.selectedMembers,
    clientPercent: this.clientPercent,
    techDebtPercent: this.techDebtPercent,
    rndPercent: this.rndPercent,
    isOpen: true
  };

  localStorage.setItem('activePlanning', JSON.stringify(planningData));

this.router.navigate(['/dashboard']);}
}