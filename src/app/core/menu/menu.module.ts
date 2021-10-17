import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./menu.component";

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
