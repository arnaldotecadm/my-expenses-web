import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./home-page/home-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { VMessageModule } from "app/shared/vmessage/vmessage.module";

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, ReactiveFormsModule, VMessageModule],
  exports: [HomePageComponent],
})
export class HomeModule {}
