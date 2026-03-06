import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { BacklogItem } from '../../shared/models/backlog-item';
import { Category } from '../../shared/models/backlog-item';
import { BacklogListComponent } from './backlog-list/backlog-list';
import { BacklogCreateComponent } from './backlog-create/backlog-create';
import { BacklogEditComponent } from './backlog-edit/backlog-edit';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BacklogListComponent,
    BacklogCreateComponent,
    BacklogEditComponent
  ],
  templateUrl: './backlog.html',
  styleUrls: ['./backlog.css'],
})
export class BacklogComponent implements OnInit {

  backlog: BacklogItem[] = [];

  // filters
  selectedCategory: Category | 'All' = 'All';
  searchTerm = '';
  availableOnly = false;

  // form
  showForm = false;
  editingItem: BacklogItem | null = null;
  showToast = false;
  toastMessage = '';
  private readonly backlogStorageKey = 'backlogItems';

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadBacklog();
  }

  loadBacklog() {
    this.api.getBacklog().subscribe({
      next: (data) => {
        this.backlog = data ?? [];
        this.persistBacklogToLocal();
      },
      error: () => {
        this.backlog = this.loadBacklogFromLocal();
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.editingItem = null;
    }
  }

  addItem(newItem: { title: string; category: Category; estimatedHours: number }) {
    this.api.addBacklogItem(newItem).subscribe({
      next: () => {
        this.loadBacklog();
        this.showSuccess('Backlog item saved!');
      },
      error: () => {
        const localItem: BacklogItem = {
          id: crypto.randomUUID(),
          title: newItem.title,
          category: newItem.category,
          estimatedHours: Number(newItem.estimatedHours || 1),
          isAssigned: false
        };
        this.backlog = [localItem, ...this.backlog];
        this.persistBacklogToLocal();
        this.showSuccess('Backlog item saved locally.');
      }
    });

    this.showForm = false;
  }

  deleteItem(id: string) {
    this.api.deleteBacklogItem(id).subscribe({
      next: () => {
        this.loadBacklog();
        this.showSuccess('Backlog item deleted.');
      },
      error: () => {
        this.backlog = this.backlog.filter(item => item.id !== id);
        this.persistBacklogToLocal();
        this.showSuccess('Backlog item deleted locally.');
      }
    });
  }

  // Filtering Logic
  get filteredItems() {
    return this.backlog.filter(item => {

      if (this.selectedCategory !== 'All' &&
          item.category !== this.selectedCategory)
        return false;

      if (this.availableOnly && item.isAssigned)
        return false;

      if (this.searchTerm &&
          !item.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
        return false;

      return true;
    });
  }

  closeToast() {
    this.showToast = false;
  }

  openEdit(item: BacklogItem) {
    this.editingItem = item;
    this.showForm = false;
  }

  saveEdit(item: BacklogItem) {
    this.api.updateBacklogItem(item).subscribe({
      next: () => {
        this.editingItem = null;
        this.loadBacklog();
        this.showSuccess('Backlog item updated.');
      },
      error: () => {
        this.backlog = this.backlog.map(existing =>
          existing.id === item.id ? { ...existing, ...item } : existing
        );
        this.persistBacklogToLocal();
        this.editingItem = null;
        this.showSuccess('Backlog item updated locally.');
      }
    });
  }

  private showSuccess(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2500);
  }

  private persistBacklogToLocal() {
    localStorage.setItem(this.backlogStorageKey, JSON.stringify(this.backlog));
  }

  private loadBacklogFromLocal(): BacklogItem[] {
    const raw = localStorage.getItem(this.backlogStorageKey);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as BacklogItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

}
