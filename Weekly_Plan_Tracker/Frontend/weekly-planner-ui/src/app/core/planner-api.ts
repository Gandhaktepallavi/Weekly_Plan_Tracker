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

  // ========== Backlog ==========
  getBacklog(): Observable<BacklogItem[]> {
    return this.http.get<BacklogItem[]>(`${this.apiUrl}/backlog`);
  }

  addBacklogItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/backlog`, item);
  }

  deleteBacklogItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/backlog/${id}`);
  }

  updateBacklogItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/backlog/${id}`, item);
  }

  // ========== Team Members ==========
  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/team-members`);
  }

  addTeamMember(member: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/team-members`, member);
  }

  updateTeamMember(member: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/team-members/${member.id}`, member);
  }

  makeLead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/team-members/${id}/lead`, {});
  }

  deactivateMember(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/team-members/${id}/deactivate`, {});
  }

  activateMember(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/team-members/${id}/activate`, {});
  }

  deleteMember(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/team-members/${id}`);
  }

  // ========== Weekly Plan ==========
  getCurrentWeeklyPlan(): Observable<WeeklyPlan> {
    return this.http.get<WeeklyPlan>(`${this.apiUrl}/weeklyplan/current`);
  }

  getActivePlan(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/weeklyplan/active`);
  }

  getAllPlans(): Observable<WeeklyPlan[]> {
    return this.http.get<WeeklyPlan[]>(`${this.apiUrl}/weeklyplan`);
  }

  createWeeklyPlan(plan: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/weeklyplan`, plan);
  }

  updateWeeklyPlan(id: string, plan: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/weeklyplan/${id}`, plan);
  }

  freezePlan(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/weeklyplan/${id}/freeze`, {});
  }

  unfreezePlan(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/weeklyplan/${id}/unfreeze`, {});
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/weeklyplan/${id}`);
  }

  // ========== Tasks ==========
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  getTasksByPlan(planId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks/plan/${planId}`);
  }

  assignTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  updateProgress(id: string, percent: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}/progress?percent=${percent}`, {});
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  // ========== Dashboard ==========
  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  getMemberProgress(memberId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/member/${memberId}`);
  }

  getPastWeeks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/history`);
  }

  // ========== User Profile ==========
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }

  // ========== Category Settings ==========
  getCategorySettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category-settings`);
  }

  updateCategorySettings(settings: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/category-settings`, settings);
  }
}

