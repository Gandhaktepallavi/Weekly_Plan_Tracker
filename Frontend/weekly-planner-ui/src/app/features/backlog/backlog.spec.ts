import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogComponent } from './backlog';

describe('Backlog', () => {
  let component: BacklogComponent;
  let fixture: ComponentFixture<BacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
