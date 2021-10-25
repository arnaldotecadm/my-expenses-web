import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { MonthScheduleComponent } from "./forms/month-schedule/month-schedule.component";
import { PartyDebtListComponent } from "./forms/party-debt/party-debt-list/party-debt-list.component";
import { ImportExportFormComponent } from "./forms/import-export/import-export-form/import-export-form.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { SigninComponent } from "./core/signin/signin.component";

const routes: Routes = [
  {
    path: "sigin-in",
    component: SigninComponent,
  },
  { path: "home", component: HomePageComponent },
  {
    path: "dashboard",
    component: DashBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "monthly-schedule",
    component: MonthScheduleComponent,
  },
  {
    path: "party-debt",
    component: PartyDebtListComponent,
  },
  {
    path: "import-export",
    component: ImportExportFormComponent,
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [],
})
export class AppRoutingModule {}
