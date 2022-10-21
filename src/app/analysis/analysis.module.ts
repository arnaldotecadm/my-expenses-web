import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalysisComponent } from './analysis.component';
import { DetailByTypeComponent } from './detail-by-type/detail-by-type.component';
import { DetailByTypeModule } from './detail-by-type/detail-by-type.module';
import { MonthAnalysisComponent } from './month-analysis/month-analysis.component';
import { MonthAnalysisModule } from './month-analysis/month-analysis.module';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [CommonModule, MonthAnalysisModule, DetailByTypeModule],
  exports: [MonthAnalysisComponent, AnalysisComponent, DetailByTypeComponent],
})
export class AnalysisModule {}
