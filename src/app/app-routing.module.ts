import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourMonthsReviewComponent } from './analysis/four-months-review/four-months-review.component';
import { MonthAnalysisComparisonComponent } from './analysis/month-analysis-comparison/month-analysis-comparison.component';
import { MonthAnalysisComponent } from './analysis/month-analysis/month-analysis.component';
import { AuthGuard } from './core/auth/auth.guard';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { DistributionComponent } from './distribution/distribution.component';
import { ImportExportFormComponent } from './forms/import-export/import-export-form/import-export-form.component';
import { PartyDebtListComponent } from './forms/party-debt/party-debt-list/party-debt-list.component';
import { TagListComponent } from './forms/tags/tag-list/tag-list.component';
import { HistoryComponent } from './history/history.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'party-debt',
    component: PartyDebtListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'import-export',
    component: ImportExportFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tags',
    component: TagListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'distributions',
    component: DistributionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monthly-analysis',
    component: MonthAnalysisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'four-months-review',
    component: FourMonthsReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'current-month-analysis',
    component: MonthAnalysisComparisonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
