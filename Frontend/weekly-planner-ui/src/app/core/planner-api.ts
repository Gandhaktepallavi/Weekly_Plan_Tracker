import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BacklogItem, WeeklyPlan } from '../shared/models/backlog-item';

@Injectable({
  providedIn: 'root'
})
export class PlannerApiService {
  private readonly apiUrl = 'http://localhost:5120/api';

  constructor(private http: HttpClient) {}

  // ==================== BACKLOG ====================
  getBacklog(): Observable<BacklogItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/backlog`).pipe(
      map(items =>
        (items || []).map(item => ({
          ...item,
          category: this.mapApiCategoryToUi(item.category),
          isAssigned: item.isAssigned ?? false
        } as BacklogItem))
      )
    );
  }

  addBacklogItem(item: any): Observable<any> {
    const payload = {
      ...item,
      category: this.mapUiCategoryToApi(item.category)
    };

    return this.http.post<any>(`${this.apiUrl}/backlog`, payload).pipe(
      map(created => ({
        ...created,
        category: this.mapApiCategoryToUi(created.category),
        isAssigned: created.isAssigned ?? false
      }))
    );
  }

  createBacklogItem(item: any): Observable<any> {
    return this.addBacklogItem(item);
  }

  updateBacklogItem(item: any): Observable<any> {
    const payload = {
      ...item,
      category: this.mapUiCategoryToApi(item.category)
    };

    return this.http.put(`${this.apiUrl}/backlog/${item.id}`, payload);
  }

  deleteBacklogItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/backlog/${id}`);
  }

  // ==================== WEEKLY PLAN ====================
  getCurrentWeeklyPlan(): Observable<WeeklyPlan> {
    return this.http.get<WeeklyPlan>(`${this.apiUrl}/weeklyplan/current`);
  }

  getPastWeeks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/weeklyplan/past`);
  }

  createWeeklyPlan(plan: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/weeklyplan`, plan);
  }

  freezePlan(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/weeklyplan/${id}/freeze`, {});
  }

  getActivePlan(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/weeklyplan/active-exists`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/weeklyplan/profile`);
  }

  // ==================== TEAM MEMBERS ====================
  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teammembers`);
  }

  addTeamMember(member: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/teammembers`, member);
  }

  updateMember(member: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/teammembers/${member.id}`, member);
  }

  updateTeamMember(member: any): Observable<any> {
    return this.updateMember(member);
  }

  makeLead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/teammembers/${id}/set-lead`, {});
  }

  deactivateMember(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/teammembers/${id}`);
  }

  deleteTeamMember(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/teammembers/${id}`);
  }

  // ==================== TASKS ====================
  assignTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  getPlannedTasksByPlanId(planId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/PlannedTasks/weekly-plan/${planId}`);
  }

  getPlanTeamSummary(planId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/PlannedTasks/summary/team/${planId}`);
  }

  // ==================== CATEGORY SETTINGS ====================
  getCategorySettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorysettings/current`);
  }

  getCategorySettingsCurrent(): Observable<any> {
    return this.getCategorySettings();
  }

  // ==================== DASHBOARD ====================
  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  // ==================== BACKUP ====================
  importBackup(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/backup/import`, payload);
  }

  seedSampleData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/backup/seed-sample`, {});
  }

  private mapApiCategoryToUi(value: any): BacklogItem['category'] {
    const normalized = String(value ?? '').toLowerCase().replace(/\s+/g, '');
    if (normalized === 'client' || normalized === 'clientfocused') return 'Client Focused';
    if (normalized === 'techdebt') return 'Tech Debt';
    if (normalized === 'rnd' || normalized === 'r&d') return 'R&D';
    return 'Client Focused';
  }

  private mapUiCategoryToApi(value: any): 'Client' | 'TechDebt' | 'RnD' {
    const normalized = String(value ?? '').toLowerCase().replace(/\s+/g, '');
    if (normalized === 'techdebt') return 'TechDebt';
    if (normalized === 'r&d' || normalized === 'rnd') return 'RnD';
    return 'Client';
  }
}
