import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class ReviewComponent implements OnInit {

  planning: any;
  totalHours: number = 0;

  categorySummary: any[] = [];
  memberSummary: any[] = [];

  errors: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('activePlanning');
    if (!stored) {
      this.router.navigate(['/home']);
      return;
    }

    this.planning = JSON.parse(stored);

    this.totalHours = this.planning.selectedMembers.length * 30;

    this.calculateCategories();
    this.calculateMembers();
    this.validateFreeze();
  }

  calculateCategories() {
    const categories = [
      { name: 'Client Focused', percent: this.planning.clientPercent },
      { name: 'Tech Debt', percent: this.planning.techDebtPercent },
      { name: 'R&D', percent: this.planning.rndPercent }
    ];

    this.categorySummary = categories.map(c => {
      const budget = Math.round((c.percent / 100) * this.totalHours);
      const planned = 0; // No detailed planning yet

      return {
        name: c.name,
        budget,
        planned,
        diff: planned - budget
      };
    });
  }

  calculateMembers() {
    this.memberSummary = this.planning.selectedMembers.map((id: string) => {
      return {
        name: this.getMemberName(id),
        planned: 0,
        target: 30
      };
    });
  }

  getMemberName(id: string): string {
    const members = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const member = members.find((m: any) => m.id === id);
    return member ? member.name : '';
  }

  validateFreeze() {
    this.errors = [];

    // Member validation
    this.memberSummary.forEach(m => {
      if (m.planned !== m.target) {
        this.errors.push(`${m.name} has ${m.planned} hours (needs ${m.target} more).`);
      }
    });

    // Category validation
    this.categorySummary.forEach(c => {
      if (c.planned !== c.budget) {
        this.errors.push(`${c.name} has ${c.planned}h planned but budget is ${c.budget}h.`);
      }
    });
  }

  freezePlan() {
    if (this.errors.length > 0) return;

    const updated = { ...this.planning, frozen: true };
    localStorage.setItem('activePlanning', JSON.stringify(updated));

    alert('Plan Frozen Successfully!');
  }

  cancelPlanning() {
    localStorage.removeItem('activePlanning');
    this.router.navigate(['/home']);
  }
}