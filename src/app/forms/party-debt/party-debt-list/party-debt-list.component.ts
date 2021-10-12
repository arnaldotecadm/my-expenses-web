import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PartyDebtService } from "../party-debt.service";

@Component({
  selector: "app-party-debt-list",
  templateUrl: "./party-debt-list.component.html",
  styleUrls: ["./party-debt-list.component.css"],
})
export class PartyDebtListComponent implements OnInit {
  partyDebtList$;

  constructor(private service: PartyDebtService) {}

  ngOnInit(): void {
    this.partyDebtList$ = this.service.getAll();
  }
}
