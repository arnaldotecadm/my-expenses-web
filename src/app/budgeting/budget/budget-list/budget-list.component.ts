import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent implements OnInit, OnDestroy {
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
    this.budgetList$ = this.budgetService.getAll();
  }

  loadBudget(uuid) {
    this.router.navigate(['budgets/' + uuid]);
  }

  addNewEntry() {
    this.router.navigate(['budgets/0']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
