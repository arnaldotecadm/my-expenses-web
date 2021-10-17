import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuModule } from "./menu/menu.module";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, MenuModule],
  exports: [MenuComponent],
})
export class CoreModule {}
