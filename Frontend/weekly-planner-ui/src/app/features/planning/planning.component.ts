import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerApiService } from '../../core/planner-api';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planning.html',
  styleUrls: ['./planning.css']
})
export default class PlanningComponent implements OnInit {
  constructor(private api: PlannerApiService) {}

  ngOnInit(): void {
  }
}
