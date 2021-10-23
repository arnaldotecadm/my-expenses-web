import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { PartyDebtService } from "../party-debt.service";

@Component({
  selector: "app-party-debt-list",
  templateUrl: "./party-debt-list.component.html",
  styleUrls: ["./party-debt-list.component.css"],
})
export class PartyDebtListComponent implements OnInit {
  partyDebtList;

  selectedParty;
  transactionByPartyList$;
  originalData;

  constructor(private service: PartyDebtService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.originalData = data;
      this.partyDebtList = data;
    });
  }

  filter = "";

  filterData(value) {
    this.filter = value;
    this.applyFilter(this.filter);
  }

  private applyFilter(filter) {
    let filteredData = this.originalData;

    filteredData = filteredData.filter((item) =>
      item.name.toUpperCase().includes(filter.toUpperCase())
    );

    this.partyDebtList = filteredData;
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
