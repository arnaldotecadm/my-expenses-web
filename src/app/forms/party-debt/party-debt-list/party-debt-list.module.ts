import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartyDebtListComponent } from "./party-debt-list.component";

@NgModule({
  declarations: [PartyDebtListComponent],
  imports: [CommonModule],
  exports: [PartyDebtListComponent],
})
export class PartyDebtListModule {}
