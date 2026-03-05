import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { BacklogItem } from '../../shared/models/backlog-item';

interface TeamMember {
  id: string;
  name: string;
  isTeamLead: boolean;
}

interface TaskSelection {
  backlogItemId: string;
  backlogTitle: string;
  category: string;
  hours: number;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.html',
  styleUrls: ['./planning.css'],
})
export class PlanningComponent implements OnInit {
  constructor(
    private router: Router,
    private api: PlannerApiService
  ) {}

  // Date and period
  planningDate: string = '';
  workPeriod: string = '';
  
  // Team
  teamMembers: TeamMember[] = [];
  selectedMembers: string[] = [];
  
  // Category percentages
  clientPercent: number = 0;
  techDebtPercent: number = 0;
  rndPercent: number = 0;
  
  // Calculated values
  totalHours: number = 0;
  
  // Backlog for selection
  backlogItems: BacklogItem[] = [];
  
  // Task assignments per member
  memberTasks: Map<string, TaskSelection[]> = new Map();
  
  // Current active plan
  currentPlanId: string = '';
  isPlanCreated: boolean = false;
  
  // Loading states
  loading: boolean = false;
  error: string = '';

  ngOnInit() {
    this.loadTeamMembers();
    this.loadBacklog();
    this.checkExistingPlan();
  }

  loadTeamMembers() {
    this.api.getTeamMembers().subscribe({
      next: (members: any) => {
        this.teamMembers = members.map((m: any) => ({
          id: m.id,
          name: m.name,
          isTeamLead: m.isLead
        }));
      },
      error: (err) => console.error('Error loading team members:', err)
    });
  }

  loadBacklog() {
    this.api.getBacklog().subscribe({
      next: (items) => {
        this.backlogItems = items;
      },
      error: (err) => console.error('Error loading backlog:', err)
    });
  }

  checkExistingPlan() {
    this.api.getCurrentWeeklyPlan().subscribe({
      next: (plan: any) => {
        if (plan && plan.id) {
          this.currentPlanId = plan.id;
          this.isPlanCreated = true;
          this.planningDate = plan.weekStart;
          this.workPeriod = `${plan.weekStart} to ${plan.weekEnd}`;
          this.clientPercent = plan.clientPercent || 0;
          this.techDebtPercent = plan.techDebtPercent || 0;
          this.rndPercent = plan.rndPercent || 0;
          this.selectedMembers = plan.selectedMemberIds || [];
          
          // Load existing tasks
          this.loadExistingTasks();
        }
      },
      error: (err) => console.error('Error checking plan:', err)
    });
  }

