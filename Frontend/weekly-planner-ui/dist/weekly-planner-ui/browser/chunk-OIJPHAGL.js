import {
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  Router,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-PYXMBAFL.js";

// src/app/features/review/review.ts
function ReviewComponent_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", c_r1.budget, "h");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", c_r1.planned, "h");
    \u0275\u0275advance();
    \u0275\u0275classProp("error", c_r1.planned !== c_r1.budget);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Off by ", c_r1.budget - c_r1.planned, "h ");
  }
}
function ReviewComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r2.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", m_r2.planned, " / ", m_r2.target, "h ");
  }
}
function ReviewComponent_div_23_li_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r3);
  }
}
function ReviewComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "h4");
    \u0275\u0275text(2, "Can't freeze yet:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275template(4, ReviewComponent_div_23_li_4_Template, 2, 1, "li", 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r3.errors);
  }
}
var ReviewComponent = class _ReviewComponent {
  router;
  planning;
  totalHours = 0;
  categorySummary = [];
  memberSummary = [];
  errors = [];
  constructor(router) {
    this.router = router;
  }
  ngOnInit() {
    const stored = localStorage.getItem("activePlanning");
    if (!stored) {
      this.router.navigate(["/home"]);
      return;
    }
    this.planning = JSON.parse(stored);
    this.totalHours = this.planning.selectedMembers.length * 30;
    this.calculateCategories();
    this.calculateMembers();
    this.validateFreeze();
  }
  calculateCategories() {
    const categories = [
      { name: "Client Focused", percent: this.planning.clientPercent },
      { name: "Tech Debt", percent: this.planning.techDebtPercent },
      { name: "R&D", percent: this.planning.rndPercent }
    ];
    this.categorySummary = categories.map((c) => {
      const budget = Math.round(c.percent / 100 * this.totalHours);
      const planned = 0;
      return {
        name: c.name,
        budget,
        planned,
        diff: planned - budget
      };
    });
  }
  calculateMembers() {
    this.memberSummary = this.planning.selectedMembers.map((id) => {
      return {
        name: this.getMemberName(id),
        planned: 0,
        target: 30
      };
    });
  }
  getMemberName(id) {
    const members = JSON.parse(localStorage.getItem("teamMembers") || "[]");
    const member = members.find((m) => m.id === id);
    return member ? member.name : "";
  }
  validateFreeze() {
    this.errors = [];
    this.memberSummary.forEach((m) => {
      if (m.planned !== m.target) {
        this.errors.push(`${m.name} has ${m.planned} hours (needs ${m.target} more).`);
      }
    });
    this.categorySummary.forEach((c) => {
      if (c.planned !== c.budget) {
        this.errors.push(`${c.name} has ${c.planned}h planned but budget is ${c.budget}h.`);
      }
    });
  }
  freezePlan() {
    if (this.errors.length > 0)
      return;
    const updated = __spreadProps(__spreadValues({}, this.planning), { frozen: true });
    localStorage.setItem("activePlanning", JSON.stringify(updated));
    alert("Plan Frozen Successfully!");
  }
  cancelPlanning() {
    localStorage.removeItem("activePlanning");
    this.router.navigate(["/home"]);
  }
  static \u0275fac = function ReviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReviewComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReviewComponent, selectors: [["app-review"]], decls: 28, vars: 7, consts: [[1, "review-container"], ["routerLink", "/dashboard", 1, "back-btn"], [4, "ngFor", "ngForOf"], ["class", "member-card", 4, "ngFor", "ngForOf"], ["class", "error-box", 4, "ngIf"], [3, "click", "disabled"], [1, "cancel", 3, "click"], [1, "member-card"], [1, "hours"], [1, "error-box"]], template: function ReviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275text(2, "\u2190 Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h2");
      \u0275\u0275text(4, "Review the Team's Plan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h3");
      \u0275\u0275text(8, "Category Summary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "table")(10, "tr")(11, "th");
      \u0275\u0275text(12, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "th");
      \u0275\u0275text(14, "Budget");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "th");
      \u0275\u0275text(16, "Planned");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "th");
      \u0275\u0275text(18, "Status");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(19, ReviewComponent_tr_19_Template, 9, 6, "tr", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "h3");
      \u0275\u0275text(21, "Member Summary");
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, ReviewComponent_div_22_Template, 4, 3, "div", 3)(23, ReviewComponent_div_23_Template, 5, 1, "div", 4);
      \u0275\u0275elementStart(24, "button", 5);
      \u0275\u0275listener("click", function ReviewComponent_Template_button_click_24_listener() {
        return ctx.freezePlan();
      });
      \u0275\u0275text(25, " Freeze the Plan ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 6);
      \u0275\u0275listener("click", function ReviewComponent_Template_button_click_26_listener() {
        return ctx.cancelPlanning();
      });
      \u0275\u0275text(27, " Cancel Planning ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate3(" Week of ", ctx.planning.planningDate, ". ", ctx.planning.selectedMembers.length, " team members. ", ctx.totalHours, " total hours. ");
      \u0275\u0275advance(13);
      \u0275\u0275property("ngForOf", ctx.categorySummary);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.memberSummary);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errors.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.errors.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n.review-container[_ngcontent-%COMP%] {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: white;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 20px;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 10px;\n  border: 1px solid #334155;\n}\n.error[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.member-card[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n}\n.hours[_ngcontent-%COMP%] {\n  float: right;\n  color: #ef4444;\n}\n.error-box[_ngcontent-%COMP%] {\n  background: #1e293b;\n  border-left: 4px solid red;\n  padding: 15px;\n  margin: 20px 0;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #2563eb;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  color: white;\n  margin-right: 10px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  background: gray;\n  cursor: not-allowed;\n}\n.cancel[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n/*# sourceMappingURL=review.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReviewComponent, [{
    type: Component,
    args: [{ selector: "app-review", standalone: true, imports: [CommonModule], template: `<div class="review-container">\r
\r
  <button routerLink="/dashboard" class="back-btn">\u2190 Home</button>\r
\r
  <h2>Review the Team's Plan</h2>\r
\r
  <p>\r
    Week of {{ planning.planningDate }}.\r
    {{ planning.selectedMembers.length }} team members.\r
    {{ totalHours }} total hours.\r
  </p>\r
\r
  <!-- Category Summary -->\r
  <h3>Category Summary</h3>\r
\r
  <table>\r
    <tr>\r
      <th>Category</th>\r
      <th>Budget</th>\r
      <th>Planned</th>\r
      <th>Status</th>\r
    </tr>\r
\r
    <tr *ngFor="let c of categorySummary">\r
      <td>{{ c.name }}</td>\r
      <td>{{ c.budget }}h</td>\r
      <td>{{ c.planned }}h</td>\r
      <td [class.error]="c.planned !== c.budget">\r
        Off by {{ c.budget - c.planned }}h\r
      </td>\r
    </tr>\r
  </table>\r
\r
  <!-- Member Summary -->\r
  <h3>Member Summary</h3>\r
\r
  <div *ngFor="let m of memberSummary" class="member-card">\r
    {{ m.name }}\r
    <span class="hours">\r
      {{ m.planned }} / {{ m.target }}h\r
    </span>\r
  </div>\r
\r
  <!-- Freeze Errors -->\r
  <div *ngIf="errors.length > 0" class="error-box">\r
    <h4>Can't freeze yet:</h4>\r
    <ul>\r
      <li *ngFor="let e of errors">{{ e }}</li>\r
    </ul>\r
  </div>\r
\r
  <button\r
    [disabled]="errors.length > 0"\r
    (click)="freezePlan()">\r
    Freeze the Plan\r
  </button>\r
\r
  <button class="cancel" (click)="cancelPlanning()">\r
    Cancel Planning\r
  </button>\r
\r
</div>`, styles: ["/* src/app/features/review/review.css */\n.review-container {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: white;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 20px;\n}\nth,\ntd {\n  padding: 10px;\n  border: 1px solid #334155;\n}\n.error {\n  color: #ef4444;\n}\n.member-card {\n  background: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n}\n.hours {\n  float: right;\n  color: #ef4444;\n}\n.error-box {\n  background: #1e293b;\n  border-left: 4px solid red;\n  padding: 15px;\n  margin: 20px 0;\n}\nbutton {\n  background: #2563eb;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  color: white;\n  margin-right: 10px;\n  cursor: pointer;\n}\nbutton:disabled {\n  background: gray;\n  cursor: not-allowed;\n}\n.cancel {\n  background: #ef4444;\n}\n/*# sourceMappingURL=review.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReviewComponent, { className: "ReviewComponent", filePath: "src/app/features/review/review.ts", lineNumber: 12 });
})();
export {
  ReviewComponent
};
//# sourceMappingURL=chunk-OIJPHAGL.js.map
