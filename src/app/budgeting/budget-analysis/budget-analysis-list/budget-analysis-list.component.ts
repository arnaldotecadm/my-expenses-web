import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'app-budget-analysis-list',
  templateUrl: './budget-analysis-list.component.html',
  styleUrls: ['./budget-analysis-list.component.scss'],
})
export class BudgetAnalysisListComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  budgetList$!: Observable<any>;

  constructor(
    private router: Router,
    private budgetService: BudgetService,
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
    this.budgetList$ = this.budgetService
      .getAnalysisWithTotals()
      .pipe(tap((data) => console.log(data)));
  }

  loadBudget(uuid) {
    this.router.navigate(['budget-analysis/' + uuid]);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
