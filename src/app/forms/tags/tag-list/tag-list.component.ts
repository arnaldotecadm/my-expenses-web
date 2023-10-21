import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TagsService } from '../tags.service';
import { SwitchAccountService } from 'src/app/service/switch-account.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
})
export class TagListComponent implements OnInit, OnDestroy {
  partyDebtList: any = [];
  subscription: Subscription | undefined;

  selectedParty;
  transactionByParty$!: Observable<any>;
  originalData;

  constructor(
    private service: TagsService,
    private switchAccountService: SwitchAccountService
  ) {}

  ngOnInit(): void {
    if (this.switchAccountService.getSelectedAccount()) {
      this.loadData();
    }
    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.loadData();
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
      item.name.toUpperCase().includes(filter.toUpperCase())
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
