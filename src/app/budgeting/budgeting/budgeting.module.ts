import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BudgetingComponent } from './budgeting.component';

@NgModule({
  declarations: [BudgetingComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [BudgetingComponent],
})
export class BudgetingAnalysisModule {}
