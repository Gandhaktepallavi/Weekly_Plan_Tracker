import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BacklogItem } from '../../../shared/models/backlog-item';

@Component({
  selector: 'app-backlog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backlog-list.html',
  styleUrls: ['./backlog-list.css']
})
export class BacklogListComponent {
  @Input() items: BacklogItem[] = [];
  @Output() edit = new EventEmitter<BacklogItem>();
  @Output() remove = new EventEmitter<string>();

  onEdit(item: BacklogItem) {
    this.edit.emit(item);
  }

  onDelete(id: string) {
    this.remove.emit(id);
  }
}
