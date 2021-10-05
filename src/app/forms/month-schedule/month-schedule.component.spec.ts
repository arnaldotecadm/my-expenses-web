import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthScheduleComponent } from './month-schedule.component';

describe('MonthScheduleComponent', () => {
  let component: MonthScheduleComponent;
  let fixture: ComponentFixture<MonthScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
