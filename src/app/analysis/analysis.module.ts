import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FourMonthsReviewComponent } from './four-months-review/four-months-review.component';
import { FourMonthsReviewModule } from './four-months-review/four-months-review.module';
import { MonthAnalysisComparisonComponent } from './month-analysis-comparison/month-analysis-comparison.component';
import { MonthAnalysisComparisonModule } from './month-analysis-comparison/month-analysis-comparison.module';
import { MonthAnalysisComponent } from './month-analysis/month-analysis.component';
import { MonthAnalysisModule } from './month-analysis/month-analysis.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MonthAnalysisModule, FourMonthsReviewModule, MonthAnalysisComparisonModule],
  exports: [MonthAnalysisComponent, FourMonthsReviewComponent, MonthAnalysisComparisonComponent],
})
export class AnalysisModule {}
