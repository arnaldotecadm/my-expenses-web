import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { MonthScheduleComponent } from "./forms/month-schedule/month-schedule.component";

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  {
    path: "dashboard",
    component: DashBoardComponent,
  },
  {
    path: "monthly-schedule",
    component: MonthScheduleComponent,
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
