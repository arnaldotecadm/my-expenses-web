import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDebtListComponent } from './party-debt-list.component';

describe('PartyDebtListComponent', () => {
  let component: PartyDebtListComponent;
  let fixture: ComponentFixture<PartyDebtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyDebtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDebtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
