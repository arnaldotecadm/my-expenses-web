import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TagsService } from "../tags.service";

@Component({
  selector: "app-tag-list",
  templateUrl: "./tag-list.component.html",
  styleUrls: ["./tag-list.component.css"],
})
export class TagListComponent implements OnInit {
  partyDebtList = [];

  selectedParty;
  transactionByPartyList$: Observable<any>;
  originalData;

  constructor(private service: TagsService) {}

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
    if (party == this.selectedParty || party == "") {
      return;
    }

    this.selectedParty = party;

    this.transactionByPartyList$ = this.service.getTransactionByParty(party);
  }
}
