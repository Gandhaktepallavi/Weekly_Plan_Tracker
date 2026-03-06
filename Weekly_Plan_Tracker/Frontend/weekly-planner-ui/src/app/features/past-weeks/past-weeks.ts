import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

interface PastWeekSummary {
  id: string;
  weekStart: string;
  weekEnd: string;
  isFrozen: boolean;
  clientPercent: number;
  techDebtPercent: number;
  rndPercent: number;
  memberCount: number;
  totalTasks: number;
  avgProgress: number;
}

interface TaskRow {
  memberName: string;
  backlogTitle: string;
  category: string;
  assignedHours: number;
  progressPercent: number;
}

@Component({
  selector: 'app-past-weeks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-weeks.html',
  styleUrls: ['./past-weeks.css']
})
export class PastWeeksComponent implements OnInit {
  loading = false;
  pastWeeks: PastWeekSummary[] = [];
  selectedWeek: PastWeekSummary | null = null;
  selectedWeekTasks: TaskRow[] = [];
  detailsLoading = false;

  constructor(
    private api: PlannerApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPastWeeks();
  }

  loadPastWeeks() {
    this.loading = true;
    this.api.getPastWeeks().subscribe({
      next: (weeks: PastWeekSummary[]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.pastWeeks = (weeks || []).filter(week => {
          const weekEnd = new Date(week.weekEnd);
          return weekEnd < today || week.isFrozen;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading past weeks:', err);
        this.loading = false;
      }
    });
  }

  viewDetails(week: PastWeekSummary) {
    this.selectedWeek = week;
    this.detailsLoading = true;
    this.selectedWeekTasks = [];

    this.api.getTasksByPlan(week.id).subscribe({
      next: (tasks: any[]) => {
        this.selectedWeekTasks = (tasks || []).map(task => ({
          memberName: task.teamMember?.name || 'Unknown',
          backlogTitle: task.backlogItem?.title || 'Unknown',
          category: task.backlogItem?.category || 'Unknown',
          assignedHours: task.assignedHours || 0,
          progressPercent: task.progressPercent || 0
        }));
        this.detailsLoading = false;
      },
      error: (err) => {
        console.error('Error loading week details:', err);
        this.detailsLoading = false;
      }
    });
  }

  closeDetails() {
    this.selectedWeek = null;
    this.selectedWeekTasks = [];
  }

  trackByWeekId(_: number, week: PastWeekSummary): string {
    return week.id;
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
