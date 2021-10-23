import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { PartyDebtService } from "../party-debt.service";

@Component({
  selector: "app-party-debt-list",
  templateUrl: "./party-debt-list.component.html",
  styleUrls: ["./party-debt-list.component.css"],
})
export class PartyDebtListComponent implements OnInit {
  partyDebtList$;

  selectedParty;
  transactionByPartyList$;

  constructor(private service: PartyDebtService) {}

  ngOnInit(): void {
    this.partyDebtList$ = this.service.getAll();
  }

  selectParty(party) {
    if (party == this.selectedParty) {
      return;
    }

    this.selectedParty = party;

    this.transactionByPartyList$ = this.service
      .getTransactionByParty(party)
      .pipe(
        tap((data) => {
          console.log(data);
        })
      );
  }
}
