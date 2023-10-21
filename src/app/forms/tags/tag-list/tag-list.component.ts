import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { TagsService } from '../tags.service';
import { SwitchAccountService } from 'src/app/service/switch-account.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
})
export class TagListComponent implements OnInit, OnDestroy {
  tagList: any = [];
  subscription: Subscription | undefined;

  selectedTag;
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
        this.selectedTag = ""
        this.transactionByParty$ = of([])
        this.loadData();
      });
  }

  loadData() {
    this.service.getAll().subscribe((data) => {
      this.originalData = data;
      this.tagList = data;
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

    this.tagList = filteredData;
  }

  selectTag(tag) {
    if (tag == this.selectedTag || tag == '') {
      return;
    }

    this.selectedTag = tag;

    this.transactionByParty$ = this.service.getTransactionByParty(tag);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
