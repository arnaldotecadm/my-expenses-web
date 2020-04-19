import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { SigninComponent } from "./home/signin/signin.component";

const routes: Routes = [
  {
    path: "sigin-in",
    component: SigninComponent,
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "dashboard",
    canActivate: [AuthGuard],
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
