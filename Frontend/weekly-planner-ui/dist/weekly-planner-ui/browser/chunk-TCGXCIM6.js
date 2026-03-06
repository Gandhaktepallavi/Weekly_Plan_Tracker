import {
  PlannerApiService
} from "./chunk-3C2OS2CR.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgForOf,
  NgIf,
  RouterLink,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PYXMBAFL.js";

// src/app/features/history/history.ts
function HistoryComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Loading past weeks...");
    \u0275\u0275elementEnd();
  }
}
function HistoryComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, " No past weeks yet. ");
    \u0275\u0275elementEnd();
  }
}
function HistoryComponent_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 11)(8, "div");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const week_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Week of ", \u0275\u0275pipeBind2(4, 9, week_r1.weekStart, "MMM d, y"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("frozen", week_r1.isFrozen);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", week_r1.isFrozen ? "Frozen" : "Open", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", week_r1.teamMembersCount, " members");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", week_r1.taskCount, " tasks");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", week_r1.totalPlannedHours, "h planned");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", week_r1.totalCompletedHours, "h completed");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", week_r1.progressPercent, "% done");
  }
}
function HistoryComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, HistoryComponent_div_8_div_1_Template, 18, 12, "div", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.pastWeeks);
  }
}
var HistoryComponent = class _HistoryComponent {
  api;
  isLoading = true;
  pastWeeks = [];
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.api.getPastWeeks().subscribe({
      next: (data) => {
        this.pastWeeks = data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.pastWeeks = [];
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function HistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HistoryComponent)(\u0275\u0275directiveInject(PlannerApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HistoryComponent, selectors: [["app-history"]], decls: 9, vars: 3, consts: [[1, "history-page"], [1, "history-container"], ["routerLink", "/home", 1, "home-btn"], ["class", "banner", 4, "ngIf"], ["class", "weeks-list", 4, "ngIf"], [1, "banner"], [1, "weeks-list"], ["class", "week-card", 4, "ngFor", "ngForOf"], [1, "week-card"], [1, "week-header"], [1, "status"], [1, "stats"]], template: function HistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275text(3, "\u2190 Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2");
      \u0275\u0275text(5, "Past Weeks");
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, HistoryComponent_div_6_Template, 2, 0, "div", 3)(7, HistoryComponent_div_7_Template, 2, 0, "div", 3)(8, HistoryComponent_div_8_Template, 2, 1, "div", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.pastWeeks.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.pastWeeks.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, RouterLink, DatePipe], styles: ["\n\n.history-page[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 150px);\n  background: #0b1220;\n  padding: 24px 0;\n}\n.history-container[_ngcontent-%COMP%] {\n  max-width: 1040px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n.home-btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #f1f5f9;\n  color: #334155;\n  text-decoration: none;\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\nh2[_ngcontent-%COMP%] {\n  color: #e2e8f0;\n  margin: 0 0 20px;\n  font-size: 44px;\n  font-weight: 800;\n}\n.banner[_ngcontent-%COMP%] {\n  background: #c4d3e8;\n  border-left: 4px solid #3b82f6;\n  color: #111827;\n  padding: 18px 22px;\n  border-radius: 8px;\n  font-size: 34px;\n}\n.weeks-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.week-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  padding: 16px;\n}\n.week-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n.week-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #0f172a;\n}\n.status[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n  border-radius: 999px;\n  padding: 4px 10px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.status.frozen[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 8px;\n  color: #334155;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  h2[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n  .banner[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n}\n/*# sourceMappingURL=history.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryComponent, [{
    type: Component,
    args: [{ selector: "app-history", standalone: true, imports: [CommonModule, RouterLink, DatePipe], template: `<div class="history-page">
  <div class="history-container">
    <a class="home-btn" routerLink="/home">\u2190 Home</a>

    <h2>Past Weeks</h2>

    <div *ngIf="isLoading" class="banner">Loading past weeks...</div>

    <div *ngIf="!isLoading && pastWeeks.length === 0" class="banner">
      No past weeks yet.
    </div>

    <div *ngIf="!isLoading && pastWeeks.length > 0" class="weeks-list">
      <div class="week-card" *ngFor="let week of pastWeeks">
        <div class="week-header">
          <h3>Week of {{ week.weekStart | date:'MMM d, y' }}</h3>
          <span class="status" [class.frozen]="week.isFrozen">
            {{ week.isFrozen ? 'Frozen' : 'Open' }}
          </span>
        </div>

        <div class="stats">
          <div>{{ week.teamMembersCount }} members</div>
          <div>{{ week.taskCount }} tasks</div>
          <div>{{ week.totalPlannedHours }}h planned</div>
          <div>{{ week.totalCompletedHours }}h completed</div>
          <div>{{ week.progressPercent }}% done</div>
        </div>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/features/history/history.css */\n.history-page {\n  min-height: calc(100vh - 150px);\n  background: #0b1220;\n  padding: 24px 0;\n}\n.history-container {\n  max-width: 1040px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n.home-btn {\n  display: inline-block;\n  background: #f1f5f9;\n  color: #334155;\n  text-decoration: none;\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\nh2 {\n  color: #e2e8f0;\n  margin: 0 0 20px;\n  font-size: 44px;\n  font-weight: 800;\n}\n.banner {\n  background: #c4d3e8;\n  border-left: 4px solid #3b82f6;\n  color: #111827;\n  padding: 18px 22px;\n  border-radius: 8px;\n  font-size: 34px;\n}\n.weeks-list {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.week-card {\n  background: #f8fafc;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  padding: 16px;\n}\n.week-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n.week-header h3 {\n  margin: 0;\n  color: #0f172a;\n}\n.status {\n  background: #fef3c7;\n  color: #92400e;\n  border-radius: 999px;\n  padding: 4px 10px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.status.frozen {\n  background: #dcfce7;\n  color: #166534;\n}\n.stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 8px;\n  color: #334155;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  h2 {\n    font-size: 30px;\n  }\n  .banner {\n    font-size: 22px;\n  }\n}\n/*# sourceMappingURL=history.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HistoryComponent, { className: "HistoryComponent", filePath: "src/app/features/history/history.ts", lineNumber: 25 });
})();
export {
  HistoryComponent
};
//# sourceMappingURL=chunk-TCGXCIM6.js.map
