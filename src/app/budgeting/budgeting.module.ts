import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetFormComponent } from './budget/budget-form/budget-form.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { BudgetModule } from './budget/budget.module';
import { BudgetingComponent } from './budgeting/budgeting.component';
import { BudgetingAnalysisModule } from './budgeting/budgeting.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BudgetingAnalysisModule, BudgetModule],
  exports: [BudgetFormComponent, BudgetListComponent, BudgetingComponent],
})
export class BudgetingModule {}
