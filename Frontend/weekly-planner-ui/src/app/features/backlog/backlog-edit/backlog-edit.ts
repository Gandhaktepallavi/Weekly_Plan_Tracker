import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BacklogItem, Category } from '../../../shared/models/backlog-item';

@Component({
  selector: 'app-backlog-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog-edit.html',
  styleUrls: ['./backlog-edit.css']
})
export class BacklogEditComponent implements OnChanges {
  @Input() item: BacklogItem | null = null;
  @Output() saveItem = new EventEmitter<BacklogItem>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  category: Category = 'Client Focused';
  estimatedHours = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      this.title = this.item.title;
      this.category = this.item.category;
      this.estimatedHours = this.item.estimatedHours;
    }
  }

  save() {
    if (!this.item || !this.title.trim()) {
      return;
    }

    this.saveItem.emit({
      ...this.item,
      title: this.title.trim(),
      category: this.category,
      estimatedHours: this.estimatedHours
    });
  }
}
