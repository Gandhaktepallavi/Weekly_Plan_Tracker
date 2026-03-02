import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogListComponent } from './backlog-list';

describe('BacklogList', () => {
  let component: BacklogListComponent;
  let fixture: ComponentFixture<BacklogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
