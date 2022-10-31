import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAnalysisListComponent } from './budget-analysis-list.component';

describe('BudgetAnalysisListComponent', () => {
  let component: BudgetAnalysisListComponent;
  let fixture: ComponentFixture<BudgetAnalysisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAnalysisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
