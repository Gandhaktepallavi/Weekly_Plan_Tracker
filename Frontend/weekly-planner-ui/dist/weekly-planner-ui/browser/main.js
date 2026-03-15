import {
  BacklogComponent
} from "./chunk-Q4UTYR3U.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-MH2EF65G.js";
import {
  PlannerApiService
} from "./chunk-3C2OS2CR.js";
import {
  CommonModule,
  Component,
  NavigationEnd,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  filter,
  forkJoin,
  provideBrowserGlobalErrorListeners,
  provideClientHydration,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  withEventReplay,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-PYXMBAFL.js";

// src/app/pages/team-setup/team-setup.ts
function TeamSetupComponent_ng_container_1_button_6_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "Team Lead");
    \u0275\u0275elementEnd();
  }
}
function TeamSetupComponent_ng_container_1_button_6_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Team Member");
    \u0275\u0275elementEnd();
  }
}
function TeamSetupComponent_ng_container_1_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function TeamSetupComponent_ng_container_1_button_6_Template_button_click_0_listener() {
      const member_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.chooseMember(member_r2));
    });
    \u0275\u0275elementStart(1, "div", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, TeamSetupComponent_ng_container_1_button_6_span_3_Template, 2, 0, "span", 8)(4, TeamSetupComponent_ng_container_1_button_6_span_4_Template, 2, 0, "span", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.selectedUserId === member_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(member_r2.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", member_r2.isTeamLead);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !member_r2.isTeamLead);
  }
}
function TeamSetupComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "h1");
    \u0275\u0275text(2, "Who are you?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 3);
    \u0275\u0275text(4, "Click your name to get started.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 4);
    \u0275\u0275template(6, TeamSetupComponent_ng_container_1_button_6_Template, 5, 5, "button", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r2.members);
  }
}
function TeamSetupComponent_ng_template_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1, " No team members added yet. ");
    \u0275\u0275elementEnd();
  }
}
function TeamSetupComponent_ng_template_2_div_9_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "Team Lead");
    \u0275\u0275elementEnd();
  }
}
function TeamSetupComponent_ng_template_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, TeamSetupComponent_ng_template_2_div_9_span_4_Template, 2, 0, "span", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 21)(6, "button", 14);
    \u0275\u0275listener("click", function TeamSetupComponent_ng_template_2_div_9_Template_button_click_6_listener() {
      const member_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTeamLead(member_r6.id));
    });
    \u0275\u0275text(7, " Make Lead ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 22);
    \u0275\u0275listener("click", function TeamSetupComponent_ng_template_2_div_9_Template_button_click_8_listener() {
      const member_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeMember(member_r6.id));
    });
    \u0275\u0275text(9, " Remove ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const member_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(member_r6.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", member_r6.isTeamLead);
  }
}
function TeamSetupComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h1");
    \u0275\u0275text(1, "?? Welcome! Let's set up your team.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 3);
    \u0275\u0275text(3, " Add the people on your team. Pick one person as the Team Lead. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 12)(5, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function TeamSetupComponent_ng_template_2_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.name, $event) || (ctx_r2.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function TeamSetupComponent_ng_template_2_Template_input_keyup_enter_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addMember());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 14);
    \u0275\u0275listener("click", function TeamSetupComponent_ng_template_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addMember());
    });
    \u0275\u0275text(7, "Add This Person");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TeamSetupComponent_ng_template_2_div_8_Template, 2, 0, "div", 15)(9, TeamSetupComponent_ng_template_2_div_9_Template, 10, 2, "div", 16);
    \u0275\u0275elementStart(10, "button", 17);
    \u0275\u0275listener("click", function TeamSetupComponent_ng_template_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToHome());
    });
    \u0275\u0275text(11, " Done - Go to Home Screen ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r2.members.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.members);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canProceed());
  }
}
var TeamSetupComponent = class _TeamSetupComponent {
  router;
  constructor(router) {
    this.router = router;
  }
  name = "";
  members = [];
  selectedUserId = "";
  ngOnInit() {
    const storedMembers = localStorage.getItem("teamMembers");
    if (storedMembers) {
      this.members = JSON.parse(storedMembers);
    }
    const activeUserRaw = localStorage.getItem("activeUser");
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw);
      this.selectedUserId = activeUser.id ?? "";
    }
  }
  get hasExistingMembers() {
    return this.members.length > 0;
  }
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
  chooseMember(member) {
    this.selectedUserId = member.id;
    localStorage.setItem("activeUser", JSON.stringify(member));
    if (member.isTeamLead) {
      this.router.navigate(["/home"]);
      return;
    }
    this.router.navigate(["/planning/new"]);
  }
  static \u0275fac = function TeamSetupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamSetupComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamSetupComponent, selectors: [["app-team-setup"]], decls: 4, vars: 2, consts: [["setupBlock", ""], [1, "container"], [4, "ngIf", "ngIfElse"], [1, "subtitle"], [1, "member-grid"], ["type", "button", "class", "member-card selectable", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "member-card", "selectable", 3, "click"], [1, "member-name"], ["class", "lead-badge", 4, "ngIf"], ["class", "member-badge", 4, "ngIf"], [1, "lead-badge"], [1, "member-badge"], [1, "input-section"], ["type", "text", "placeholder", "Type a name here", 3, "ngModelChange", "keyup.enter", "ngModel"], [3, "click"], ["class", "member-list", 4, "ngIf"], ["class", "member-card", 4, "ngFor", "ngForOf"], [1, "done-btn", 3, "click", "disabled"], [1, "member-list"], [1, "member-card"], [1, "member-info"], [1, "member-actions"], [1, "delete", 3, "click"]], template: function TeamSetupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275template(1, TeamSetupComponent_ng_container_1_Template, 7, 1, "ng-container", 2)(2, TeamSetupComponent_ng_template_2_Template, 12, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const setupBlock_r7 = \u0275\u0275reference(3);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.hasExistingMembers)("ngIfElse", setupBlock_r7);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\nbody[_ngcontent-%COMP%] {\n  background-color: #0f172a;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 36px auto;\n  padding: 20px;\n  color: white;\n  font-family: Arial, sans-serif;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 52px;\n  font-weight: 800;\n  color: #ffffff;\n  margin: 0 0 6px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #dbeafe;\n  margin-bottom: 26px;\n  font-size: 36px;\n  font-weight: 600;\n}\n.member-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 18px;\n  max-width: 1200px;\n}\n.member-card[_ngcontent-%COMP%] {\n  background-color: #0f172a;\n  padding: 24px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border: 1px solid #e2e8f0;\n}\n.member-card.selectable[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n  min-height: 124px;\n  cursor: pointer;\n  transition: border-color 0.2s ease, transform 0.2s ease;\n}\n.member-card.selectable[_ngcontent-%COMP%]:hover {\n  border-color: #60a5fa;\n  transform: translateY(-2px);\n}\n.member-card.selectable.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.45);\n}\n.member-name[_ngcontent-%COMP%] {\n  font-size: 42px;\n  font-weight: 700;\n  color: #ffffff;\n}\n.input-section[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 20px;\n}\ninput[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  border-radius: 8px 0 0 8px;\n  border: none;\n  font-size: 14px;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.input-section[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-radius: 0 8px 8px 0;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n.member-list[_ngcontent-%COMP%] {\n  background-color: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n  color: #94a3b8;\n}\n.member-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n}\n.member-actions[_ngcontent-%COMP%]   .delete[_ngcontent-%COMP%] {\n  background-color: #dc2626;\n  color: white;\n}\n.member-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(.delete) {\n  background-color: #2563eb;\n  color: white;\n}\n.lead-badge[_ngcontent-%COMP%] {\n  background-color: #facc15;\n  color: #111827;\n  padding: 6px 12px;\n  border-radius: 10px;\n  font-size: 22px;\n  font-weight: 700;\n}\n.member-badge[_ngcontent-%COMP%] {\n  background-color: #38bdf8;\n  color: #082f49;\n  padding: 6px 12px;\n  border-radius: 10px;\n  font-size: 22px;\n  font-weight: 700;\n}\n.done-btn[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  padding: 14px 20px;\n  width: 100%;\n  border-radius: 10px;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}\n.done-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #475569;\n  cursor: not-allowed;\n}\n@media (max-width: 900px) {\n  h1[_ngcontent-%COMP%] {\n    font-size: 36px;\n  }\n  .subtitle[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .member-name[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n  .lead-badge[_ngcontent-%COMP%], \n   .member-badge[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=team-setup.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamSetupComponent, [{
    type: Component,
    args: [{ selector: "app-team-setup", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="container">
  <ng-container *ngIf="hasExistingMembers; else setupBlock">
    <h1>Who are you?</h1>
    <p class="subtitle">Click your name to get started.</p>

    <div class="member-grid">
      <button
        type="button"
        class="member-card selectable"
        *ngFor="let member of members"
        [class.selected]="selectedUserId === member.id"
        (click)="chooseMember(member)">
        <div class="member-name">{{ member.name }}</div>
        <span *ngIf="member.isTeamLead" class="lead-badge">Team Lead</span>
        <span *ngIf="!member.isTeamLead" class="member-badge">Team Member</span>
      </button>
    </div>
  </ng-container>

  <ng-template #setupBlock>
    <h1>?? Welcome! Let's set up your team.</h1>
    <p class="subtitle">
      Add the people on your team. Pick one person as the Team Lead.
    </p>

    <div class="input-section">
      <input
        type="text"
        [(ngModel)]="name"
        placeholder="Type a name here"
        (keyup.enter)="addMember()"
      />
      <button (click)="addMember()">Add This Person</button>
    </div>

    <div class="member-list" *ngIf="members.length === 0">
      No team members added yet.
    </div>

    <div class="member-card" *ngFor="let member of members">
      <div class="member-info">
        <span>{{ member.name }}</span>
        <span *ngIf="member.isTeamLead" class="lead-badge">Team Lead</span>
      </div>

      <div class="member-actions">
        <button (click)="setTeamLead(member.id)">
          Make Lead
        </button>
        <button class="delete" (click)="removeMember(member.id)">
          Remove
        </button>
      </div>
    </div>

    <button
      class="done-btn"
      [disabled]="!canProceed()"
      (click)="goToHome()">
      Done - Go to Home Screen
    </button>
  </ng-template>
</div>\r
`, styles: ["/* src/app/pages/team-setup/team-setup.css */\nbody {\n  background-color: #0f172a;\n}\n.container {\n  max-width: 1100px;\n  margin: 36px auto;\n  padding: 20px;\n  color: white;\n  font-family: Arial, sans-serif;\n}\nh1 {\n  font-size: 52px;\n  font-weight: 800;\n  color: #ffffff;\n  margin: 0 0 6px;\n}\n.subtitle {\n  color: #dbeafe;\n  margin-bottom: 26px;\n  font-size: 36px;\n  font-weight: 600;\n}\n.member-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 18px;\n  max-width: 1200px;\n}\n.member-card {\n  background-color: #0f172a;\n  padding: 24px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border: 1px solid #e2e8f0;\n}\n.member-card.selectable {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n  min-height: 124px;\n  cursor: pointer;\n  transition: border-color 0.2s ease, transform 0.2s ease;\n}\n.member-card.selectable:hover {\n  border-color: #60a5fa;\n  transform: translateY(-2px);\n}\n.member-card.selectable.selected {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.45);\n}\n.member-name {\n  font-size: 42px;\n  font-weight: 700;\n  color: #ffffff;\n}\n.input-section {\n  display: flex;\n  margin-bottom: 20px;\n}\ninput {\n  flex: 1;\n  padding: 12px;\n  border-radius: 8px 0 0 8px;\n  border: none;\n  font-size: 14px;\n}\ninput:focus {\n  outline: none;\n}\n.input-section button {\n  padding: 12px 20px;\n  border-radius: 0 8px 8px 0;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n.member-list {\n  background-color: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n  color: #94a3b8;\n}\n.member-actions button {\n  margin-left: 10px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n}\n.member-actions .delete {\n  background-color: #dc2626;\n  color: white;\n}\n.member-actions button:not(.delete) {\n  background-color: #2563eb;\n  color: white;\n}\n.lead-badge {\n  background-color: #facc15;\n  color: #111827;\n  padding: 6px 12px;\n  border-radius: 10px;\n  font-size: 22px;\n  font-weight: 700;\n}\n.member-badge {\n  background-color: #38bdf8;\n  color: #082f49;\n  padding: 6px 12px;\n  border-radius: 10px;\n  font-size: 22px;\n  font-weight: 700;\n}\n.done-btn {\n  margin-top: 30px;\n  padding: 14px 20px;\n  width: 100%;\n  border-radius: 10px;\n  border: none;\n  background-color: #2563eb;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}\n.done-btn:disabled {\n  background-color: #475569;\n  cursor: not-allowed;\n}\n@media (max-width: 900px) {\n  h1 {\n    font-size: 36px;\n  }\n  .subtitle {\n    font-size: 26px;\n  }\n  .member-name {\n    font-size: 30px;\n  }\n  .lead-badge,\n  .member-badge {\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=team-setup.css.map */\n"] }]
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
    loadComponent: () => import("./chunk-YTJFJVO3.js").then((m) => m.PlanningComponent)
  },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-JIA6FY57.js").then((m) => m.DashboardComponent)
  },
  {
    path: "review",
    loadComponent: () => import("./chunk-OIJPHAGL.js").then((m) => m.ReviewComponent)
  },
  {
    path: "history",
    loadComponent: () => import("./chunk-TCGXCIM6.js").then((m) => m.HistoryComponent)
  },
  {
    path: "backlog",
    loadComponent: () => import("./chunk-GBHP4SBH.js").then((m) => m.BacklogComponent)
  },
  {
    path: "team",
    loadComponent: () => import("./chunk-XR6G43O3.js").then((m) => m.TeamComponent)
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
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Lead");
    \u0275\u0275elementEnd();
  }
}
var NavbarComponent = class _NavbarComponent {
  api;
  router;
  userName = "";
  isLead = false;
  darkMode = true;
  themeStorageKey = "weeklyplanner.theme";
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }
  ngOnInit() {
    this.loadProfile();
    this.initializeTheme();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.loadProfile());
  }
  loadProfile() {
    const activeUserRaw = localStorage.getItem("activeUser");
    if (activeUserRaw) {
      const activeUser = JSON.parse(activeUserRaw);
      this.userName = activeUser.name ?? "";
      this.isLead = !!activeUser.isTeamLead;
      return;
    }
    this.api.getUserProfile().subscribe({
      next: (data) => {
        this.userName = data.name;
        this.isLead = data.role === "Team Lead" || data.role === "Lead";
      },
      error: () => {
        this.userName = "";
        this.isLead = false;
      }
    });
  }
  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    localStorage.setItem(this.themeStorageKey, this.darkMode ? "dark" : "light");
  }
  initializeTheme() {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    this.darkMode = savedTheme !== "light";
    this.applyTheme();
  }
  applyTheme() {
    document.body.classList.toggle("light-theme", !this.darkMode);
  }
  static \u0275fac = function NavbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavbarComponent)(\u0275\u0275directiveInject(PlannerApiService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavbarComponent, selectors: [["app-navbar"]], decls: 13, vars: 3, consts: [[1, "navbar"], ["routerLink", "/home", 1, "logo"], [1, "right-section"], [1, "user-pill"], ["class", "lead-badge", 4, "ngIf"], ["routerLink", "/", 1, "switch-link"], ["routerLink", "/home"], [1, "toggle-btn", 3, "click"], [1, "lead-badge"]], template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
      \u0275\u0275text(2, "\u{1F4CB}Weekly Plan Tracker");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "span", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, NavbarComponent_span_6_Template, 2, 0, "span", 4);
      \u0275\u0275elementStart(7, "a", 5);
      \u0275\u0275text(8, "\u{1F504}Switch");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "a", 6);
      \u0275\u0275text(10, "\u{1F3E0} Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function NavbarComponent_Template_button_click_11_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.userName);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLead);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.darkMode ? " \u2600\uFE0FLight" : "\u{1F311}Dark", " ");
    }
  }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink], styles: ["\n\n.navbar[_ngcontent-%COMP%] {\n  background: #2c4464;\n  color: white;\n  padding: 14px 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.logo[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 18px;\n  cursor: pointer;\n  color: aliceblue;\n  text-decoration: none;\n}\n.right-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.user-pill[_ngcontent-%COMP%] {\n  background: #cbd5e1;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n}\n.lead-badge[_ngcontent-%COMP%] {\n  background: #facc15;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: bold;\n}\n.right-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n}\n.right-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.switch-link[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  cursor: pointer;\n}\n/*# sourceMappingURL=navbar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarComponent, [{
    type: Component,
    args: [{ selector: "app-navbar", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="navbar">
  <a class="logo" routerLink="/home">\u{1F4CB}Weekly Plan Tracker</a>

  <div class="right-section">
    <span class="user-pill">{{ userName }}</span>

    <span *ngIf="isLead" class="lead-badge">Lead</span>

    <a routerLink="/" class="switch-link">\u{1F504}Switch</a>
    <a routerLink="/home">\u{1F3E0} Home</a>

    <button class="toggle-btn" (click)="toggleTheme()">
      {{ darkMode ? ' \u2600\uFE0FLight' : '\u{1F311}Dark' }}
    </button>
  </div>
</div>
`, styles: ["/* src/app/shared/navbar/navbar.css */\n.navbar {\n  background: #2c4464;\n  color: white;\n  padding: 14px 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.logo {\n  font-weight: bold;\n  font-size: 18px;\n  cursor: pointer;\n  color: aliceblue;\n  text-decoration: none;\n}\n.right-section {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.user-pill {\n  background: #cbd5e1;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n}\n.lead-badge {\n  background: #facc15;\n  color: black;\n  padding: 4px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: bold;\n}\n.right-section a {\n  color: white;\n  text-decoration: none;\n}\n.right-section a:hover {\n  text-decoration: underline;\n}\n.switch-link {\n  font-weight: 600;\n}\n.toggle-btn {\n  background: none;\n  border: none;\n  color: white;\n  cursor: pointer;\n}\n/*# sourceMappingURL=navbar.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src/app/shared/navbar/navbar.ts", lineNumber: 15 });
})();

