import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { PlannerApiService } from '../../core/planner-api';
import { PastWeeksComponent } from './past-weeks';

describe('PastWeeksComponent', () => {
  let component: PastWeeksComponent;
  let fixture: ComponentFixture<PastWeeksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastWeeksComponent],
      providers: [
        provideRouter([]),
        {
          provide: PlannerApiService,
          useValue: {
            getPastWeeks: () => of([]),
            getTasksByPlan: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PastWeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
