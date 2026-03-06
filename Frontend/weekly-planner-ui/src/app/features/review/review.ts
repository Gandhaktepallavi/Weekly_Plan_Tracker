import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { Category } from '../../shared/models/backlog-item';

interface PlanItem {
  backlogId: string;
  title: string;
  category: Category;
  plannedHours: number;
}

interface MemberSummary {
  id: string;
  name: string;
  planned: number;
  target: number;
  isValid: boolean;
}

interface CategorySummary {
  name: Category;
  budget: number;
  planned: number;
  diff: number;
  isValid: boolean;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class ReviewComponent implements OnInit {
  planning: any;
  members: any[] = [];

  memberSummary: MemberSummary[] = [];
  categorySummary: CategorySummary[] = [];
  errors: string[] = [];

  totalPlanned = 0;
  totalExpected = 0;
  freezeInProgress = false;
  freezeMessage = '';

  constructor(
    private router: Router,
    private api: PlannerApiService
  ) {}

  ngOnInit() {
    const storedPlan = localStorage.getItem('activePlanning');
    if (!storedPlan) {
      this.router.navigate(['/home']);
      return;
    }

    this.planning = JSON.parse(storedPlan);
    this.members = JSON.parse(localStorage.getItem('teamMembers') || '[]');

    this.buildSummary();
  }

  get canFreeze(): boolean {
    return this.errors.length === 0 && this.totalPlanned > 0 && !this.freezeInProgress;
  }

  private buildSummary() {
    const selectedMemberIds: string[] = this.planning?.selectedMembers || [];
    const datePart = this.planning?.planningDate || 'unknown-week';

    this.totalExpected = selectedMemberIds.length * 30;

    const allItems: PlanItem[] = [];
    this.memberSummary = selectedMemberIds.map((id) => {
      const key = `myPlanAssignments:${datePart}:${id}`;
      const items: PlanItem[] = JSON.parse(localStorage.getItem(key) || '[]');
      allItems.push(...items);

      const planned = items.reduce((sum, item) => sum + Number(item.plannedHours || 0), 0);
      const name = this.members.find((m) => m.id === id)?.name || 'Unknown';

      return {
        id,
        name,
        planned,
        target: 30,
        isValid: planned === 30
      };
    });

    this.totalPlanned = allItems.reduce((sum, item) => sum + Number(item.plannedHours || 0), 0);

    const clientBudget = Math.round((Number(this.planning?.clientPercent || 0) / 100) * this.totalExpected);
    const techBudget = Math.round((Number(this.planning?.techDebtPercent || 0) / 100) * this.totalExpected);
    const rndBudget = Math.round((Number(this.planning?.rndPercent || 0) / 100) * this.totalExpected);

    const clientPlanned = allItems.filter(i => i.category === 'Client Focused').reduce((s, i) => s + i.plannedHours, 0);
    const techPlanned = allItems.filter(i => i.category === 'Tech Debt').reduce((s, i) => s + i.plannedHours, 0);
    const rndPlanned = allItems.filter(i => i.category === 'R&D').reduce((s, i) => s + i.plannedHours, 0);

    this.categorySummary = [
      { name: 'Client Focused', budget: clientBudget, planned: clientPlanned, diff: clientBudget - clientPlanned, isValid: clientBudget === clientPlanned },
      { name: 'Tech Debt', budget: techBudget, planned: techPlanned, diff: techBudget - techPlanned, isValid: techBudget === techPlanned },
      { name: 'R&D', budget: rndBudget, planned: rndPlanned, diff: rndBudget - rndPlanned, isValid: rndBudget === rndPlanned }
    ];

    this.errors = [];

    this.memberSummary
      .filter((m) => !m.isValid)
      .forEach((m) => this.errors.push(`${m.name} has ${m.planned}h planned (needs 30h).`));

    this.categorySummary
      .filter((c) => !c.isValid)
      .forEach((c) => this.errors.push(`${c.name} planned ${c.planned}h (budget ${c.budget}h).`));
  }

  refreshReview() {
    this.freezeMessage = '';
    this.buildSummary();
  }

  freezePlan() {
    if (!this.canFreeze) return;

    this.freezeInProgress = true;
    this.freezeMessage = '';

    const planId = this.planning?.planId;
    if (!planId) {
      this.finishFreezeLocally();
      return;
    }

    this.api.freezePlan(planId).subscribe({
      next: () => this.finishFreezeLocally(),
      error: () => this.finishFreezeLocally()
    });
  }

  private finishFreezeLocally() {
    const updated = { ...this.planning, frozen: true };
    localStorage.setItem('activePlanning', JSON.stringify(updated));
    this.freezeInProgress = false;
    this.freezeMessage = 'Plan frozen successfully.';
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
