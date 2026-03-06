import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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
  RouterLink,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-PYXMBAFL.js";

// src/app/features/backlog/backlog.ts
function BacklogComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function BacklogComponent_div_7_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.title, $event) || (ctx_r1.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function BacklogComponent_div_7_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.category, $event) || (ctx_r1.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(3, "option");
    \u0275\u0275text(4, "Client Focused");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option");
    \u0275\u0275text(6, "Tech Debt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option");
    \u0275\u0275text(8, "R&D");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function BacklogComponent_div_7_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.estimatedHours, $event) || (ctx_r1.estimatedHours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 8);
    \u0275\u0275listener("click", function BacklogComponent_div_7_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addItem());
    });
    \u0275\u0275text(11, "Save");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.category);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.estimatedHours);
  }
}
function BacklogComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "No backlog items match your filters.");
    \u0275\u0275elementEnd();
  }
}
function BacklogComponent_div_25_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, "AVAILABLE");
    \u0275\u0275elementEnd();
  }
}
function BacklogComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 23);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, BacklogComponent_div_25_span_6_Template, 2, 0, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 25);
    \u0275\u0275listener("click", function BacklogComponent_div_25_Template_button_click_9_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteItem(item_r4.id));
    });
    \u0275\u0275text(10, "Delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r4.category.replace(" ", "-"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.category);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r4.isAssigned);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r4.estimatedHours, "h estimated");
  }
}
function BacklogComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 28);
    \u0275\u0275listener("click", function BacklogComponent_div_26_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
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
var BacklogComponent = class _BacklogComponent {
  api;
  backlog = [];
  // filters
  selectedCategory = "All";
  searchTerm = "";
  availableOnly = false;
  // form
  showForm = false;
  title = "";
  category = "Client Focused";
  estimatedHours = 1;
  showToast = false;
  toastMessage = "";
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.loadBacklog();
  }
  loadBacklog() {
    this.api.getBacklog().subscribe((data) => {
      this.backlog = data;
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
    this.resetForm();
  }
  addItem() {
    if (!this.title.trim())
      return;
    const newItem = {
      title: this.title,
      category: this.category,
      estimatedHours: this.estimatedHours
    };
    this.api.addBacklogItem(newItem).subscribe(() => {
      this.loadBacklog();
      this.showSuccess("Backlog item saved!");
    });
    this.toggleForm();
  }
  resetForm() {
    this.title = "";
    this.category = "Client Focused";
    this.estimatedHours = 1;
  }
  deleteItem(id) {
    this.api.deleteBacklogItem(id).subscribe(() => {
      this.loadBacklog();
      this.showSuccess("Backlog item deleted.");
    });
  }
  // Filtering Logic
  get filteredItems() {
    return this.backlog.filter((item) => {
      if (this.selectedCategory !== "All" && item.category !== this.selectedCategory)
        return false;
      if (this.availableOnly && item.isAssigned)
        return false;
      if (this.searchTerm && !item.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
        return false;
      return true;
    });
  }
  closeToast() {
    this.showToast = false;
  }
  showSuccess(message) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2500);
  }
  static \u0275fac = function BacklogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BacklogComponent)(\u0275\u0275directiveInject(PlannerApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BacklogComponent, selectors: [["app-backlog"]], decls: 27, vars: 14, consts: [[1, "container"], ["routerLink", "/home", 1, "home-btn"], [1, "add-btn", 3, "click"], ["class", "form-card", 4, "ngIf"], [1, "category-buttons"], [1, "client", 3, "click"], [1, "tech", 3, "click"], [1, "rnd", 3, "click"], [3, "click"], [1, "filters-row"], [3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "available"], ["type", "text", "placeholder", "Search by title", 3, "ngModelChange", "ngModel"], ["class", "empty", 4, "ngIf"], ["class", "item-card", 4, "ngFor", "ngForOf"], ["class", "toast", 4, "ngIf"], [1, "form-card"], ["type", "text", "placeholder", "Title", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 3, "ngModelChange", "ngModel"], [1, "empty"], [1, "item-card"], [1, "title-row"], [1, "badge", 3, "ngClass"], ["class", "state-badge", 4, "ngIf"], [1, "delete", 3, "click"], [1, "state-badge"], [1, "toast"], ["type", "button", 1, "toast-close", 3, "click"]], template: function BacklogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275text(2, "? Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h2");
      \u0275\u0275text(4, "Manage Backlog");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 2);
      \u0275\u0275listener("click", function BacklogComponent_Template_button_click_5_listener() {
        return ctx.toggleForm();
      });
      \u0275\u0275text(6, "Add a New Backlog Item");
      \u0275\u0275elementEnd();
      \u0275\u0275template(7, BacklogComponent_div_7_Template, 12, 3, "div", 3);
      \u0275\u0275elementStart(8, "div", 4)(9, "button", 5);
      \u0275\u0275listener("click", function BacklogComponent_Template_button_click_9_listener() {
        return ctx.selectedCategory = "Client Focused";
      });
      \u0275\u0275text(10, " Client Focused ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function BacklogComponent_Template_button_click_11_listener() {
        return ctx.selectedCategory = "Tech Debt";
      });
      \u0275\u0275text(12, " Tech Debt ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 7);
      \u0275\u0275listener("click", function BacklogComponent_Template_button_click_13_listener() {
        return ctx.selectedCategory = "R&D";
      });
      \u0275\u0275text(14, "R&D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 8);
      \u0275\u0275listener("click", function BacklogComponent_Template_button_click_15_listener() {
        return ctx.selectedCategory = "All";
      });
      \u0275\u0275text(16, "All");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9)(18, "select", 10);
      \u0275\u0275listener("ngModelChange", function BacklogComponent_Template_select_ngModelChange_18_listener($event) {
        return ctx.availableOnly = $event === "available";
      });
      \u0275\u0275elementStart(19, "option", 11);
      \u0275\u0275text(20, "All Items");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 12);
      \u0275\u0275text(22, "Available Only");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function BacklogComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(24, BacklogComponent_div_24_Template, 2, 0, "div", 14)(25, BacklogComponent_div_25_Template, 11, 5, "div", 15)(26, BacklogComponent_div_26_Template, 5, 1, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.showForm);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.selectedCategory === "Client Focused");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.selectedCategory === "Tech Debt");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.selectedCategory === "R&D");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.selectedCategory === "All");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.availableOnly ? "available" : "all");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredItems.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.filteredItems);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showToast);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: white;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.home-btn[_ngcontent-%COMP%] {\n  background: #e5e7eb;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  margin-bottom: 20px;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.add-btn[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: none;\n  color: white;\n  margin-bottom: 15px;\n  cursor: pointer;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 10px;\n  padding: 8px;\n  border-radius: 6px;\n  border: 1px solid #334155;\n  background: #0f172a;\n  color: white;\n}\n.category-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n}\n.category-buttons[_ngcontent-%COMP%]   .client[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.category-buttons[_ngcontent-%COMP%]   .tech[_ngcontent-%COMP%] {\n  background: #f97316;\n}\n.category-buttons[_ngcontent-%COMP%]   .rnd[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.active[_ngcontent-%COMP%] {\n  outline: 2px solid white;\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 15px 0;\n}\n.item-card[_ngcontent-%COMP%] {\n  background: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 3px 8px;\n  border-radius: 8px;\n  font-size: 12px;\n  margin-left: 8px;\n}\n.Client-Focused[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.Tech-Debt[_ngcontent-%COMP%] {\n  background: #f97316;\n}\n.R\\&D[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.state-badge[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  padding: 3px 8px;\n  border-radius: 8px;\n  font-size: 12px;\n  background: #e2e8f0;\n  color: #0f172a;\n  font-weight: 700;\n}\n.delete[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}\n.empty[_ngcontent-%COMP%] {\n  background: #334155;\n  padding: 15px;\n  border-radius: 8px;\n  text-align: center;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 86px;\n  right: 20px;\n  background: #d1fae5;\n  color: #1f2937;\n  border-left: 4px solid #10b981;\n  border-radius: 8px;\n  min-width: 260px;\n  padding: 12px 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  z-index: 1200;\n}\n.toast-close[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #4b5563;\n  cursor: pointer;\n}\n/*# sourceMappingURL=backlog.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BacklogComponent, [{
    type: Component,
    args: [{ selector: "app-backlog", standalone: true, imports: [CommonModule, FormsModule, RouterLink], template: `<div class="container">
  <button class="home-btn" routerLink="/home">? Home</button>

  <h2>Manage Backlog</h2>

  <button class="add-btn" (click)="toggleForm()">Add a New Backlog Item</button>

  <div *ngIf="showForm" class="form-card">
    <input type="text" placeholder="Title" [(ngModel)]="title" />

    <select [(ngModel)]="category">
      <option>Client Focused</option>
      <option>Tech Debt</option>
      <option>R&D</option>
    </select>

    <input type="number" min="1" [(ngModel)]="estimatedHours" />

    <button (click)="addItem()">Save</button>
  </div>

  <div class="category-buttons">
    <button (click)="selectedCategory='Client Focused'" class="client" [class.active]="selectedCategory==='Client Focused'">
      Client Focused
    </button>

    <button (click)="selectedCategory='Tech Debt'" class="tech" [class.active]="selectedCategory==='Tech Debt'">
      Tech Debt
    </button>

    <button (click)="selectedCategory='R&D'" class="rnd" [class.active]="selectedCategory==='R&D'">R&D</button>

    <button (click)="selectedCategory='All'" [class.active]="selectedCategory==='All'">All</button>
  </div>

  <div class="filters-row">
    <select [ngModel]="availableOnly ? 'available' : 'all'" (ngModelChange)="availableOnly = ($event === 'available')">
      <option value="all">All Items</option>
      <option value="available">Available Only</option>
    </select>

    <input type="text" placeholder="Search by title" [(ngModel)]="searchTerm" />
  </div>

  <div *ngIf="filteredItems.length === 0" class="empty">No backlog items match your filters.</div>

  <div *ngFor="let item of filteredItems" class="item-card">
    <div class="title-row">
      <strong>{{ item.title }}</strong>
      <span class="badge" [ngClass]="item.category.replace(' ','-')">{{ item.category }}</span>
      <span class="state-badge" *ngIf="!item.isAssigned">AVAILABLE</span>
    </div>

    <p>{{ item.estimatedHours }}h estimated</p>

    <button class="delete" (click)="deleteItem(item.id)">Delete</button>
  </div>

  <div *ngIf="showToast" class="toast">
    <span>{{ toastMessage }}</span>
    <button class="toast-close" type="button" (click)="closeToast()">x</button>
  </div>
</div>\r
`, styles: ["/* src/app/features/backlog/backlog.css */\n.container {\n  background: #0f172a;\n  min-height: 100vh;\n  padding: 40px;\n  color: white;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.home-btn {\n  background: #e5e7eb;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  margin-bottom: 20px;\n}\nh2 {\n  margin-bottom: 20px;\n}\n.add-btn {\n  background: #3b82f6;\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: none;\n  color: white;\n  margin-bottom: 15px;\n  cursor: pointer;\n}\n.form-card {\n  background: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n}\ninput,\nselect {\n  width: 100%;\n  margin-bottom: 10px;\n  padding: 8px;\n  border-radius: 6px;\n  border: 1px solid #334155;\n  background: #0f172a;\n  color: white;\n}\n.category-buttons button {\n  margin-right: 8px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n}\n.category-buttons .client {\n  background: #3b82f6;\n}\n.category-buttons .tech {\n  background: #f97316;\n}\n.category-buttons .rnd {\n  background: #22c55e;\n}\n.active {\n  outline: 2px solid white;\n}\n.filters-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 15px 0;\n}\n.item-card {\n  background: #1e293b;\n  padding: 15px;\n  border-radius: 10px;\n  margin-bottom: 10px;\n}\n.badge {\n  padding: 3px 8px;\n  border-radius: 8px;\n  font-size: 12px;\n  margin-left: 8px;\n}\n.Client-Focused {\n  background: #3b82f6;\n}\n.Tech-Debt {\n  background: #f97316;\n}\n.R\\&D {\n  background: #22c55e;\n}\n.state-badge {\n  margin-left: 8px;\n  padding: 3px 8px;\n  border-radius: 8px;\n  font-size: 12px;\n  background: #e2e8f0;\n  color: #0f172a;\n  font-weight: 700;\n}\n.delete {\n  background: #ef4444;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}\n.empty {\n  background: #334155;\n  padding: 15px;\n  border-radius: 8px;\n  text-align: center;\n}\n.toast {\n  position: fixed;\n  top: 86px;\n  right: 20px;\n  background: #d1fae5;\n  color: #1f2937;\n  border-left: 4px solid #10b981;\n  border-radius: 8px;\n  min-width: 260px;\n  padding: 12px 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  z-index: 1200;\n}\n.toast-close {\n  border: none;\n  background: transparent;\n  color: #4b5563;\n  cursor: pointer;\n}\n/*# sourceMappingURL=backlog.css.map */\n"] }]
  }], () => [{ type: PlannerApiService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BacklogComponent, { className: "BacklogComponent", filePath: "src/app/features/backlog/backlog.ts", lineNumber: 16 });
})();

export {
  BacklogComponent
};
//# sourceMappingURL=chunk-Q4UTYR3U.js.map
