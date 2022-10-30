import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budgeting',
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.scss'],
})
export class BudgetingComponent implements OnInit, OnDestroy {
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
    this.budgetList$ = this.budgetService.getAll().pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
