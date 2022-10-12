import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ImportExportFormComponent } from './forms/import-export/import-export-form/import-export-form.component';
import { MonthScheduleComponent } from './forms/month-schedule/month-schedule.component';
import { PartyDebtListComponent } from './forms/party-debt/party-debt-list/party-debt-list.component';
import { TagListComponent } from './forms/tags/tag-list/tag-list.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monthly-schedule',
    component: MonthScheduleComponent,
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
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
