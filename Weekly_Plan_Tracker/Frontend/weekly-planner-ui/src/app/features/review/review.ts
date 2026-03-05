import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

interface CategorySummary {
  name: string;
  budget: number;
  planned: number;
  diff: number;
}

interface MemberSummary {
  memberId: string;
  name: string;
  planned: number;
  target: number;
  progress: number;
}

interface TaskInfo {
  id: string;
  backlogTitle: string;
  category: string;
  assignedHours: number;
  progressPercent: number;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class ReviewComponent implements OnInit {

  // Plan info
  planning: any = null;
  totalHours: number = 0;
  
  // Summaries
  categorySummary: CategorySummary[] = [];
  memberSummary: MemberSummary[] = [];
  
  // Tasks grouped by member for display
  memberTasks: Map<string, TaskInfo[]> = new Map();
  
  // Errors and states
  errors: string[] = [];
  isFrozen: boolean = false;
  loading: boolean = false;

  constructor(
    public router: Router,
    private api: PlannerApiService
  ) {}

  ngOnInit() {
    this.loadPlanData();
  }

  loadPlanData() {
    this.loading = true;
    this.api.getDashboard().subscribe({
      next: (data) => {
        if (!data || !data.hasActivePlan) {
          this.router.navigate(['/home']);
          return;
        }

        this.planning = {
          planningDate: data.weekStart,
          workPeriod: `${data.weekStart} to ${data.weekEnd}`,
          clientPercent: data.clientPercent,
          techDebtPercent: data.techDebtPercent,
          rndPercent: data.rndPercent,
          selectedMembers: data.members?.map((m: any) => m.memberId) || []
        };

        this.isFrozen = data.isFrozen;
        this.totalHours = this.planning.selectedMembers.length * 30;

        // Build category summary
        this.calculateCategories(data.categories || []);
        
        // Build member summary
        this.calculateMembers(data.members || []);
        
        // Store tasks for display
        if (data.tasks) {
          this.storeTasks(data.tasks);
        }

        this.validateFreeze();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading plan data:', err);
        this.router.navigate(['/home']);
      }
    });
  }

  calculateCategories(categories: any[]) {
    const categoriesList = [
      { name: 'Client Focused', percent: this.planning.clientPercent || 0 },
      { name: 'Tech Debt', percent: this.planning.techDebtPercent || 0 },
      { name: 'R&D', percent: this.planning.rndPercent || 0 }
    ];

    this.categorySummary = categoriesList.map(c => {
      const budget = Math.round((c.percent / 100) * this.totalHours);
      const catData = categories.find((cat: any) => 
        cat.category?.toLowerCase() === c.name.toLowerCase().replace(' ', '').replace('&', '').toLowerCase()
      );
      const planned = catData?.totalHours || 0;

      return {
        name: c.name,
        budget,
        planned,
        diff: planned - budget
      };
    });
  }

  calculateMembers(members: any[]) {
    this.memberSummary = members.map((m: any) => ({
      memberId: m.memberId,
      name: m.memberName || 'Unknown',
      planned: m.totalHours || 0,
      target: 30,
      progress: m.avgProgress || 0
    }));
  }

  storeTasks(tasks: any[]) {
    this.memberTasks.clear();
    tasks.forEach((task: any) => {
      const memberId = task.memberId;
      if (!this.memberTasks.has(memberId)) {
        this.memberTasks.set(memberId, []);
      }
      this.memberTasks.get(memberId)!.push({
        id: task.id,
        backlogTitle: task.backlogTitle || 'Unknown',
        category: task.category || 'Unknown',
        assignedHours: task.assignedHours || 0,
        progressPercent: task.progressPercent || 0
      });
    });
  }

  getMemberName(memberId: string): string {
    const member = this.memberSummary.find(m => m.memberId === memberId);
    return member?.name || 'Unknown';
  }

  getTasksForMember(memberId: string): TaskInfo[] {
    return this.memberTasks.get(memberId) || [];
  }

  validateFreeze() {
    this.errors = [];

    // Member validation - must have exactly 30 hours
    this.memberSummary.forEach(m => {
      if (m.planned !== m.target) {
        this.errors.push(`${m.name} has ${m.planned} hours (needs ${m.target - m.planned} more).`);
      }
    });

    // Category validation - must match percentages
    this.categorySummary.forEach(c => {
      if (c.planned !== c.budget) {
        this.errors.push(`${c.name} has ${c.planned}h planned but budget is ${c.budget}h.`);
      }
    });
  }

  updateProgress(taskId: string, newProgress: number) {
    this.api.updateProgress(taskId, newProgress).subscribe({
      next: () => {
        // Update local state
        this.memberTasks.forEach(tasks => {
          const task = tasks.find(t => t.id === taskId);
          if (task) {
            task.progressPercent = newProgress;
          }
        });
        
        // Recalculate member progress
        this.recalculateMemberProgress();
      },
      error: (err) => {
        console.error('Error updating progress:', err);
        alert('Error updating progress');
      }
    });
  }

  recalculateMemberProgress() {
    this.memberSummary.forEach(member => {
      const tasks = this.memberTasks.get(member.memberId) || [];
      if (tasks.length > 0) {
        const totalProgress = tasks.reduce((sum, t) => sum + t.progressPercent, 0);
        member.progress = Math.round(totalProgress / tasks.length);
      }
    });
  }

  freezePlan() {
    if (this.errors.length > 0) return;

    this.loading = true;
    const planId = this.planning?.id || this.planning?.planId;
    
    if (planId) {
      this.api.freezePlan(planId).subscribe({
        next: () => {
          this.isFrozen = true;
          this.loading = false;
          alert('Plan Frozen Successfully!');
        },
        error: (err) => {
          console.error('Error freezing plan:', err);
          this.loading = false;
          alert('Error freezing plan');
        }
      });
    }
  }

  unfreezePlan() {
    this.loading = true;
    const planId = this.planning?.id || this.planning?.planId;
    
    if (planId) {
      this.api.unfreezePlan(planId).subscribe({
        next: () => {
          this.isFrozen = false;
          this.loading = false;
          alert('Plan unfrozen successfully!');
        },
        error: (err) => {
          console.error('Error unfreezing plan:', err);
          this.loading = false;
          alert('Error unfreezing plan');
        }
      });
    }
  }

  cancelPlanning() {
    if (confirm('Are you sure you want to cancel this week\'s planning?')) {
      const planId = this.planning?.id || this.planning?.planId;
      
      if (planId) {
        this.api.deletePlan(planId).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error canceling plan:', err);
            this.router.navigate(['/home']);
          }
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}