  loadExistingTasks() {
    if (!this.currentPlanId) return;
    
    this.api.getTasksByPlan(this.currentPlanId).subscribe({
      next: (tasks: any) => {
        this.memberTasks.clear();
        tasks.forEach((task: any) => {
          const memberId = task.teamMemberId;
          if (!this.memberTasks.has(memberId)) {
            this.memberTasks.set(memberId, []);
          }
          this.memberTasks.get(memberId)!.push({
            backlogItemId: task.backlogItemId,
            backlogTitle: task.backlogItem?.title || '',
            category: task.backlogItem?.category || '',
            hours: task.assignedHours
          });
        });
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  // Date Logic
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

  // Team Selection
  toggleMember(id: string) {
    if (this.selectedMembers.includes(id)) {
      this.selectedMembers = this.selectedMembers.filter((m) => m !== id);
      this.memberTasks.delete(id);
    } else {
      this.selectedMembers.push(id);
      this.memberTasks.set(id, []);
    }

    this.calculateTotalHours();
  }

  calculateTotalHours() {
    this.totalHours = this.selectedMembers.length * 30;
  }

  getMemberHours(memberId: string): number {
    const tasks = this.memberTasks.get(memberId) || [];
    return tasks.reduce((sum, t) => sum + t.hours, 0);
  }

  // Get available backlog items (not assigned to anyone)
  getAvailableBacklogItems(memberId: string): BacklogItem[] {
    const assignedIds = new Set<string>();
    this.memberTasks.forEach((tasks) => {
      tasks.forEach((t) => assignedIds.add(t.backlogItemId));
    });
    
    return this.backlogItems.filter(item => !assignedIds.has(item.id));
  }

  // Add task to member
  addTaskToMember(memberId: string, backlogItem: BacklogItem, hours: number) {
    if (!backlogItem || hours <= 0) return;
    
    const currentHours = this.getMemberHours(memberId);
    if (currentHours + hours > 30) {
      alert(`Cannot add more than 30 hours. Current: ${currentHours}h`);
      return;
    }

    const tasks = this.memberTasks.get(memberId) || [];
    tasks.push({
      backlogItemId: backlogItem.id,
      backlogTitle: backlogItem.title,
      category: backlogItem.category,
      hours: hours
    });
    this.memberTasks.set(memberId, tasks);
  }

  // Remove task from member
  removeTaskFromMember(memberId: string, index: number) {
    const tasks = this.memberTasks.get(memberId);
    if (tasks) {
      tasks.splice(index, 1);
      this.memberTasks.set(memberId, tasks);
    }
  }

  // Validate percentages
  get totalPercent(): number {
    return this.clientPercent + this.techDebtPercent + this.rndPercent;
  }

  get isValid(): boolean {
    return this.totalPercent === 100 && this.selectedMembers.length > 0 && !!this.planningDate;
  }

  // Create or update weekly plan
  openPlanning() {
    if (!this.isValid) return;

    this.loading = true;
    this.error = '';

    const planData = {
      weekStart: this.planningDate,
      clientPercent: this.clientPercent,
      techDebtPercent: this.techDebtPercent,
      rndPercent: this.rndPercent,
      selectedMemberIds: this.selectedMembers,
      isFrozen: false
    };

    if (this.isPlanCreated) {
      this.api.updateWeeklyPlan(this.currentPlanId, planData).subscribe({
        next: () => {
          this.loading = false;
          this.saveAllTasks();
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error updating plan';
          console.error(err);
        }
      });
    } else {
      this.api.createWeeklyPlan(planData).subscribe({
        next: (plan: any) => {
          this.currentPlanId = plan.id;
          this.isPlanCreated = true;
          this.loading = false;
          this.saveAllTasks();
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error creating plan';
          console.error(err);
        }
      });
    }
  }

  saveAllTasks() {
    this.selectedMembers.forEach(memberId => {
      const tasks = this.memberTasks.get(memberId) || [];
      tasks.forEach(task => {
        this.api.assignTask({
          teamMemberId: memberId,
          backlogItemId: task.backlogItemId,
          weeklyPlanId: this.currentPlanId,
          assignedHours: task.hours,
          progressPercent: 0
        }).subscribe({
          next: () => console.log('Task assigned'),
          error: (err) => console.error('Error assigning task:', err)
        });
      });
    });

    alert('Plan saved successfully!');
    this.router.navigate(['/dashboard']);
  }

  // Check if planning is complete for all members
  get isPlanningComplete(): boolean {
    return this.selectedMembers.every(id => this.getMemberHours(id) === 30);
  }

  // Get hours remaining for a member
  getRemainingHours(memberId: string): number {
    return 30 - this.getMemberHours(memberId);
  }

  // Handle task selection from dropdown
  selectedBacklogItem: Map<string, string> = new Map();

  onTaskSelected(event: Event, memberId: string) {
    const select = event.target as HTMLSelectElement;
    this.selectedBacklogItem.set(memberId, select.value);
  }

  addTaskFromSelect(memberId: string, hoursStr: string) {
    const backlogItemId = this.selectedBacklogItem.get(memberId);
    if (!backlogItemId) {
      alert('Please select a backlog item');
      return;
    }

    const hours = parseInt(hoursStr, 10);
    if (isNaN(hours) || hours <= 0) {
      alert('Please enter valid hours');
      return;
    }

    const backlogItem = this.backlogItems.find(item => item.id === backlogItemId);
    if (backlogItem) {
      this.addTaskToMember(memberId, backlogItem, hours);
      this.selectedBacklogItem.delete(memberId);
    }
  }
}

