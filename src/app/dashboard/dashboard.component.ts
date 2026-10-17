import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SwitchAccountService } from '../service/switch-account.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
})
export class DashBoardComponent implements OnInit, OnDestroy {
  @ViewChild('loadMoreSentinel')
  set loadMoreSentinel(element: ElementRef<HTMLElement> | undefined) {
    this.loadMoreObserver?.disconnect();
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.loadMoreTransactions();
        }
      },
      { rootMargin: '240px 0px' }
    );
    this.loadMoreObserver.observe(element.nativeElement);
  }
  data: any[] = [];
  originalData: any[] = [];
  subscription: Subscription | undefined;
  private loadMoreObserver?: IntersectionObserver;
  visibleTransactionLimit = 20;
  private readonly transactionPageSize = 20;

  monthValidOptions: string[] = [];

  constructor(
    private service: DashboardService,
    private switchAccountService: SwitchAccountService
  ) {}

  ngOnInit(): void {
    if (this.switchAccountService.getSelectedAccount()) {
      this.carregarDados();
    }

    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.carregarDados();
      });
  }

  filter = '';
  filterMonth = 'Select';

  filterData(value: string): void {
    this.filter = value || '';
    this.visibleTransactionLimit = this.transactionPageSize;
    this.applyFilter();
  }

  monthChanged(month: string): void {
    this.filterMonth = month;
    this.visibleTransactionLimit = this.transactionPageSize;
    this.applyFilter();
  }

  applyFilter(): void {
    const search = this.filter.trim().toLocaleLowerCase();
    this.data = this.originalData
      .filter(
        (month) =>
          this.filterMonth === 'Select' || month.reference === this.filterMonth
      )
      .map((month) => ({
        ...month,
        transactionList: (month.transactionList || [])
          .filter((transaction) => {
            if (!search) {
              return true;
            }

            const searchableFields = [
              transaction.category,
              transaction.subCategory,
              transaction.payee,
              transaction.comment,
              ...(transaction.tags || []),
            ];
            return searchableFields.some((field) =>
              field && field.toString().toLocaleLowerCase().includes(search)
            );
          })
          .slice()
          .sort(
            (first, second) =>
              new Date(second.date).getTime() - new Date(first.date).getTime()
          ),
      }));
  }

  carregarDados(): void {
    this.service.getAll().subscribe((data: any[]) => {
      this.originalData = data || [];
      this.monthValidOptions = this.originalData.map((month) => month.reference);
      this.visibleTransactionLimit = this.transactionPageSize;
      this.applyFilter();
    });
  }

  savingsRateFor(month: any): number {
    const summary = month.summaryDTO;
    if (!summary || !summary.income) {
      return 0;
    }
    return ((summary.income - Math.abs(summary.expense)) / summary.income) * 100;
  }

  expenseAmount(summary: any): number {
    return Math.abs(summary.expense || 0);
  }

  categoriesForMonth(
    month: any
  ): Array<{ name: string; amount: number }> {
    const totals = new Map<string, number>();
    const sourceMonth =
      this.data.find((item) => item.reference === month.reference) || month;

    (sourceMonth.transactionList || []).forEach((transaction) => {
      if (transaction.amount < 0) {
        const name = transaction.category || transaction.subCategory || 'Other';
        totals.set(name, (totals.get(name) || 0) + Math.abs(transaction.amount));
      }
    });

    const categories = Array.from(totals.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((first, second) => second.amount - first.amount)
      .slice(0, 5);
    return categories;
  }

  get visibleLedgerMonths(): any[] {
    let remaining = this.visibleTransactionLimit;
    return this.data
      .slice()
      .sort((first, second) => second.reference.localeCompare(first.reference))
      .map((month) => {
        const transactionList = month.transactionList.slice(0, remaining);
        remaining -= transactionList.length;
        return { ...month, transactionList };
      })
      .filter((month) => month.transactionList.length > 0);
  }

  get matchingTransactionCount(): number {
    return this.data.reduce(
      (total, month) => total + month.transactionList.length,
      0
    );
  }

  get hasMoreTransactions(): boolean {
    return this.visibleTransactionLimit < this.matchingTransactionCount;
  }

  loadMoreTransactions(): void {
    this.visibleTransactionLimit += this.transactionPageSize;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.loadMoreObserver?.disconnect();
  }
}
