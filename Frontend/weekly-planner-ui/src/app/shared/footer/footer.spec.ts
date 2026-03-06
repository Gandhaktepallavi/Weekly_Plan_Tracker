import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PlannerApiService } from '../../core/planner-api';

import { FooterComponent } from './footer';

describe('Footer', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        {
          provide: PlannerApiService,
          useValue: {
            getTeamMembers: () => of([]),
            getBacklog: () => of([]),
            getTasks: () => of([]),
            getCurrentWeeklyPlan: () => of({}),
            getCategorySettingsCurrent: () => of({}),
            importBackup: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
