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
  NgForOf,
  NgIf,
  RouterLink,
  __spreadProps,
  __spreadValues,
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
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-PYXMBAFL.js";

// src/app/features/team/team.ts
function TeamComponent_div_9_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Lead");
    \u0275\u0275elementEnd();
  }
}
function TeamComponent_div_9_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function TeamComponent_div_9_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const member_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.makeLead(member_r2));
    });
    \u0275\u0275text(1, " Make Lead ");
    \u0275\u0275elementEnd();
  }
}
function TeamComponent_div_9_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function TeamComponent_div_9_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const member_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deactivate(member_r2));
    });
    \u0275\u0275text(1, " Deactivate ");
    \u0275\u0275elementEnd();
  }
}
function TeamComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, TeamComponent_div_9_span_4_Template, 2, 0, "span", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 9)(6, "button", 4);
    \u0275\u0275listener("click", function TeamComponent_div_9_Template_button_click_6_listener() {
      const member_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editName(member_r2));
    });
    \u0275\u0275text(7, "Edit Name");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, TeamComponent_div_9_button_8_Template, 2, 0, "button", 10)(9, TeamComponent_div_9_button_9_Template, 2, 0, "button", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const member_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(member_r2.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", member_r2.isTeamLead);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !member_r2.isTeamLead);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !member_r2.isTeamLead);
  }
}
function TeamComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 15);
    \u0275\u0275listener("click", function TeamComponent_div_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeToast());
    });
    \u0275\u0275text(4, "x");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.toastMessage);
  }
}
var TeamComponent = class _TeamComponent {
  api;
  members = [];
  name = "";
  showToast = false;
  toastMessage = "";
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.loadMembers();
  }
  loadMembers() {
    this.api.getTeamMembers().subscribe((data) => {
      this.members = data ?? [];
      this.syncTeamMembersToLocalStorage();
    });
  }
  addMember() {
    if (!this.name.trim())
      return;
    const member = {
      name: this.name.trim()
    };
    this.api.addTeamMember(member).subscribe(() => {
      this.loadMembers();
      this.name = "";
      this.showSuccess("Team member added!");
    });
  }
  editName(member) {
    const updated = prompt("Edit name:", member.name);
    if (!updated)
      return;
    const updatedMember = __spreadProps(__spreadValues({}, member), { name: updated });
    this.api.updateMember(updatedMember).subscribe(() => {
      this.loadMembers();
      this.updateActiveUserName(updatedMember.id, updated.trim());
      this.showSuccess("Team member updated.");
    });
  }
  makeLead(member) {
    this.api.makeLead(member.id).subscribe(() => {
      this.loadMembers();
      this.updateActiveUserLead(member.id);
      this.showSuccess("Team lead updated.");
    });
  }
  deactivate(member) {
    if (member.isTeamLead) {
      return;
    }
    this.api.deactivateMember(member.id).subscribe(() => {
      this.loadMembers();
      this.removeInactiveUserFromActiveSelection(member.id);
      this.showSuccess("Team member deactivated.");
    });
  }
  closeToast() {
    this.showToast = false;
  }
  showSuccess(message) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2e3);
  }
  get activeMembers() {
    return this.members.filter((m) => m.isActive);
  }
  syncTeamMembersToLocalStorage() {
    const localMembers = this.activeMembers.map((member) => ({
      id: member.id,
      name: member.name,
      isTeamLead: member.isTeamLead
    }));
    localStorage.setItem("teamMembers", JSON.stringify(localMembers));
  }
  updateActiveUserName(memberId, newName) {
    const activeUserRaw = localStorage.getItem("activeUser");
    if (!activeUserRaw)
      return;
    const activeUser = JSON.parse(activeUserRaw);
    if (activeUser.id === memberId) {
      activeUser.name = newName;
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
    }
  }
  updateActiveUserLead(newLeadId) {
    const activeUserRaw = localStorage.getItem("activeUser");
    if (!activeUserRaw)
      return;
    const activeUser = JSON.parse(activeUserRaw);
    activeUser.isTeamLead = activeUser.id === newLeadId;
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
  }
  removeInactiveUserFromActiveSelection(memberId) {
    const activeUserRaw = localStorage.getItem("activeUser");
    if (!activeUserRaw)
      return;
    const activeUser = JSON.parse(activeUserRaw);
    if (activeUser.id === memberId) {
      localStorage.removeItem("activeUser");
    }
  }
  static \u0275fac = function TeamComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamComponent)(\u0275\u0275directiveInject(PlannerApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamComponent, selectors: [["app-team"]], decls: 11, vars: 3, consts: [[1, "container"], ["routerLink", "/home", 1, "home-btn"], [1, "input-row"], ["type", "text", "placeholder", "Type a name", 3, "ngModelChange", "ngModel"], [3, "click"], ["class", "member-card", 4, "ngFor", "ngForOf"], ["class", "toast", 4, "ngIf"], [1, "member-card"], ["class", "lead-badge", 4, "ngIf"], [1, "actions"], [3, "click", 4, "ngIf"], ["class", "danger", 3, "click", 4, "ngIf"], [1, "lead-badge"], [1, "danger", 3, "click"], [1, "toast"], ["type", "button", 1, "toast-close", 3, "click"]], template: function TeamComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275text(2, "? Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h2");
      \u0275\u0275text(4, "Manage Team Members");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 2)(6, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function TeamComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function TeamComponent_Template_button_click_7_listener() {
        return ctx.addMember();
      });
      \u0275\u0275text(8, "Save This Person");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, TeamComponent_div_9_Template, 10, 4, "div", 5)(10, TeamComponent_div_10_Template, 5, 1, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.name);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.activeMembers);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showToast);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 28px 40px;\n  color: #e5e7eb;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.home-btn[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  border: 1px solid #e2e8f0;\n  color: #334155;\n  padding: 8px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 8px 0 18px;\n}\n.input-row[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 16px;\n  background: #f8fafc;\n  padding: 10px;\n  border-radius: 12px;\n  border: 1px solid #dbe4f0;\n}\ninput[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  border-radius: 8px 0 0 8px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #1f2937;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n}\n.input-row[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border-radius: 0 8px 8px 0;\n  border: none;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n.member-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #1f2937;\n  padding: 18px;\n  border-radius: 12px;\n  margin-bottom: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border: 1px solid #dbe4f0;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  background: #f1f5f9;\n  color: #1e293b;\n  cursor: pointer;\n}\n.lead-badge[_ngcontent-%COMP%] {\n  background: #facc15;\n  color: #111827;\n  padding: 4px 8px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  margin-left: 8px;\n}\n.actions[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: #ffffff;\n  border-color: #dc2626;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 20px;\n  top: 86px;\n  background: #d1fae5;\n  color: #1f2937;\n  border-left: 4px solid #10b981;\n  padding: 12px 14px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  min-width: 270px;\n  z-index: 1200;\n}\n.toast-close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #4b5563;\n  cursor: pointer;\n}\n/*# sourceMappingURL=team.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamComponent, [{
    type: Component,
    args: [{ selector: "app-team", standalone: true, imports: [CommonModule, FormsModule, RouterLink], template: '<div class="container">\n  <button class="home-btn" routerLink="/home">? Home</button>\n\n  <h2>Manage Team Members</h2>\n\n  <div class="input-row">\n    <input type="text" placeholder="Type a name" [(ngModel)]="name" />\n    <button (click)="addMember()">Save This Person</button>\n  </div>\n\n  <div *ngFor="let member of activeMembers" class="member-card">\n    <div>\n      <strong>{{ member.name }}</strong>\n      <span *ngIf="member.isTeamLead" class="lead-badge">Lead</span>\n    </div>\n\n    <div class="actions">\n      <button (click)="editName(member)">Edit Name</button>\n\n      <button *ngIf="!member.isTeamLead" (click)="makeLead(member)">\n        Make Lead\n      </button>\n\n      <button class="danger" *ngIf="!member.isTeamLead" (click)="deactivate(member)">\n        Deactivate\n      </button>\n    </div>\n  </div>\n\n  <div *ngIf="showToast" class="toast">\n    <span>{{ toastMessage }}</span>\n    <button class="toast-close" type="button" (click)="closeToast()">x</button>\n  </div>\n</div>\r\n', styles: ["/* src/app/features/team/team.css */\n.container {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 28px 40px;\n  color: #e5e7eb;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.home-btn {\n  background: #f1f5f9;\n  border: 1px solid #e2e8f0;\n  color: #334155;\n  padding: 8px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\nh2 {\n  margin: 8px 0 18px;\n}\n.input-row {\n  display: flex;\n  margin-bottom: 16px;\n  background: #f8fafc;\n  padding: 10px;\n  border-radius: 12px;\n  border: 1px solid #dbe4f0;\n}\ninput {\n  flex: 1;\n  padding: 12px;\n  border-radius: 8px 0 0 8px;\n  border: 1px solid #cbd5e1;\n  background: #ffffff;\n  color: #1f2937;\n}\ninput:focus {\n  outline: none;\n  border-color: #3b82f6;\n}\n.input-row > button {\n  padding: 10px 16px;\n  border-radius: 0 8px 8px 0;\n  border: none;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n.member-card {\n  background: #f8fafc;\n  color: #1f2937;\n  padding: 18px;\n  border-radius: 12px;\n  margin-bottom: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border: 1px solid #dbe4f0;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.actions button {\n  border-radius: 6px;\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  background: #f1f5f9;\n  color: #1e293b;\n  cursor: pointer;\n}\n.lead-badge {\n  background: #facc15;\n  color: #111827;\n  padding: 4px 8px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  margin-left: 8px;\n}\n.actions .danger {\n  background: #ef4444;\n  color: #ffffff;\n  border-color: #dc2626;\n}\n.toast {\n  position: fixed;\n  right: 20px;\n  top: 86px;\n  background: #d1fae5;\n  color: #1f2937;\n  border-left: 4px solid #10b981;\n  padding: 12px 14px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  min-width: 270px;\n  z-index: 1200;\n}\n.toast-close {\n  background: transparent;\n  border: none;\n  color: #4b5563;\n  cursor: pointer;\n}\n/*# sourceMappingURL=team.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamComponent, { className: "TeamComponent", filePath: "src/app/features/team/team.ts", lineNumber: 22 });
})();
export {
  TeamComponent
};
//# sourceMappingURL=chunk-XR6G43O3.js.map
