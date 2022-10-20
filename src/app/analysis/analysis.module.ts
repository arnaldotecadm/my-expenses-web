import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalysisComponent } from './analysis.component';
import { MonthAnalysisComponent } from './month-analysis/month-analysis.component';
import { MonthAnalysisModule } from './month-analysis/month-analysis.module';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [CommonModule, MonthAnalysisModule],
  exports: [MonthAnalysisComponent, AnalysisComponent],
})
export class AnalysisModule {}
