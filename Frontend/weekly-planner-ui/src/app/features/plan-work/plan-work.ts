import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { BacklogItem, Category } from '../../shared/models/backlog-item';

interface PlanItem {
  backlogId: string;
  title: string;
  category: Category;
  plannedHours: number;
}

interface CategoryCard {
  name: Category;
  budget: number;
  claimed: number;
  left: number;
  className: string;
}

@Component({
  selector: 'app-plan-work',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './plan-work.html',
  styleUrls: ['./plan-work.css']
})
export class PlanWorkComponent implements OnInit {
  planning: any;
  backlog: BacklogItem[] = [];
  myPlan: PlanItem[] = [];
  categoryCards: CategoryCard[] = [];

  readonly maxHours = 30;
  usedHours = 0;
  leftHours = 30;

  showToast = true;
  showPicker = false;
  errorMessage = '';

  selectedBacklogId = '';
  plannedHoursInput = 1;

  activeUserId = 'guest';

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

    const activeUserRaw = localStorage.getItem('activeUser');
    if (activeUserRaw) {
      const user = JSON.parse(activeUserRaw);
      this.activeUserId = user?.id || 'guest';
    }

    this.loadBacklog();
    this.loadMyPlan();
    this.recalculate();
  }

  private get storageKey(): string {
    const datePart = this.planning?.planningDate || 'unknown-week';
    return `myPlanAssignments:${datePart}:${this.activeUserId}`;
  }

  loadBacklog() {
    this.api.getBacklog().subscribe({
      next: (items) => {
        this.backlog = items || [];
      },
      error: () => {
        this.backlog = [];
      }
    });
  }

  loadMyPlan() {
    const stored = localStorage.getItem(this.storageKey);
    this.myPlan = stored ? JSON.parse(stored) : [];
  }

  saveMyPlan() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.myPlan));
  }

  recalculate() {
    this.usedHours = this.myPlan.reduce((sum, item) => sum + item.plannedHours, 0);
    this.leftHours = Math.max(0, this.maxHours - this.usedHours);

    const clientBudget = Math.round((Number(this.planning?.clientPercent || 0) / 100) * this.maxHours);
    const techBudget = Math.round((Number(this.planning?.techDebtPercent || 0) / 100) * this.maxHours);
    const rndBudget = Math.round((Number(this.planning?.rndPercent || 0) / 100) * this.maxHours);

    const clientClaimed = this.claimedByCategory('Client Focused');
    const techClaimed = this.claimedByCategory('Tech Debt');
    const rndClaimed = this.claimedByCategory('R&D');

    this.categoryCards = [
      { name: 'Client Focused', budget: clientBudget, claimed: clientClaimed, left: Math.max(0, clientBudget - clientClaimed), className: 'client' },
      { name: 'Tech Debt', budget: techBudget, claimed: techClaimed, left: Math.max(0, techBudget - techClaimed), className: 'tech' },
      { name: 'R&D', budget: rndBudget, claimed: rndClaimed, left: Math.max(0, rndBudget - rndClaimed), className: 'rnd' }
    ];
  }

  claimedByCategory(category: Category): number {
    return this.myPlan
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.plannedHours, 0);
  }

  progressWidth(card: CategoryCard): number {
    if (card.budget <= 0) return 0;
    return Math.min(100, Math.round((card.claimed / card.budget) * 100));
  }

  togglePicker() {
    this.errorMessage = '';
    this.showPicker = !this.showPicker;

    if (this.showPicker && this.backlog.length > 0) {
      this.selectedBacklogId = this.backlog[0].id;
      this.plannedHoursInput = 1;
    }
  }

  addSelectedWork() {
    this.errorMessage = '';

    const selected = this.backlog.find((b) => b.id === this.selectedBacklogId);
    if (!selected) {
      this.errorMessage = 'Pick a backlog item first.';
      return;
    }

    const hours = Number(this.plannedHoursInput);
    if (!Number.isFinite(hours) || hours <= 0) {
      this.errorMessage = 'Hours must be greater than 0.';
      return;
    }

    if (this.usedHours + hours > this.maxHours) {
      this.errorMessage = 'You cannot plan more than 30 hours.';
      return;
    }

    this.myPlan.push({
      backlogId: selected.id,
      title: selected.title,
      category: selected.category,
      plannedHours: hours
    });

    this.saveMyPlan();
    this.recalculate();
    this.showPicker = false;
  }

  removeItem(index: number) {
    this.myPlan.splice(index, 1);
    this.saveMyPlan();
    this.recalculate();
  }

  donePlanning() {
    localStorage.setItem(
      'myPlanSummary',
      JSON.stringify({
        usedHours: this.usedHours,
        leftHours: this.leftHours
      })
    );
    this.router.navigate(['/dashboard']);
  }
}
