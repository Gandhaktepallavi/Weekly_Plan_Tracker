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

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadBacklog();
  }

  loadBacklog() {
    this.api.getBacklog().subscribe(data => {
      this.backlog = data;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.editingItem = null;
    }
  }

  addItem(newItem: { title: string; category: Category; estimatedHours: number }) {
    this.api.addBacklogItem(newItem).subscribe(() => {
      this.loadBacklog();
      this.showSuccess('Backlog item saved!');
    });

    this.showForm = false;
  }

  deleteItem(id: string) {
    this.api.deleteBacklogItem(id).subscribe(() => {
      this.loadBacklog();
      this.showSuccess('Backlog item deleted.');
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
    this.api.updateBacklogItem(item).subscribe(() => {
      this.editingItem = null;
      this.loadBacklog();
      this.showSuccess('Backlog item updated.');
    });
  }

  private showSuccess(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2500);
  }

}
