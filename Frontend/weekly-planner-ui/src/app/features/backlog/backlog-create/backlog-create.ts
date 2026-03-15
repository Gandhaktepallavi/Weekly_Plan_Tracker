import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../shared/models/backlog-item';

@Component({
  selector: 'app-backlog-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog-create.html',
  styleUrls: ['./backlog-create.css']
})
export class BacklogCreateComponent {
  @Output() create = new EventEmitter<{ title: string; category: Category; estimatedHours: number }>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  category: Category = 'Client Focused';
  estimatedHours = 1;

  save() {
    if (!this.title.trim()) {
      return;
    }

    this.create.emit({
      title: this.title.trim(),
      category: this.category,
      estimatedHours: this.estimatedHours
    });
    this.title = '';
    this.category = 'Client Focused';
    this.estimatedHours = 1;
  }
}
