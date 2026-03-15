import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-MH2EF65G.js";
import {
  PlannerApiService
} from "./chunk-3C2OS2CR.js";
import {
  CommonModule,
  Component,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-PYXMBAFL.js";

// src/app/features/planning/planning.component.ts
function PlanningComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Work period: ", ctx_r0.workPeriod, " ");
  }
}
function PlanningComponent_div_13_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Lead");
    \u0275\u0275elementEnd();
  }
}
function PlanningComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "input", 9);
    \u0275\u0275listener("change", function PlanningComponent_div_13_Template_input_change_1_listener() {
      const member_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleMember(member_r3.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275template(3, PlanningComponent_div_13_span_3_Template, 2, 0, "span", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r0.selectedMembers.includes(member_r3.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", member_r3.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", member_r3.isTeamLead);
  }
}
var PlanningComponent = class _PlanningComponent {
  router;
  api;
  constructor(router, api) {
    this.router = router;
    this.api = api;
  }
  planningDate = "";
  workPeriod = "";
  teamMembers = [];
  selectedMembers = [];
  clientPercent = 0;
  techDebtPercent = 0;
  rndPercent = 0;
  totalHours = 0;
  ngOnInit() {
    const stored = localStorage.getItem("teamMembers");
    if (stored) {
      this.teamMembers = JSON.parse(stored);
    }
  }
  // -------------------------
  // Date Logic
  // -------------------------
  onDateChange() {
    if (!this.planningDate)
      return;
    const selected = new Date(this.planningDate);
    const day = selected.getDay();
    if (day !== 2) {
      alert("Please pick a Tuesday");
      this.planningDate = "";
      this.workPeriod = "";
      return;
    }
    const start = new Date(selected);
    start.setDate(start.getDate() + 1);
    const end = new Date(selected);
    end.setDate(end.getDate() + 6);
    this.workPeriod = `${start.toISOString().split("T")[0]} to ${end.toISOString().split("T")[0]}`;
  }
  // -------------------------
  // Team Selection
  // -------------------------
  toggleMember(id) {
    if (this.selectedMembers.includes(id)) {
      this.selectedMembers = this.selectedMembers.filter((m) => m !== id);
    } else {
      this.selectedMembers.push(id);
    }
    this.calculateTotalHours();
  }
  calculateTotalHours() {
    this.totalHours = this.selectedMembers.length * 30;
  }
  assignTask(backlogId, memberId) {
    const task = {
      teamMemberId: memberId,
      backlogItemId: backlogId,
      plannedHours: 5
    };
    this.api.assignTask(task).subscribe(() => {
      alert("Task Assigned");
    });
  }
  // -------------------------
  // Percentage Validation
  // -------------------------
  get totalPercent() {
    return this.clientPercent + this.techDebtPercent + this.rndPercent;
  }
  get isValid() {
    return this.totalPercent === 100 && this.selectedMembers.length > 0 && !!this.planningDate;
  }
  openPlanning() {
    if (!this.isValid)
      return;
    const planningData = {
      planningDate: this.planningDate,
      workPeriod: this.workPeriod,
      selectedMembers: this.selectedMembers,
      clientPercent: this.clientPercent,
      techDebtPercent: this.techDebtPercent,
      rndPercent: this.rndPercent,
      isOpen: true
    };
    localStorage.setItem("activePlanning", JSON.stringify(planningData));
    this.router.navigate(["/dashboard"]);
  }
  static \u0275fac = function PlanningComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanningComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PlannerApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanningComponent, selectors: [["app-planning"]], decls: 32, vars: 11, consts: [[1, "container"], ["routerLink", "/home", 1, "back-btn"], [1, "card"], ["type", "date", 3, "ngModelChange", "change", "ngModel"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["type", "number", 3, "ngModelChange", "ngModel"], [3, "ngClass"], [3, "click", "disabled"], ["type", "checkbox", 3, "change", "checked"], ["class", "badge", 4, "ngIf"], [1, "badge"]], template: function PlanningComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275text(2, "\u2190Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h2");
      \u0275\u0275text(4, "Set Up This Week's Plan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 2)(6, "label");
      \u0275\u0275text(7, "Planning date (pick a Tuesday)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function PlanningComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.planningDate, $event) || (ctx.planningDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function PlanningComponent_Template_input_change_8_listener() {
        return ctx.onDateChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, PlanningComponent_div_9_Template, 2, 1, "div", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 2)(11, "h3");
      \u0275\u0275text(12, "Who is working this week?");
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, PlanningComponent_div_13_Template, 4, 3, "div", 5);
      \u0275\u0275elementStart(14, "div");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 2)(17, "h3");
      \u0275\u0275text(18, "How should the hours be split?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "label");
      \u0275\u0275text(20, "Client Focused %");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function PlanningComponent_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.clientPercent, $event) || (ctx.clientPercent = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "label");
      \u0275\u0275text(23, "Tech Debt %");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function PlanningComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.techDebtPercent, $event) || (ctx.techDebtPercent = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "label");
      \u0275\u0275text(26, "R&D %");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function PlanningComponent_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.rndPercent, $event) || (ctx.rndPercent = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 7);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "button", 8);
      \u0275\u0275listener("click", function PlanningComponent_Template_button_click_30_listener() {
        return ctx.openPlanning();
      });
      \u0275\u0275text(31, " Open Planning for the Team ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.planningDate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.workPeriod);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.teamMembers);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" Team members selected: ", ctx.selectedMembers.length, ". Total hours to plan: ", ctx.totalHours, " ");
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.clientPercent);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.techDebtPercent);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.rndPercent);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.totalPercent === 100 ? "validation-valid" : "validation-invalid");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" Total: ", ctx.totalPercent, "% (must be 100%)\n");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.isValid);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: #e2e8f0;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.back-btn[_ngcontent-%COMP%] {\n  background: #e5e7eb;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  margin-bottom: 20px;\n  font-weight: 500;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: #d1d5db;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  font-size: 26px;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  margin-bottom: 20px;\n  border: 1px solid #334155;\n}\ninput[type=date][_ngcontent-%COMP%], \ninput[type=number][_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border-radius: 6px;\n  border: 1px solid #475569;\n  background: #0f172a;\n  color: #e2e8f0;\n  margin-top: 6px;\n  margin-bottom: 12px;\n}\ninput[type=number][_ngcontent-%COMP%]:focus, \ninput[type=date][_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n}\ninput[type=checkbox][_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.badge[_ngcontent-%COMP%] {\n  background: #facc15;\n  color: black;\n  font-size: 12px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  margin-left: 6px;\n}\n.validation-valid[_ngcontent-%COMP%] {\n  color: #22c55e;\n  font-weight: 500;\n}\n.validation-invalid[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 500;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #2563eb;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 8px;\n  color: white;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 0.2s ease-in-out;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  background: #475569;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=planning.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanningComponent, [{
    type: Component,
    args: [{ selector: "app-planning", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="container">\r
\r
  <button routerLink="/home" class="back-btn">\u2190Home</button>\r
\r
  <h2>Set Up This Week's Plan</h2>\r
\r
  <!-- Date -->\r
  <div class="card">\r
    <label>Planning date (pick a Tuesday)</label>\r
    <input type="date" [(ngModel)]="planningDate" (change)="onDateChange()" />\r
    <div *ngIf="workPeriod">\r
      Work period: {{ workPeriod }}\r
    </div>\r
  </div>\r
\r
  <!-- Team -->\r
  <div class="card">\r
    <h3>Who is working this week?</h3>\r
\r
    <div *ngFor="let member of teamMembers">\r
      <input type="checkbox"\r
             [checked]="selectedMembers.includes(member.id)"\r
             (change)="toggleMember(member.id)" />\r
      {{ member.name }}\r
      <span *ngIf="member.isTeamLead" class="badge">Lead</span>\r
    </div>\r
\r
    <div>\r
      Team members selected: {{ selectedMembers.length }}.\r
      Total hours to plan: {{ totalHours }}\r
    </div>\r
  </div>\r
\r
  <!-- Percentage Split -->\r
  <div class="card">\r
    <h3>How should the hours be split?</h3>\r
\r
    <label>Client Focused %</label>\r
    <input type="number" [(ngModel)]="clientPercent" />\r
\r
    <label>Tech Debt %</label>\r
    <input type="number" [(ngModel)]="techDebtPercent" />\r
\r
    <label>R&D %</label>\r
    <input type="number" [(ngModel)]="rndPercent" />\r
\r
    <div [ngClass]="totalPercent === 100 ? 'validation-valid' : 'validation-invalid'">\r
  Total: {{ totalPercent }}% (must be 100%)\r
</div>\r
  </div>\r
\r
  <button\r
    [disabled]="!isValid"\r
    (click)="openPlanning()">\r
    Open Planning for the Team\r
  </button>\r
\r
</div>`, styles: ["/* src/app/features/planning/planning.css */\n.container {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: #e2e8f0;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.back-btn {\n  background: #e5e7eb;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  margin-bottom: 20px;\n  font-weight: 500;\n}\n.back-btn:hover {\n  background: #d1d5db;\n}\nh2 {\n  margin-bottom: 20px;\n  font-size: 26px;\n  font-weight: 600;\n}\n.card {\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  margin-bottom: 20px;\n  border: 1px solid #334155;\n}\ninput[type=date],\ninput[type=number] {\n  width: 100%;\n  padding: 10px;\n  border-radius: 6px;\n  border: 1px solid #475569;\n  background: #0f172a;\n  color: #e2e8f0;\n  margin-top: 6px;\n  margin-bottom: 12px;\n}\ninput[type=number]:focus,\ninput[type=date]:focus {\n  outline: none;\n  border-color: #3b82f6;\n}\ninput[type=checkbox] {\n  margin-right: 8px;\n}\n.badge {\n  background: #facc15;\n  color: black;\n  font-size: 12px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  margin-left: 6px;\n}\n.validation-valid {\n  color: #22c55e;\n  font-weight: 500;\n}\n.validation-invalid {\n  color: #ef4444;\n  font-weight: 500;\n}\nbutton {\n  background: #2563eb;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 8px;\n  color: white;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 0.2s ease-in-out;\n}\nbutton:hover:not(:disabled) {\n  background: #1d4ed8;\n}\nbutton:disabled {\n  background: #475569;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=planning.css.map */\n"] }]
  }], () => [{ type: Router }, { type: PlannerApiService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanningComponent, { className: "PlanningComponent", filePath: "src/app/features/planning/planning.component.ts", lineNumber: 20 });
})();
export {
  PlanningComponent
};
//# sourceMappingURL=chunk-YTJFJVO3.js.map
