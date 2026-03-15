import {
  BacklogComponent
} from "./chunk-HJLUMERB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-F7NMLPRR.js";
import {
  PlannerApiService
} from "./chunk-CPJS6R42.js";
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideClientHydration,
  provideRouter,
  withEventReplay
} from "./chunk-VMCOH72G.js";
import {
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OJKENBPH.js";

// src/app/pages/team-setup/team-setup.ts
function TeamSetupComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " No team members added yet. ");
    \u0275\u0275elementEnd();
  }
}
function TeamSetupComponent_div_10_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1, "Team Lead");
    \u0275\u0275elementEnd();
  }
}
function TeamSetupComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, TeamSetupComponent_div_10_span_4_Template, 2, 0, "span", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 12)(6, "button", 4);
    \u0275\u0275listener("click", function TeamSetupComponent_div_10_Template_button_click_6_listener() {
      const member_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTeamLead(member_r2.id));
    });
    \u0275\u0275text(7, " Make Lead ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 13);
    \u0275\u0275listener("click", function TeamSetupComponent_div_10_Template_button_click_8_listener() {
      const member_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeMember(member_r2.id));
    });
    \u0275\u0275text(9, " Remove ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const member_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(member_r2.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", member_r2.isTeamLead);
  }
}
var TeamSetupComponent = class _TeamSetupComponent {
  router;
  constructor(router) {
    this.router = router;
  }
  name = "";
  members = [];
  addMember() {
    if (!this.name.trim())
      return;
    const newMember = {
      id: crypto.randomUUID(),
      name: this.name.trim(),
      isTeamLead: false
    };
    this.members.push(newMember);
    this.name = "";
  }
  setTeamLead(id) {
    this.members.forEach((member) => {
      member.isTeamLead = member.id === id;
    });
  }
  removeMember(id) {
    this.members = this.members.filter((m) => m.id !== id);
  }
  canProceed() {
    const hasMembers = this.members.length > 0;
    const hasLead = this.members.some((m) => m.isTeamLead);
    return hasMembers && hasLead;
  }
  goToHome() {
    if (!this.canProceed())
      return;
    localStorage.setItem("teamMembers", JSON.stringify(this.members));
    this.router.navigate(["/home"]);
  }
  static \u0275fac = function TeamSetupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamSetupComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamSetupComponent, selectors: [["app-team-setup"]], decls: 13, vars: 4, consts: [[1, "container"], [1, "subtitle"], [1, "input-section"], ["type", "text", "placeholder", "Type a name here", 3, "ngModelChange", "keyup.enter", "ngModel"], [3, "click"], ["class", "member-list", 4, "ngIf"], ["class", "member-card", 4, "ngFor", "ngForOf"], [1, "done-btn", 3, "click", "disabled"], [1, "member-list"], [1, "member-card"], [1, "member-info"], ["class", "lead-badge", 4, "ngIf"], [1, "member-actions"], [1, "delete", 3, "click"], [1, "lead-badge"]], template: function TeamSetupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2, "\u{1F44B} Welcome! Let's set up your team.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 1);
      \u0275\u0275text(4, " Add the people on your team. Pick one person as the Team Lead. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 2)(6, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function TeamSetupComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function TeamSetupComponent_Template_input_keyup_enter_6_listener() {
        return ctx.addMember();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function TeamSetupComponent_Template_button_click_7_listener() {
        return ctx.addMember();
      });
      \u0275\u0275text(8, "Add This Person");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, TeamSetupComponent_div_9_Template, 2, 0, "div", 5)(10, TeamSetupComponent_div_10_Template, 10, 2, "div", 6);
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function TeamSetupComponent_Template_button_click_11_listener() {
        return ctx.goToHome();
      });
      \u0275\u0275text(12, " Done \u2014 Go to Home Screen ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.name);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.members.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.members);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.canProceed());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\nbody[_ngcontent-%COMP%] {\n  background-color: #0f172a;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 700px;\n  margin: 60px auto;\n  padding: 20px;\n  color: white;\n  font-family: Arial, sans-serif;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: bold;\n  color: #2563eb;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  margin-bottom: 30px;\n}\n.input-section[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 20px;\n}\ninput[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  border-radius: 8px 0 0 8px;\n  border: none;\n  font-size: 14px;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.input-section[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-radius: 0 8px 8px 0;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n.member-list[_ngcontent-%COMP%] {\n  background-color: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n  color: #94a3b8;\n}\n.member-card[_ngcontent-%COMP%] {\n  background-color: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.member-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n}\n.member-actions[_ngcontent-%COMP%]   .delete[_ngcontent-%COMP%] {\n  background-color: #dc2626;\n  color: white;\n}\n.member-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(.delete) {\n  background-color: #2563eb;\n  color: white;\n}\n.lead-badge[_ngcontent-%COMP%] {\n  background-color: #16a34a;\n  padding: 4px 8px;\n  border-radius: 6px;\n  margin-left: 10px;\n  font-size: 12px;\n}\n.done-btn[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  padding: 14px 20px;\n  width: 100%;\n  border-radius: 10px;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}\n.done-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #475569;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=team-setup.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamSetupComponent, [{
    type: Component,
    args: [{ selector: "app-team-setup", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="container">\r
\r
  <h1>\u{1F44B} Welcome! Let's set up your team.</h1>\r
  <p class="subtitle">\r
    Add the people on your team. Pick one person as the Team Lead.\r
  </p>\r
\r
  <div class="input-section">\r
    <input\r
      type="text"\r
      [(ngModel)]="name"\r
      placeholder="Type a name here"\r
      (keyup.enter)="addMember()"\r
    />\r
    <button (click)="addMember()">Add This Person</button>\r
  </div>\r
\r
  <div class="member-list" *ngIf="members.length === 0">\r
    No team members added yet.\r
  </div>\r
\r
  <div class="member-card" *ngFor="let member of members">\r
    <div class="member-info">\r
      <span>{{ member.name }}</span>\r
      <span *ngIf="member.isTeamLead" class="lead-badge">Team Lead</span>\r
    </div>\r
\r
    <div class="member-actions">\r
      <button (click)="setTeamLead(member.id)">\r
        Make Lead\r
      </button>\r
      <button class="delete" (click)="removeMember(member.id)">\r
        Remove\r
      </button>\r
    </div>\r
  </div>\r
\r
  <button\r
    class="done-btn"\r
    [disabled]="!canProceed()"\r
      (click)="goToHome()">\r
\r
    Done \u2014 Go to Home Screen\r
  </button>\r
\r
</div>`, styles: ["/* src/app/pages/team-setup/team-setup.css */\nbody {\n  background-color: #0f172a;\n}\n.container {\n  max-width: 700px;\n  margin: 60px auto;\n  padding: 20px;\n  color: white;\n  font-family: Arial, sans-serif;\n}\nh1 {\n  font-size: 28px;\n  font-weight: bold;\n  color: #2563eb;\n}\n.subtitle {\n  color: #94a3b8;\n  margin-bottom: 30px;\n}\n.input-section {\n  display: flex;\n  margin-bottom: 20px;\n}\ninput {\n  flex: 1;\n  padding: 12px;\n  border-radius: 8px 0 0 8px;\n  border: none;\n  font-size: 14px;\n}\ninput:focus {\n  outline: none;\n}\n.input-section button {\n  padding: 12px 20px;\n  border-radius: 0 8px 8px 0;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n.member-list {\n  background-color: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n  color: #94a3b8;\n}\n.member-card {\n  background-color: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.member-actions button {\n  margin-left: 10px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n}\n.member-actions .delete {\n  background-color: #dc2626;\n  color: white;\n}\n.member-actions button:not(.delete) {\n  background-color: #2563eb;\n  color: white;\n}\n.lead-badge {\n  background-color: #16a34a;\n  padding: 4px 8px;\n  border-radius: 6px;\n  margin-left: 10px;\n  font-size: 12px;\n}\n.done-btn {\n  margin-top: 30px;\n  padding: 14px 20px;\n  width: 100%;\n  border-radius: 10px;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}\n.done-btn:disabled {\n  background-color: #475569;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=team-setup.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamSetupComponent, { className: "TeamSetupComponent", filePath: "src/app/pages/team-setup/team-setup.ts", lineNumber: 20 });
})();

// src/app/features/home/home.ts
function HomeComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, ' No planning weeks yet. Click "Start a New Week" to begin! ');
    \u0275\u0275elementEnd();
  }
}
var HomeComponent = class _HomeComponent {
  teamLeadName = "";
  hasActivePlan = false;
  ngOnInit() {
    const stored = localStorage.getItem("teamMembers");
    if (!stored)
      return;
    const members = JSON.parse(stored);
    const lead = members.find((m) => m.isTeamLead);
    if (lead) {
      this.teamLeadName = lead.name;
    }
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 30, vars: 2, consts: [[1, "page"], [1, "container"], [1, "user-greeting"], [1, "role-chip"], ["class", "banner", 4, "ngIf"], [1, "grid"], ["routerLink", "/planning/new", 1, "cardBtn"], [1, "cardTitle"], [1, "cardDesc"], ["routerLink", "/backlog", 1, "cardBtn"], ["routerLink", "/team", 1, "cardBtn"], ["routerLink", "/history", 1, "cardBtn"], [1, "banner"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "What do you want to do?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementStart(6, "span", 3);
      \u0275\u0275text(7, "Team Lead");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, HomeComponent_div_8_Template, 2, 0, "div", 4);
      \u0275\u0275elementStart(9, "div", 5)(10, "a", 6)(11, "div", 7);
      \u0275\u0275text(12, "\u{1F680} Start a New Week");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 8);
      \u0275\u0275text(14, "Set up a new planning cycle.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "a", 9)(16, "div", 7);
      \u0275\u0275text(17, "\u{1F4CB} Manage Backlog");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "p", 8);
      \u0275\u0275text(19, "Add, edit, or browse work items.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "a", 10)(21, "div", 7);
      \u0275\u0275text(22, "\u{1F465} Manage Team Members");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p", 8);
      \u0275\u0275text(24, "Add or remove team members.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "a", 11)(26, "div", 7);
      \u0275\u0275text(27, "\u{1F5D3}\uFE0F View Past Weeks");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p", 8);
      \u0275\u0275text(29, "Look at completed planning cycles.");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" Hi, ", ctx.teamLeadName, "! ");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", !ctx.hasActivePlan);
    }
  }, dependencies: [CommonModule, NgIf, RouterLink], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #0b1220;\n  color: #e5e7eb;\n  padding: 0;\n  margin: 0;\n  font-family: system-ui;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 24px 16px 40px;\n}\n.user-greeting[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  opacity: 0.9;\n}\n.role-chip[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n  color: #111;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n.banner[_ngcontent-%COMP%] {\n  background: #0f274a;\n  border: 1px solid #1e3a8a;\n  border-left: 6px solid #3b82f6;\n  border-radius: 10px;\n  padding: 14px 16px;\n  margin: 16px 0 18px;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n.cardBtn[_ngcontent-%COMP%] {\n  background: #111827;\n  border: 1px solid #243041;\n  border-radius: 12px;\n  padding: 24px;\n  text-decoration: none;\n  color: inherit;\n  text-align: left;\n  transition: all 0.2s;\n  display: block;\n}\n.cardBtn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: #3b82f6;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.cardTitle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  margin: 0 0 6px;\n}\n.cardDesc[_ngcontent-%COMP%] {\n  opacity: 0.8;\n  margin: 0;\n  font-size: 14px;\n}\n.bottom-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  margin-top: 32px;\n  flex-wrap: wrap;\n}\n.bottom-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: 1px solid #374151;\n  background: #1f2937;\n  color: white;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n}\n.danger[_ngcontent-%COMP%] {\n  background: #ef4444 !important;\n  border-color: #dc2626;\n}\n@media (max-width: 800px) {\n  .grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=home.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [CommonModule, RouterLink], template: '<div class="page">\r\n  <div class="container">\r\n    <h1>What do you want to do?</h1>\r\n    <div class="user-greeting">\r\n      Hi, {{teamLeadName}}! \r\n      <span class="role-chip">Team Lead</span>\r\n    </div>\r\n\r\n    <div class="banner" *ngIf="!hasActivePlan">\r\n      No planning weeks yet. Click "Start a New Week" to begin!\r\n    </div>\r\n\r\n    <div class="grid">\r\n      <a routerLink="/planning/new" class="cardBtn">\r\n        <div class="cardTitle">\u{1F680} Start a New Week</div>\r\n        <p class="cardDesc">Set up a new planning cycle.</p>\r\n      </a>\r\n      <a routerLink="/backlog" class="cardBtn">\r\n        <div class="cardTitle">\u{1F4CB} Manage Backlog</div>\r\n        <p class="cardDesc">Add, edit, or browse work items.</p>\r\n      </a>\r\n      <a routerLink="/team" class="cardBtn">\r\n        <div class="cardTitle">\u{1F465} Manage Team Members</div>\r\n        <p class="cardDesc">Add or remove team members.</p>\r\n      </a>\r\n      <a routerLink="/history" class="cardBtn">\r\n        <div class="cardTitle">\u{1F5D3}\uFE0F View Past Weeks</div>\r\n        <p class="cardDesc">Look at completed planning cycles.</p>\r\n      </a>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/home/home.css */\n.page {\n  min-height: 100vh;\n  background: #0b1220;\n  color: #e5e7eb;\n  padding: 0;\n  margin: 0;\n  font-family: system-ui;\n}\n.container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 24px 16px 40px;\n}\n.user-greeting {\n  margin-top: 6px;\n  opacity: 0.9;\n}\n.role-chip {\n  padding: 2px 8px;\n  border-radius: 999px;\n  background: #f59e0b;\n  color: #111;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n.banner {\n  background: #0f274a;\n  border: 1px solid #1e3a8a;\n  border-left: 6px solid #3b82f6;\n  border-radius: 10px;\n  padding: 14px 16px;\n  margin: 16px 0 18px;\n}\n.grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n.cardBtn {\n  background: #111827;\n  border: 1px solid #243041;\n  border-radius: 12px;\n  padding: 24px;\n  text-decoration: none;\n  color: inherit;\n  text-align: left;\n  transition: all 0.2s;\n  display: block;\n}\n.cardBtn:hover {\n  transform: translateY(-2px);\n  border-color: #3b82f6;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.cardTitle {\n  font-size: 18px;\n  font-weight: 700;\n  margin: 0 0 6px;\n}\n.cardDesc {\n  opacity: 0.8;\n  margin: 0;\n  font-size: 14px;\n}\n.bottom-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  margin-top: 32px;\n  flex-wrap: wrap;\n}\n.bottom-actions button {\n  padding: 10px 20px;\n  border: 1px solid #374151;\n  background: #1f2937;\n  color: white;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n}\n.danger {\n  background: #ef4444 !important;\n  border-color: #dc2626;\n}\n@media (max-width: 800px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=home.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/features/home/home.ts", lineNumber: 19 });
})();

// src/app/app.routes.ts
var routes = [
  { path: "", component: TeamSetupComponent },
  { path: "home", component: HomeComponent },
  { path: "backlog", component: BacklogComponent },
  {
    path: "planning/new",
    loadComponent: () => import("./chunk-YVUM7K5L.js").then((m) => m.PlanningComponent)
  },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-776JY4E7.js").then((m) => m.DashboardComponent)
  },
  {
    path: "review",
    loadComponent: () => import("./chunk-T2DM7KDH.js").then((m) => m.ReviewComponent)
  },
  {
    path: "backlog",
    loadComponent: () => import("./chunk-WRNEUEHZ.js").then((m) => m.BacklogComponent)
  },
  {
    path: "team",
    loadComponent: () => import("./chunk-MESVBDBI.js").then((m) => m.TeamComponent)
  },
  { path: "**", redirectTo: "" }
  // Fallback to home
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ]
};

// src/app/shared/navbar/navbar.ts
function NavbarComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, " Lead ");
    \u0275\u0275elementEnd();
  }
}
var NavbarComponent = class _NavbarComponent {
  api;
  userName = "";
  isLead = false;
  darkMode = false;
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    this.api.getUserProfile().subscribe((data) => {
      this.userName = data.name;
      this.isLead = data.role === "Team Lead";
    });
  }
  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("light-theme");
  }
  static \u0275fac = function NavbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavbarComponent)(\u0275\u0275directiveInject(PlannerApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavbarComponent, selectors: [["app-navbar"]], decls: 11, vars: 3, consts: [[1, "navbar"], ["routerLink", "/home", 1, "logo"], [1, "right-section"], [1, "user-pill"], ["class", "lead-badge", 4, "ngIf"], ["routerLink", "/home"], [1, "toggle-btn", 3, "click"], [1, "lead-badge"]], template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
      \u0275\u0275text(2, " \u{1F4C4} Weekly Plan Tracker ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "span", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, NavbarComponent_span_6_Template, 2, 0, "span", 4);
      \u0275\u0275elementStart(7, "a", 5);
      \u0275\u0275text(8, "\u{1F3E0} Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function NavbarComponent_Template_button_click_9_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.userName, " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLead);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.darkMode ? "\u2600 Light" : "\u{1F319} Dark", " ");
    }
  }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink], styles: ["\n\n.navbar[_ngcontent-%COMP%] {\n  background: #2c4464;\n  color: white;\n  padding: 14px 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.logo[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 18px;\n  cursor: pointer;\n}\n.right-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.user-pill[_ngcontent-%COMP%] {\n  background: #cbd5e1;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n}\n.lead-badge[_ngcontent-%COMP%] {\n  background: #facc15;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: bold;\n}\n.right-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n}\n.right-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  cursor: pointer;\n}\n/*# sourceMappingURL=navbar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarComponent, [{
    type: Component,
    args: [{ selector: "app-navbar", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="navbar">\r
\r
  <a class="logo" routerLink="/home">\r
    \u{1F4C4} Weekly Plan Tracker\r
  </a>\r
\r
  <div class="right-section">\r
\r
    <span class="user-pill">\r
      {{ userName }}\r
    </span>\r
\r
    <span *ngIf="isLead" class="lead-badge">\r
      Lead\r
    </span>\r
\r
    <a routerLink="/home">\u{1F3E0} Home</a>\r
\r
    <button class="toggle-btn" (click)="toggleTheme()">\r
      {{ darkMode ? '\u2600 Light' : '\u{1F319} Dark' }}\r
    </button>\r
\r
  </div>\r
\r
</div>`, styles: ["/* src/app/shared/navbar/navbar.css */\n.navbar {\n  background: #2c4464;\n  color: white;\n  padding: 14px 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.logo {\n  font-weight: bold;\n  font-size: 18px;\n  cursor: pointer;\n}\n.right-section {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.user-pill {\n  background: #cbd5e1;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n}\n.lead-badge {\n  background: #facc15;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: bold;\n}\n.right-section a {\n  color: white;\n  text-decoration: none;\n}\n.right-section a:hover {\n  text-decoration: underline;\n}\n.toggle-btn {\n  background: none;\n  border: none;\n  color: white;\n  cursor: pointer;\n}\n/*# sourceMappingURL=navbar.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src/app/shared/navbar/navbar.ts", lineNumber: 13 });
})();

