import { TestBed } from '@angular/core/testing';

import { PlannerApiService } from './planner-api';

describe('PlannerApi', () => {
  let service: PlannerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
