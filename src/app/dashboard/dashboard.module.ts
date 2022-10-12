import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { DashBoardComponent } from "./dashboard.component";
import { MatIconModule } from "@angular/material/icon";
import { DetailByTypeModule } from "./detail-by-type/detail-by-type.module";
import { MonthAnalysisModule } from "./month-analysis/month-analysis.module";
import { MonthAnalysisComparisonModule } from "./month-analysis-comparison/month-analysis-comparison.module";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [DashBoardComponent],
  exports: [DashBoardComponent],
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
    MatChipsModule,
    MatCheckboxModule,
  ],
})
export class DashboardModule {}
