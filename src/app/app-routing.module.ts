import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
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
    component: AnalysisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fours-months-review',
    component: AnalysisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'current-month-analysis',
    component: AnalysisComponent,
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
