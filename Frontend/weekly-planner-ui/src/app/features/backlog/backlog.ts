import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { BacklogItem } from '../../shared/models/backlog-item';
import { Category } from '../../shared/models/backlog-item';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
  title = '';
  category: Category = 'Client Focused';
  estimatedHours = 1;
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
    this.resetForm();
  }

  addItem() {
    if (!this.title.trim()) return;

    const newItem = {
      title: this.title,
      category: this.category,
      estimatedHours: this.estimatedHours
    };

    this.api.addBacklogItem(newItem).subscribe(() => {
      this.loadBacklog();
      this.showSuccess('Backlog item saved!');
    });

    this.toggleForm();
  }

  resetForm() {
    this.title = '';
    this.category = 'Client Focused';
    this.estimatedHours = 1;
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

  private showSuccess(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2500);
  }

}
