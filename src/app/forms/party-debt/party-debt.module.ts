import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartyDebtListComponent } from "./party-debt-list/party-debt-list.component";
import { PartyDebtListModule } from "./party-debt-list/party-debt-list.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, PartyDebtListModule],
  exports: [PartyDebtListComponent],
})
export class PartyDebtModule {}
