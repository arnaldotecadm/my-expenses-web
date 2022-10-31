import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetAnalysisListComponent } from './budget-analysis-list.component';

@NgModule({
  declarations: [BudgetAnalysisListComponent],
  imports: [CommonModule],
  exports: [BudgetAnalysisListComponent],
})
export class BudgetAnalysisListModule {}