// src/app/shared/footer/footer.ts
var FooterComponent = class _FooterComponent {
  resetApp() {
    localStorage.clear();
    location.reload();
  }
  static \u0275fac = function FooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], decls: 9, vars: 0, consts: [[1, "footer"], [1, "danger", 3, "click"]], template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "footer", 0)(1, "button");
      \u0275\u0275text(2, "\u{1F4E5} Download My Data");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button");
      \u0275\u0275text(4, "\u{1F4E4} Load Data from File");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "button");
      \u0275\u0275text(6, "\u{1F331} Seed Sample Data");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "button", 1);
      \u0275\u0275domListener("click", function FooterComponent_Template_button_click_7_listener() {
        return ctx.resetApp();
      });
      \u0275\u0275text(8, " \u{1F5D1} Reset App ");
      \u0275\u0275domElementEnd()();
    }
  }, dependencies: [CommonModule], styles: ["\n\n.footer[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 15px;\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n}\n.footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #334155;\n  border: none;\n  padding: 8px 14px;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}\n.footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #475569;\n}\n.footer[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n/*# sourceMappingURL=footer.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterComponent, [{
    type: Component,
    args: [{ selector: "app-footer", standalone: true, imports: [CommonModule], template: '<footer class="footer">\r\n\r\n  <button>\u{1F4E5} Download My Data</button>\r\n  <button>\u{1F4E4} Load Data from File</button>\r\n  <button>\u{1F331} Seed Sample Data</button>\r\n\r\n  <button class="danger" (click)="resetApp()">\r\n    \u{1F5D1} Reset App\r\n  </button>\r\n\r\n</footer>', styles: ["/* src/app/shared/footer/footer.css */\n.footer {\n  background: #1e293b;\n  padding: 15px;\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n}\n.footer button {\n  background: #334155;\n  border: none;\n  padding: 8px 14px;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}\n.footer button:hover {\n  background: #475569;\n}\n.footer .danger {\n  background: #ef4444;\n}\n/*# sourceMappingURL=footer.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src/app/shared/footer/footer.ts", lineNumber: 11 });
})();

// src/app/app.ts
var AppComponent = class _AppComponent {
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "layout"], [1, "content"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-navbar");
      \u0275\u0275elementStart(2, "div", 1);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(4, "app-footer");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [RouterOutlet, NavbarComponent, FooterComponent], styles: ["\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: #0f172a;\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet, NavbarComponent, FooterComponent], template: `
    <div class="layout">
      <app-navbar></app-navbar>

      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <app-footer></app-footer>
    </div>
  `, styles: ["/* angular:styles/component:css;f2312efdba1b20c8d556a1a2947659d2f0f757e0d9d104f1007c6f88b3cc33e0;C:/Users/Sai/Desktop/New folder/weekly_plan_tracker/Frontend/weekly-planner-ui/src/app/app.ts */\n.layout {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: #0f172a;\n}\n.content {\n  flex: 1;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.ts", lineNumber: 34 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
