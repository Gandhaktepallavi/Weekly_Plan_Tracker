import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';        // important
import { PlannerApiService } from '../../../core/planner-api';
import { BacklogItem } from '../../../shared/models/backlog-item';

@Component({
  selector: 'app-backlog-list',
  imports: [CommonModule],
  templateUrl: './backlog-list.html',
  styleUrl: './backlog-list.css',
})
export class BacklogListComponent implements OnInit {
  backlogItems: BacklogItem[] = [];
  loading = true;

  constructor(private api: PlannerApiService) {}

  ngOnInit(): void {
    this.api.getBacklog().subscribe({
      next: (items) => {
        this.backlogItems = items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load backlog:', err);
        this.loading = false;
      }
    });
  }
}
