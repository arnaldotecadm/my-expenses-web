import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAnalysisFormComponent } from './budget-analysis-form.component';

describe('BudgetingComponent', () => {
  let component: BudgetAnalysisFormComponent;
  let fixture: ComponentFixture<BudgetAnalysisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAnalysisFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAnalysisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
