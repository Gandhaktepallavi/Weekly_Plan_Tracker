import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BacklogItem, WeeklyPlan } from '../shared/models/backlog-item';

@Injectable({
  providedIn: 'root'
})
export class PlannerApiService {

  private apiUrl = 'https://localhost:5120/api';

  constructor(private http: HttpClient) {}

  getBacklog(): Observable<BacklogItem[]> {
    return this.http.get<BacklogItem[]>(`${this.apiUrl}/backlog`);
  }

  getCurrentWeeklyPlan(): Observable<WeeklyPlan> {
    return this.http.get<WeeklyPlan>(`${this.apiUrl}/weekly-plans/current`);
  }
}