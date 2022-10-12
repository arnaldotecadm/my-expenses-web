import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonthScheduleComponent } from "./month-schedule.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { DetailByTypeModule } from "src/app/dashboard/detail-by-type/detail-by-type.module";
import { MonthAnalysisModule } from "src/app/dashboard/month-analysis/month-analysis.module";
import { MonthAnalysisComparisonModule } from "src/app/dashboard/month-analysis-comparison/month-analysis-comparison.module";

@NgModule({
  declarations: [MonthScheduleComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    DetailByTypeModule,
    MonthAnalysisModule,
    MonthAnalysisComparisonModule,
  ],
  exports: [MonthScheduleComponent],
})
export class MonthScheduleModule {}
