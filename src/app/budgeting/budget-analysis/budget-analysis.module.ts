import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetAnalysisFormComponent } from './budget-analysis-form/budget-analysis-form.component';
import { BudgetAnalysisFormModule } from './budget-analysis-form/budget-analysis-form.module';
import { BudgetAnalysisListComponent } from './budget-analysis-list/budget-analysis-list.component';
import { BudgetAnalysisListModule } from './budget-analysis-list/budget-analysis-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BudgetAnalysisFormModule, BudgetAnalysisListModule],
  exports: [BudgetAnalysisFormComponent, BudgetAnalysisListComponent],
})
export class BudgetAnalysisModule {}
