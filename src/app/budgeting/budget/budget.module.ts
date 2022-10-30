import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetFormModule } from './budget-form/budget-form.module';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetListModule } from './budget-list/budget-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BudgetFormModule, BudgetListModule],
  exports: [BudgetFormComponent, BudgetListComponent],
})
export class BudgetModule {}
