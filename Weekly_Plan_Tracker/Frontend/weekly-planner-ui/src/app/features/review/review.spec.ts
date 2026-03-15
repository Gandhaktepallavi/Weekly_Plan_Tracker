import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { HomeComponent } from '../home/home';

import { ReviewComponent } from './review';

describe('Review', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent],
      providers: [
        provideRouter([{ path: 'home', component: HomeComponent }]),
        {
          provide: PlannerApiService,
          useValue: {
            getDashboard: () => of({
              hasActivePlan: true,
              planId: 'p1',
              weekStart: '2026-03-03',
              weekEnd: '2026-03-09',
              clientPercent: 50,
              techDebtPercent: 30,
              rndPercent: 20,
              members: [],
              categories: [],
              tasks: []
            }),
            updateProgress: () => of({}),
            freezePlan: () => of({}),
            unfreezePlan: () => of({}),
            deletePlan: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
