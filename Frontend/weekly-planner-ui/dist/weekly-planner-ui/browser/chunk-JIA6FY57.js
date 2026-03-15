import {
  PlannerApiService
} from "./chunk-3C2OS2CR.js";
import {
  CommonModule,
  Component,
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
  ɵɵtext
} from "./chunk-PYXMBAFL.js";

// src/app/features/dashboard/dashboard.ts
function DashboardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, " Planning is open! Team members can now plan their work. ");
    \u0275\u0275elementStart(2, "span", 6);
    \u0275\u0275listener("click", function DashboardComponent_div_3_Template_span_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showBanner = false);
    });
    \u0275\u0275text(3, "\u2716");
    \u0275\u0275elementEnd()();
  }
}
var DashboardComponent = class _DashboardComponent {
  api;
  router;
  dashboardData = [];
  showBanner = true;
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }
  ngOnInit() {
    this.api.getDashboard().subscribe((data) => {
      this.dashboardData = data;
    });
  }
  cancelPlanning() {
    this.router.navigate(["/home"]);
  }
  goToReview() {
    this.router.navigate(["/review"]);
  }
  goToPlanning() {
    this.router.navigate(["/planning"]);
  }
  goToBacklog() {
    this.router.navigate(["/backlog"]);
  }
  goToTeam() {
    this.router.navigate(["/team"]);
  }
  goToPastWeeks() {
    this.router.navigate(["/history"]);
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(PlannerApiService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 35, vars: 1, consts: [[1, "dashboard-container"], ["class", "banner", 4, "ngIf"], [1, "grid"], [1, "card", 3, "click"], [1, "card", "cancel", 3, "click"], [1, "banner"], [1, "close", 3, "click"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2, "What do you want to do?");
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, DashboardComponent_div_3_Template, 4, 0, "div", 1);
      \u0275\u0275elementStart(4, "div", 2)(5, "div", 3);
      \u0275\u0275listener("click", function DashboardComponent_Template_div_click_5_listener() {
        return ctx.goToReview();
      });
      \u0275\u0275elementStart(6, "h3");
      \u0275\u0275text(7, "\u2744 Review and Freeze the Plan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9, "Check everyone's hours and lock the plan.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 3);
      \u0275\u0275listener("click", function DashboardComponent_Template_div_click_10_listener() {
        return ctx.goToPlanning();
      });
      \u0275\u0275elementStart(11, "h3");
      \u0275\u0275text(12, "\u{1F4DD} Plan My Work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p");
      \u0275\u0275text(14, "Pick backlog items and commit hours.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 3);
      \u0275\u0275listener("click", function DashboardComponent_Template_div_click_15_listener() {
        return ctx.goToBacklog();
      });
      \u0275\u0275elementStart(16, "h3");
      \u0275\u0275text(17, "\u{1F4CB} Manage Backlog");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "p");
      \u0275\u0275text(19, "Add, edit, or browse work items.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 3);
      \u0275\u0275listener("click", function DashboardComponent_Template_div_click_20_listener() {
        return ctx.goToTeam();
      });
      \u0275\u0275elementStart(21, "h3");
      \u0275\u0275text(22, "\u{1F465} Manage Team Members");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p");
      \u0275\u0275text(24, "Add or remove team members.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 3);
      \u0275\u0275listener("click", function DashboardComponent_Template_div_click_25_listener() {
        return ctx.goToPastWeeks();
      });
      \u0275\u0275elementStart(26, "h3");
      \u0275\u0275text(27, "\u{1F4C5} View Past Weeks");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29, "Look at completed planning cycles.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 4);
      \u0275\u0275listener("click", function DashboardComponent_Template_div_click_30_listener() {
        return ctx.cancelPlanning();
      });
      \u0275\u0275elementStart(31, "h3");
      \u0275\u0275text(32, "\u{1F5D1} Cancel This Week's Planning");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p");
      \u0275\u0275text(34, "Erase all plans and start over.");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.showBanner);
    }
  }, dependencies: [CommonModule, NgIf], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: white;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.banner[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: #065f46;\n  padding: 12px 20px;\n  border-radius: 8px;\n  margin-bottom: 30px;\n  position: relative;\n}\n.close[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 15px;\n  cursor: pointer;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}\n.card[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  border: 1px solid #334155;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  border-color: #3b82f6;\n}\n.cancel[_ngcontent-%COMP%] {\n  border: 1px solid #ef4444;\n  color: #ef4444;\n}\n.cancel[_ngcontent-%COMP%]:hover {\n  background: #7f1d1d;\n  color: white;\n}\n/*# sourceMappingURL=dashboard.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule], template: `<div class="dashboard-container">\r
\r
  <h1>What do you want to do?</h1>\r
\r
  <!-- Success Banner -->\r
  <div class="banner" *ngIf="showBanner">\r
    Planning is open! Team members can now plan their work.\r
    <span class="close" (click)="showBanner=false">\u2716</span>\r
  </div>\r
\r
  <div class="grid">\r
\r
    <div class="card" (click)="goToReview()">\r
      <h3>\u2744 Review and Freeze the Plan</h3>\r
      <p>Check everyone's hours and lock the plan.</p>\r
    </div>\r
\r
    <div class="card" (click)="goToPlanning()">\r
      <h3>\u{1F4DD} Plan My Work</h3>\r
      <p>Pick backlog items and commit hours.</p>\r
    </div>\r
\r
    <div class="card" (click)="goToBacklog()">\r
      <h3>\u{1F4CB} Manage Backlog</h3>\r
      <p>Add, edit, or browse work items.</p>\r
    </div>\r
\r
    <div class="card" (click)="goToTeam()">\r
      <h3>\u{1F465} Manage Team Members</h3>\r
      <p>Add or remove team members.</p>\r
    </div>\r
\r
    <div class="card" (click)="goToPastWeeks()">\r
      <h3>\u{1F4C5} View Past Weeks</h3>\r
      <p>Look at completed planning cycles.</p>\r
    </div>\r
\r
    <div class="card cancel" (click)="cancelPlanning()">\r
      <h3>\u{1F5D1} Cancel This Week's Planning</h3>\r
      <p>Erase all plans and start over.</p>\r
    </div>\r
\r
  </div>\r
\r
</div>`, styles: ["/* src/app/features/dashboard/dashboard.css */\n.dashboard-container {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: white;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\nh1 {\n  margin-bottom: 20px;\n}\n.banner {\n  background: #bbf7d0;\n  color: #065f46;\n  padding: 12px 20px;\n  border-radius: 8px;\n  margin-bottom: 30px;\n  position: relative;\n}\n.close {\n  position: absolute;\n  right: 15px;\n  cursor: pointer;\n}\n.grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}\n.card {\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  border: 1px solid #334155;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.card:hover {\n  transform: translateY(-3px);\n  border-color: #3b82f6;\n}\n.cancel {\n  border: 1px solid #ef4444;\n  color: #ef4444;\n}\n.cancel:hover {\n  background: #7f1d1d;\n  color: white;\n}\n/*# sourceMappingURL=dashboard.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.ts", lineNumber: 13 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-JIA6FY57.js.map
