import {
  HttpClient,
  Injectable,
  __spreadProps,
  __spreadValues,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-PYXMBAFL.js";

// src/app/core/planner-api.ts
var PlannerApiService = class _PlannerApiService {
  http;
  apiUrl = "http://localhost:5120/api";
  constructor(http) {
    this.http = http;
  }
  // ==================== BACKLOG ====================
  getBacklog() {
    return this.http.get(`${this.apiUrl}/backlog`).pipe(map((items) => (items || []).map((item) => __spreadProps(__spreadValues({}, item), {
      category: this.mapApiCategoryToUi(item.category),
      isAssigned: item.isAssigned ?? false
    }))));
  }
  addBacklogItem(item) {
    const payload = __spreadProps(__spreadValues({}, item), {
      category: this.mapUiCategoryToApi(item.category)
    });
    return this.http.post(`${this.apiUrl}/backlog`, payload).pipe(map((created) => __spreadProps(__spreadValues({}, created), {
      category: this.mapApiCategoryToUi(created.category),
      isAssigned: created.isAssigned ?? false
    })));
  }
  createBacklogItem(item) {
    return this.addBacklogItem(item);
  }
  updateBacklogItem(item) {
    const payload = __spreadProps(__spreadValues({}, item), {
      category: this.mapUiCategoryToApi(item.category)
    });
    return this.http.put(`${this.apiUrl}/backlog/${item.id}`, payload);
  }
  deleteBacklogItem(id) {
    return this.http.delete(`${this.apiUrl}/backlog/${id}`);
  }
  // ==================== WEEKLY PLAN ====================
  getCurrentWeeklyPlan() {
    return this.http.get(`${this.apiUrl}/weeklyplan/current`);
  }
  getPastWeeks() {
    return this.http.get(`${this.apiUrl}/weeklyplan/past`);
  }
  createWeeklyPlan(plan) {
    return this.http.post(`${this.apiUrl}/weeklyplan`, plan);
  }
  freezePlan(id) {
    return this.http.put(`${this.apiUrl}/weeklyplan/${id}/freeze`, {});
  }
  getActivePlan() {
    return this.http.get(`${this.apiUrl}/weeklyplan/active-exists`);
  }
  getUserProfile() {
    return this.http.get(`${this.apiUrl}/weeklyplan/profile`);
  }
  // ==================== TEAM MEMBERS ====================
  getTeamMembers() {
    return this.http.get(`${this.apiUrl}/teammembers`);
  }
  addTeamMember(member) {
    return this.http.post(`${this.apiUrl}/teammembers`, member);
  }
  updateMember(member) {
    return this.http.put(`${this.apiUrl}/teammembers/${member.id}`, member);
  }
  updateTeamMember(member) {
    return this.updateMember(member);
  }
  makeLead(id) {
    return this.http.put(`${this.apiUrl}/teammembers/${id}/set-lead`, {});
  }
  deactivateMember(id) {
    return this.http.delete(`${this.apiUrl}/teammembers/${id}`);
  }
  deleteTeamMember(id) {
    return this.http.delete(`${this.apiUrl}/teammembers/${id}`);
  }
  // ==================== TASKS ====================
  assignTask(task) {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }
  getTasks() {
    return this.http.get(`${this.apiUrl}/tasks`);
  }
  getPlannedTasksByPlanId(planId) {
    return this.http.get(`${this.apiUrl}/PlannedTasks/weekly-plan/${planId}`);
  }
  getPlanTeamSummary(planId) {
    return this.http.get(`${this.apiUrl}/PlannedTasks/summary/team/${planId}`);
  }
  // ==================== CATEGORY SETTINGS ====================
  getCategorySettings() {
    return this.http.get(`${this.apiUrl}/categorysettings/current`);
  }
  getCategorySettingsCurrent() {
    return this.getCategorySettings();
  }
  // ==================== DASHBOARD ====================
  getDashboard() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }
  // ==================== BACKUP ====================
  importBackup(payload) {
    return this.http.post(`${this.apiUrl}/backup/import`, payload);
  }
  seedSampleData() {
    return this.http.post(`${this.apiUrl}/backup/seed-sample`, {});
  }
  mapApiCategoryToUi(value) {
    const normalized = String(value ?? "").toLowerCase().replace(/\s+/g, "");
    if (normalized === "client" || normalized === "clientfocused")
      return "Client Focused";
    if (normalized === "techdebt")
      return "Tech Debt";
    if (normalized === "rnd" || normalized === "r&d")
      return "R&D";
    return "Client Focused";
  }
  mapUiCategoryToApi(value) {
    const normalized = String(value ?? "").toLowerCase().replace(/\s+/g, "");
    if (normalized === "techdebt")
      return "TechDebt";
    if (normalized === "r&d" || normalized === "rnd")
      return "RnD";
    return "Client";
  }
  static \u0275fac = function PlannerApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlannerApiService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlannerApiService, factory: _PlannerApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlannerApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  PlannerApiService
};
//# sourceMappingURL=chunk-3C2OS2CR.js.map
