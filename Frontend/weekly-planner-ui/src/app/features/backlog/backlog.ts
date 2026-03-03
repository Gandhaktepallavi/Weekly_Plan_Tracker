import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type Category = 'Client Focused' | 'Tech Debt' | 'R&D';

export interface BacklogItem {
  id: string;
  title: string;
  category: Category;
  estimatedHours: number;
  isAssigned: boolean; // For Available filter
}

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog.html',
  styleUrls: ['./backlog.css']
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

  ngOnInit() {
    const stored = localStorage.getItem('backlog');
    if (stored) {
      this.backlog = JSON.parse(stored);
    }
  }

  save() {
    localStorage.setItem('backlog', JSON.stringify(this.backlog));
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.resetForm();
  }

  addItem() {
    if (!this.title.trim()) return;

    const newItem: BacklogItem = {
      id: crypto.randomUUID(),
      title: this.title,
      category: this.category,
      estimatedHours: this.estimatedHours,
      isAssigned: false
    };

    this.backlog.push(newItem);
    this.save();
    this.toggleForm();
  }

  resetForm() {
    this.title = '';
    this.category = 'Client Focused';
    this.estimatedHours = 1;
  }

  deleteItem(id: string) {
    this.backlog = this.backlog.filter(b => b.id !== id);
    this.save();
  }

  // ---------------------------
  // Filtering Logic
  // ---------------------------

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
}