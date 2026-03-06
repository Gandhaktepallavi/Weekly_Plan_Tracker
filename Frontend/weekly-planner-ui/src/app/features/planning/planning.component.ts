import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

interface TeamMember {
  id: string;
  name: string;
  isTeamLead: boolean;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './planning.html',
  styleUrls: ['./planning.css'],
})
export class PlanningComponent implements OnInit {
  constructor(
    private router: Router,
    private api: PlannerApiService
  ) {}
  planningDate: string = '';
  workPeriod: string = '';

  teamMembers: TeamMember[] = [];
  selectedMembers: string[] = [];

  clientPercent: number = 0;
  techDebtPercent: number = 0;
  rndPercent: number = 0;

  totalHours: number = 0;
  validationError = '';
  isCurrentUserLead = false;

  ngOnInit() {
    const activeUserRaw = localStorage.getItem('activeUser');
    const activeUser = activeUserRaw ? JSON.parse(activeUserRaw) : null;
    this.isCurrentUserLead = !!activeUser?.isTeamLead;

    if (!this.isCurrentUserLead) {
      this.validationError = 'Only Team Lead can set the weekly plan.';
      this.router.navigate(['/home']);
      return;
    }

    this.api.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members ?? [];
        localStorage.setItem('teamMembers', JSON.stringify(this.teamMembers));
      },
      error: () => {
        const stored = localStorage.getItem('teamMembers');
        if (stored) {
          this.teamMembers = JSON.parse(stored);
        }
      }
    });
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

    this.workPeriod = `${start.toISOString().split('T')[0]} to ${end.toISOString().split('T')[0]}`;
  }

  // -------------------------
  // Team Selection
  // -------------------------
  toggleMember(id: string) {
    if (this.selectedMembers.includes(id)) {
      this.selectedMembers = this.selectedMembers.filter((m) => m !== id);
    } else {
      this.selectedMembers.push(id);
    }

    this.calculateTotalHours();
  }

  calculateTotalHours() {
    // Example: 30 hours per member
    this.totalHours = this.selectedMembers.length * 30;
  }
  assignTask(backlogId: string, memberId: string) {
    const task = {
      teamMemberId: memberId,
      backlogItemId: backlogId,
      plannedHours: 5,
    };

    this.api.assignTask(task).subscribe(() => {
      alert('Task Assigned');
    });
  }
  // -------------------------
  // Percentage Validation
  // -------------------------
  get totalPercent(): number {
    return this.clientPercent + this.techDebtPercent + this.rndPercent;
  }

  get isValid(): boolean {
    return this.isCurrentUserLead && this.totalPercent === 100 && this.selectedMembers.length > 0 && !!this.planningDate;
  }

  private persistAndGoToDashboard(planId?: string) {
    const planningData = {
      planningDate: this.planningDate,
      workPeriod: this.workPeriod,
      selectedMembers: this.selectedMembers,
      clientPercent: this.clientPercent,
      techDebtPercent: this.techDebtPercent,
      rndPercent: this.rndPercent,
      isOpen: true,
      planId: planId ?? null
    };

    localStorage.setItem('activePlanning', JSON.stringify(planningData));
    this.router.navigate(['/dashboard']);
  }

  openPlanning() {
    this.validationError = '';
    if (!this.isCurrentUserLead) {
      this.validationError = 'Only Team Lead can set the weekly plan.';
      return;
    }
    if (!this.isValid) {
      this.validationError = 'Please pick Tuesday, choose members, and make percentages total 100%.';
      return;
    }

    const activeUserRaw = localStorage.getItem('activeUser');
    const activeUser = activeUserRaw ? JSON.parse(activeUserRaw) : null;
    const lead = this.teamMembers.find(m => m.isTeamLead);

    const request = {
      planningDate: this.planningDate,
      selectedMemberIds: this.selectedMembers,
      clientPercent: this.clientPercent,
      techDebtPercent: this.techDebtPercent,
      rnDPercent: this.rndPercent,
      leadUserId: activeUser?.id ?? lead?.id,
      leadUserName: activeUser?.name ?? lead?.name
    };

    this.api.openPlanningCycle(request).subscribe({
      next: (result) => {
        this.persistAndGoToDashboard(result?.id);
      },
      error: (error) => {
        const message = String(error?.error || '');
        this.validationError = message || 'Unable to open planning. Please try again.';
      }
    });
  }
}
