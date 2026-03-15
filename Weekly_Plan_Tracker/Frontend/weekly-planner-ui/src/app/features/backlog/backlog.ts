import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlannerApiService } from '../../core/planner-api';
import { BacklogItem, Category, toBackendCategory, toFrontendCategory } from '../../shared/models/backlog-item';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog.html',
  styleUrls: ['./backlog.css'],
})
export class BacklogComponent implements OnInit {

  backlog: BacklogItem[] = [];

  // filters
  selectedCategory: string = 'All';
  searchTerm = '';
  availableOnly = false;

  // form
  showForm = false;
  title = '';
  category: string = 'Client Focused';
  estimatedHours = 1;

  constructor(private api: PlannerApiService) {}

  ngOnInit() {
    this.loadBacklog();
  }

  loadBacklog() {
    this.api.getBacklog().subscribe({
      next: (data: any) => {
        // Convert backend categories to frontend categories
        this.backlog = data.map((item: any) => ({
          ...item,
          category: toFrontendCategory(item.category) as Category
        }));
      },
      error: (err) => console.error('Error loading backlog:', err)
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
      category: toBackendCategory(this.category),
      estimatedHours: this.estimatedHours,
      status: 'Available'
    };

    this.api.addBacklogItem(newItem).subscribe({
      next: () => {
        this.loadBacklog();
        this.toggleForm();
      },
      error: (err) => console.error('Error adding item:', err)
    });
  }

  resetForm() {
    this.title = '';
    this.category = 'Client Focused';
    this.estimatedHours = 1;
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this backlog item?')) {
      this.api.deleteBacklogItem(id).subscribe({
        next: () => {
          this.loadBacklog();
        },
        error: (err) => console.error('Error deleting item:', err)
      });
    }
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

  // Get category display name
  getCategoryClass(category: string): string {
    return category.replace(' ', '-').replace('&', '');
  }
}

