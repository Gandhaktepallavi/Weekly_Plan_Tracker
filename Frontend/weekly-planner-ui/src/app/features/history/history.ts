import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';

interface PastWeek {
  id: string;
  weekStart: string;
  isFrozen: boolean;
  totalHours: number;
  teamMembersCount: number;
  taskCount: number;
  totalPlannedHours: number;
  totalCompletedHours: number;
  progressPercent: number;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnInit {
  isLoading = true;
  pastWeeks: PastWeek[] = [];

  constructor(private api: PlannerApiService) {}

  ngOnInit(): void {
    this.api.getPastWeeks().subscribe({
      next: (data) => {
        this.pastWeeks = data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.pastWeeks = [];
        this.isLoading = false;
      }
    });
  }
}
