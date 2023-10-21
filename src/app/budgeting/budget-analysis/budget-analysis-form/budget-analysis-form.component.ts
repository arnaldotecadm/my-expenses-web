import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'app-budgeting',
  templateUrl: './budget-analysis-form.component.html',
  styleUrls: ['./budget-analysis-form.component.scss'],
})
export class BudgetAnalysisFormComponent implements OnInit {
  identifier;
  formData$ = new Observable<any>();
  subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private switchAccountService: SwitchAccountService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
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
    this.formData$ = this.budgetService
      .getAnalysisWithTotalsByAccountUuid(this.identifier);
  }

  backToList() {
    this.router.navigate(['budget-analysis']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
