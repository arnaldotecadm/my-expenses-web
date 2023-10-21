import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { PartyDebtService } from '../party-debt.service';

@Component({
  selector: 'app-party-debt-list',
  templateUrl: './party-debt-list.component.html',
  styleUrls: ['./party-debt-list.component.css'],
})
export class PartyDebtListComponent implements OnInit, OnDestroy {
  partyDebtList: any = [];
  subscription: Subscription | undefined;

  selectedParty;
  transactionByParty$!: Observable<any>;
  originalData;

  constructor(
    private service: PartyDebtService,
    private switchAccountService: SwitchAccountService
  ) {}

  ngOnInit(): void {
    if (this.switchAccountService.getSelectedAccount()) {
      this.loadData();
    }
    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.selectedParty = ""
        this.transactionByParty$ = of([])
        this.loadData()
      });
  }

  loadData() {
    this.service.getAll().subscribe((data) => {
      this.originalData = data;
      this.partyDebtList = data;
    });
  }

  filter = '';

  filterData(value) {
    this.filter = value;
    this.applyFilter(this.filter);
  }

  private applyFilter(filter) {
    let filteredData = this.originalData;

    filteredData = filteredData.filter((item) =>
      item.toUpperCase().includes(filter.toUpperCase())
    );

    this.partyDebtList = filteredData;
  }

  selectParty(party) {
    if (party == this.selectedParty || party == '') {
      return;
    }

    this.selectedParty = party;

    this.transactionByParty$ = this.service.getTransactionByParty(party);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
