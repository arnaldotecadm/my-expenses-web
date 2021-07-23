import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  {
    path: "user",
    component: UserComponent,
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
