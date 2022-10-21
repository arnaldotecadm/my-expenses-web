import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalysisComponent } from './analysis.component';
import { DetailByTypeComponent } from './detail-by-type/detail-by-type.component';
import { DetailByTypeModule } from './detail-by-type/detail-by-type.module';
import { MonthAnalysisComparisonComponent } from './month-analysis-comparison/month-analysis-comparison.component';
import { MonthAnalysisComparisonModule } from './month-analysis-comparison/month-analysis-comparison.module';
import { MonthAnalysisComponent } from './month-analysis/month-analysis.component';
import { MonthAnalysisModule } from './month-analysis/month-analysis.module';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [CommonModule, MonthAnalysisModule, DetailByTypeModule, MonthAnalysisComparisonModule],
  exports: [MonthAnalysisComponent, AnalysisComponent, DetailByTypeComponent, MonthAnalysisComparisonComponent],
})
export class AnalysisModule {}