// src/app/shared/footer/footer.ts
function FooterComponent_div_9_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.selectedBackupFileName);
  }
}
function FooterComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "h3");
    \u0275\u0275text(4, "Load Data from a Backup File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 8);
    \u0275\u0275listener("click", function FooterComponent_div_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeLoadModal());
    });
    \u0275\u0275text(6, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 9)(8, "p");
    \u0275\u0275text(9, "Pick the backup file you saved before. This will replace all your current data.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 10);
    \u0275\u0275listener("change", function FooterComponent_div_9_Template_input_change_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackupFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, FooterComponent_div_9_div_11_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 12)(13, "button", 13);
    \u0275\u0275listener("click", function FooterComponent_div_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadDataFromFile());
    });
    \u0275\u0275text(14, " Yes, Replace My Data ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 14);
    \u0275\u0275listener("click", function FooterComponent_div_9_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeLoadModal());
    });
    \u0275\u0275text(16, "Cancel");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.selectedBackupFileName);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.selectedBackupFile || ctx_r1.isImporting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isImporting);
  }
}
function FooterComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "h3");
    \u0275\u0275text(4, "Seed Sample Data?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 8);
    \u0275\u0275listener("click", function FooterComponent_div_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSeedModal());
    });
    \u0275\u0275text(6, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 9)(8, "p");
    \u0275\u0275text(9, "This will add sample team members, backlog items, and a planning cycle. Existing data will not be erased.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 12)(11, "button", 16);
    \u0275\u0275listener("click", function FooterComponent_div_10_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.seedSampleData());
    });
    \u0275\u0275text(12, " Yes, Load Sample Data ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 14);
    \u0275\u0275listener("click", function FooterComponent_div_10_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSeedModal());
    });
    \u0275\u0275text(14, "No, Go Back");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r1.isImporting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isImporting);
  }
}
function FooterComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 18);
    \u0275\u0275listener("click", function FooterComponent_div_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeToast());
    });
    \u0275\u0275text(4, "x");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.toastMessage);
  }
}
var FooterComponent = class _FooterComponent {
  api;
  showToast = false;
  toastMessage = "";
  showLoadModal = false;
  showSeedModal = false;
  selectedBackupFile = null;
  selectedBackupFileName = "";
  isImporting = false;
  constructor(api) {
    this.api = api;
  }
  downloadMyData() {
    forkJoin({
      teamMembers: this.api.getTeamMembers(),
      backlog: this.api.getBacklog(),
      tasks: this.api.getTasks(),
      currentWeeklyPlan: this.api.getCurrentWeeklyPlan(),
      categorySettings: this.api.getCategorySettingsCurrent()
    }).subscribe({
      next: (data) => {
        const backup = {
          app: "Weekly Plan Tracker",
          exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
          data
        };
        const json = JSON.stringify(backup, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = this.buildBackupFileName();
        anchor.click();
        URL.revokeObjectURL(url);
        this.openToast("Your data was saved to a file.");
      },
      error: () => {
        this.openToast("Failed to export data. Please try again.");
      }
    });
  }
  resetApp() {
    localStorage.clear();
    location.reload();
  }
  openLoadModal() {
    this.showLoadModal = true;
    this.selectedBackupFile = null;
    this.selectedBackupFileName = "";
  }
  closeLoadModal() {
    this.showLoadModal = false;
  }
  openSeedModal() {
    this.showSeedModal = true;
  }
  closeSeedModal() {
    this.showSeedModal = false;
  }
  onBackupFileSelected(event) {
    const input = event.target;
    const file = input.files?.[0] ?? null;
    this.selectedBackupFile = file;
    this.selectedBackupFileName = file?.name ?? "";
  }
  loadDataFromFile() {
    if (!this.selectedBackupFile || this.isImporting) {
      return;
    }
    this.isImporting = true;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = String(reader.result ?? "{}");
        const parsed = JSON.parse(raw);
        const payload = parsed?.data ? { data: parsed.data } : { data: parsed };
        this.api.importBackup(payload).subscribe({
          next: () => {
            this.isImporting = false;
            this.closeLoadModal();
            this.openToast("Your data was loaded from file.");
            setTimeout(() => location.reload(), 1200);
          },
          error: () => {
            this.isImporting = false;
            this.openToast("Failed to load backup file.");
          }
        });
      } catch {
        this.isImporting = false;
        this.openToast("Invalid backup file format.");
      }
    };
    reader.onerror = () => {
      this.isImporting = false;
      this.openToast("Unable to read selected file.");
    };
    reader.readAsText(this.selectedBackupFile);
  }
  seedSampleData() {
    if (this.isImporting) {
      return;
    }
    this.isImporting = true;
    this.api.seedSampleData().subscribe({
      next: () => {
        this.seedLocalStorageMembers();
        this.isImporting = false;
        this.closeSeedModal();
        this.openToast("Sample data loaded! Pick a person to get started.");
        setTimeout(() => location.reload(), 1400);
      },
      error: () => {
        this.isImporting = false;
        this.openToast("Failed to load sample data.");
      }
    });
  }
  closeToast() {
    this.showToast = false;
  }
  openToast(message) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4e3);
  }
  buildBackupFileName() {
    const now = /* @__PURE__ */ new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `weeklyplantracker-backup-${yyyy}-${mm}-${dd}-${hh}${min}${ss}.json`;
  }
  seedLocalStorageMembers() {
    const existingRaw = localStorage.getItem("teamMembers");
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const sample = [
      { id: crypto.randomUUID(), name: "Alice Chen", isTeamLead: true },
      { id: crypto.randomUUID(), name: "Bob Martinez", isTeamLead: false },
      { id: crypto.randomUUID(), name: "Carol Singh", isTeamLead: false },
      { id: crypto.randomUUID(), name: "Dave Kim", isTeamLead: false }
    ];
    const merged = [...existing];
    for (const member of sample) {
      const already = merged.some((m) => (m.name || "").toLowerCase() === member.name.toLowerCase());
      if (!already) {
        merged.push(member);
      }
    }
    let leadSeen = false;
    for (const member of merged) {
      if (member.isTeamLead && !leadSeen) {
        leadSeen = true;
      } else if (member.isTeamLead && leadSeen) {
        member.isTeamLead = false;
      }
    }
    if (!leadSeen && merged.length > 0) {
      merged[0].isTeamLead = true;
    }
    localStorage.setItem("teamMembers", JSON.stringify(merged));
  }
  static \u0275fac = function FooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterComponent)(\u0275\u0275directiveInject(PlannerApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], decls: 12, vars: 3, consts: [[1, "footer"], [3, "click"], [1, "danger", 3, "click"], ["class", "modal-backdrop", 4, "ngIf"], ["class", "toast", 4, "ngIf"], [1, "modal-backdrop"], [1, "modal"], [1, "modal-header"], ["type", "button", 1, "icon-btn", 3, "click"], [1, "modal-body"], ["type", "file", "accept", ".json,application/json", 3, "change"], ["class", "file-name", 4, "ngIf"], [1, "modal-actions"], ["type", "button", 1, "danger", "soft", 3, "click", "disabled"], ["type", "button", 3, "click", "disabled"], [1, "file-name"], ["type", "button", 1, "primary", 3, "click", "disabled"], [1, "toast"], ["type", "button", 1, "toast-close", 3, "click"]], template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "footer", 0)(1, "button", 1);
      \u0275\u0275listener("click", function FooterComponent_Template_button_click_1_listener() {
        return ctx.downloadMyData();
      });
      \u0275\u0275text(2, "Download My Data");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "button", 1);
      \u0275\u0275listener("click", function FooterComponent_Template_button_click_3_listener() {
        return ctx.openLoadModal();
      });
      \u0275\u0275text(4, "Load Data from File");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 1);
      \u0275\u0275listener("click", function FooterComponent_Template_button_click_5_listener() {
        return ctx.openSeedModal();
      });
      \u0275\u0275text(6, "Seed Sample Data");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 2);
      \u0275\u0275listener("click", function FooterComponent_Template_button_click_7_listener() {
        return ctx.resetApp();
      });
      \u0275\u0275text(8, "Reset App");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, FooterComponent_div_9_Template, 17, 3, "div", 3)(10, FooterComponent_div_10_Template, 15, 2, "div", 3)(11, FooterComponent_div_11_Template, 5, 1, "div", 4);
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.showLoadModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showSeedModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showToast);
    }
  }, dependencies: [CommonModule, NgIf], styles: ["\n\n.footer[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 15px;\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n}\n.footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #334155;\n  border: none;\n  padding: 8px 14px;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}\n.footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #475569;\n}\n.footer[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 92px;\n  right: 24px;\n  z-index: 1200;\n  background: #d1fae5;\n  color: #1f2937;\n  border-left: 4px solid #10b981;\n  border-radius: 8px;\n  min-width: 300px;\n  padding: 12px 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.3);\n}\n.toast-close[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: #4b5563;\n  font-size: 16px;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(2, 6, 23, 0.65);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1300;\n}\n.modal[_ngcontent-%COMP%] {\n  width: min(620px, calc(100vw - 24px));\n  background: #f8fafc;\n  color: #0f172a;\n  border-radius: 8px;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 500;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-size: 20px;\n  color: #64748b;\n  cursor: pointer;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 18px 20px;\n}\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 16px;\n}\n.file-name[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  font-size: 13px;\n  color: #64748b;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  padding: 0 20px 18px;\n  display: flex;\n  gap: 12px;\n}\n.soft[_ngcontent-%COMP%] {\n  opacity: 0.85;\n}\n.modal-actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 10px 14px;\n  cursor: pointer;\n}\n.modal-actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n.modal-actions[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: #ffffff;\n}\n.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #d1d5db;\n  background: #f3f4f6;\n  color: #374151;\n  border-radius: 6px;\n  padding: 10px 14px;\n  cursor: pointer;\n}\n.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=footer.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterComponent, [{
    type: Component,
    args: [{ selector: "app-footer", standalone: true, imports: [CommonModule], template: '<footer class="footer">\n  <button (click)="downloadMyData()">Download My Data</button>\n  <button (click)="openLoadModal()">Load Data from File</button>\n  <button (click)="openSeedModal()">Seed Sample Data</button>\n  <button class="danger" (click)="resetApp()">Reset App</button>\n</footer>\n\n<div *ngIf="showLoadModal" class="modal-backdrop">\n  <div class="modal">\n    <div class="modal-header">\n      <h3>Load Data from a Backup File</h3>\n      <button class="icon-btn" type="button" (click)="closeLoadModal()">x</button>\n    </div>\n\n    <div class="modal-body">\n      <p>Pick the backup file you saved before. This will replace all your current data.</p>\n      <input type="file" accept=".json,application/json" (change)="onBackupFileSelected($event)" />\n      <div class="file-name" *ngIf="selectedBackupFileName">{{ selectedBackupFileName }}</div>\n    </div>\n\n    <div class="modal-actions">\n      <button\n        class="danger soft"\n        type="button"\n        [disabled]="!selectedBackupFile || isImporting"\n        (click)="loadDataFromFile()">\n        Yes, Replace My Data\n      </button>\n      <button type="button" [disabled]="isImporting" (click)="closeLoadModal()">Cancel</button>\n    </div>\n  </div>\n</div>\n\n<div *ngIf="showSeedModal" class="modal-backdrop">\n  <div class="modal">\n    <div class="modal-header">\n      <h3>Seed Sample Data?</h3>\n      <button class="icon-btn" type="button" (click)="closeSeedModal()">x</button>\n    </div>\n\n    <div class="modal-body">\n      <p>This will add sample team members, backlog items, and a planning cycle. Existing data will not be erased.</p>\n    </div>\n\n    <div class="modal-actions">\n      <button class="primary" type="button" [disabled]="isImporting" (click)="seedSampleData()">\n        Yes, Load Sample Data\n      </button>\n      <button type="button" [disabled]="isImporting" (click)="closeSeedModal()">No, Go Back</button>\n    </div>\n  </div>\n</div>\n\n<div *ngIf="showToast" class="toast">\n  <span>{{ toastMessage }}</span>\n  <button type="button" class="toast-close" (click)="closeToast()">x</button>\n</div>\n', styles: ["/* src/app/shared/footer/footer.css */\n.footer {\n  background: #1e293b;\n  padding: 15px;\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n}\n.footer button {\n  background: #334155;\n  border: none;\n  padding: 8px 14px;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}\n.footer button:hover {\n  background: #475569;\n}\n.footer .danger {\n  background: #ef4444;\n}\n.toast {\n  position: fixed;\n  top: 92px;\n  right: 24px;\n  z-index: 1200;\n  background: #d1fae5;\n  color: #1f2937;\n  border-left: 4px solid #10b981;\n  border-radius: 8px;\n  min-width: 300px;\n  padding: 12px 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.3);\n}\n.toast-close {\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: #4b5563;\n  font-size: 16px;\n}\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(2, 6, 23, 0.65);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1300;\n}\n.modal {\n  width: min(620px, calc(100vw - 24px));\n  background: #f8fafc;\n  color: #0f172a;\n  border-radius: 8px;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);\n  overflow: hidden;\n}\n.modal-header {\n  padding: 16px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-header h3 {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 500;\n}\n.icon-btn {\n  border: none;\n  background: transparent;\n  font-size: 20px;\n  color: #64748b;\n  cursor: pointer;\n}\n.modal-body {\n  padding: 18px 20px;\n}\n.modal-body p {\n  margin: 0 0 12px;\n  font-size: 16px;\n}\n.file-name {\n  margin-top: 10px;\n  font-size: 13px;\n  color: #64748b;\n}\n.modal-actions {\n  padding: 0 20px 18px;\n  display: flex;\n  gap: 12px;\n}\n.soft {\n  opacity: 0.85;\n}\n.modal-actions .primary {\n  background: #2563eb;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 10px 14px;\n  cursor: pointer;\n}\n.modal-actions .primary:hover {\n  background: #1d4ed8;\n}\n.modal-actions .danger {\n  background: #dc2626;\n  color: #ffffff;\n}\n.modal-actions button {\n  border: 1px solid #d1d5db;\n  background: #f3f4f6;\n  color: #374151;\n  border-radius: 6px;\n  padding: 10px 14px;\n  cursor: pointer;\n}\n.modal-actions button:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=footer.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src/app/shared/footer/footer.ts", lineNumber: 13 });
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
  }, dependencies: [RouterOutlet, NavbarComponent, FooterComponent], styles: ["\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: var(--app-bg);\n  color: var(--app-text);\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=app.css.map */"] });
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
  `, styles: ["/* angular:styles/component:css;cd88b44fa4996f3b82c343262ef330fe28b2b8bcaac4c559c92ef99ca0afd331;C:/Users/Sai/Desktop/WeeklyPlanner/Weekly_Plan_Tracker/Frontend/weekly-planner-ui/src/app/app.ts */\n.layout {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: var(--app-bg);\n  color: var(--app-text);\n}\n.content {\n  flex: 1;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.ts", lineNumber: 35 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
