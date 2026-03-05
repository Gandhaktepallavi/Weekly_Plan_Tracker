import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BacklogItem, WeeklyPlan } from '../shared/models/backlog-item';

@Injectable({
  providedIn: 'root',
})
export class PlannerApiService {
  private apiUrl = 'http://localhost:5120/api';

  constructor(private http: HttpClient) {}

  getBacklog(): Observable<BacklogItem[]> {
    return this.http.get<BacklogItem[]>(`${this.apiUrl}/backlog`);
  }

  getCurrentWeeklyPlan(): Observable<WeeklyPlan> {
    return this.http.get<WeeklyPlan>(`${this.apiUrl}/weeklyplan/current`);
  }

  getActivePlan(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/weeklyplan/active-exists`);
  }

  getTeamMembers() {
    return this.http.get(`${this.apiUrl}/team-members`);
  }

  assignTask(task: any) {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  updateProgress(id: string, percent: number) {
    return this.http.put(`${this.apiUrl}/tasks/${id}/progress?percent=${percent}`, {});
  }

  getDashboard() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }
  addBacklogItem(item: any) {
    return this.http.post(`${this.apiUrl}/backlog`, item);
  }

  deleteBacklogItem(id: string) {
    return this.http.delete(`${this.apiUrl}/backlog/${id}`);
  }
  addTeamMember(member: any) {
    return this.http.post(`${this.apiUrl}/team-members`, member);
  }

  makeLead(id: string) {
    return this.http.put(`${this.apiUrl}/team-members/${id}/lead`, {});
  }

  deactivateMember(id: string) {
    return this.http.put(`${this.apiUrl}/team-members/${id}/deactivate`, {});
  }
  updateMember(member:any){
  return this.http.put(`${this.apiUrl}/team-members/${member.id}`, member);
}
getUserProfile() {
  return this.http.get(`${this.apiUrl}/user/profile`);
}
}
