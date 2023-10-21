import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-month-analysis-comparison',
  templateUrl: './month-analysis-comparison.component.html',
  styleUrls: ['./month-analysis-comparison.component.css'],
})
export class MonthAnalysisComparisonComponent implements OnInit, OnDestroy {
  pieChart: any;
  subscription: Subscription | undefined;

  selectedMonth = -1;
  monthListEnum = [
    { index: 1, name: 'January' },
    { index: 2, name: 'February' },
    { index: 3, name: 'Marh' },
    { index: 4, name: 'April' },
    { index: 5, name: 'May' },
    { index: 6, name: 'June' },
    { index: 7, name: 'July' },
    { index: 8, name: 'August' },
    { index: 9, name: 'September' },
    { index: 10, name: 'October' },
    { index: 11, name: 'November' },
    { index: 12, name: 'December' },
  ];

  @Input() inputValues = [];

  @Input() application = 'My Expenses';

  @Input() selectedLabel = 'Default Account';

  selectedOption = '';

  chart: any;

  numberExceptions = 5;

  constructor(
    private homeService: DashboardService,
    private switchAccountService: SwitchAccountService
  ) {}

  totalIncome;
  totalExpense;

  monthAnalysis;

  dataTable = [];
  selectedSourceMonth;
  selectedTargetMonth;

  sourceMonth;
  targetMonth;
  validYearMonthCombination$!: Observable<any>;

  ngOnInit(): void {
    this.selectedSourceMonth = moment(new Date()).format('YYYY-MM');
    this.selectedTargetMonth = moment(new Date())
      .subtract(1, 'months')
      .format('YYYY-MM');

    if (this.switchAccountService.getSelectedAccount()) {
      this.loadData();
    }

    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.loadData();
      });
  }

  private loadData() {
    this.loadChart(
      this.selectedSourceMonth,
      this.selectedTargetMonth,
      'Source',
      'Target'
    );
    this.validYearMonthCombination$ =
      this.homeService.getValidYEarMonthCombination();
  }

  monthChanged(source, target) {
    this.loadChart(source, target, source, target);
  }

  loadChart(source, target, labelSource, labelTarget) {
    let labels = [labelSource, labelTarget].sort();
    this.sourceMonth = labels[1];
    this.targetMonth = labels[0];
    this.homeService
      .getMonthAnalysisAgainstLastMonth(source, target)
      .subscribe((data) => {
        this.monthAnalysis = data;

        let currentMonthList = data.map((item) => item.amount);
        let expensesList = data.map((item) => item.lastMonthAmount);
        let monthList = data.map((item) => item.categoryName);

        this.buildChartInfo(
          expensesList,
          monthList,
          currentMonthList,
          labelSource,
          labelTarget
        );
      });
  }

  buildChartInfo(
    chartData: number[],
    chartlabel = [],
    chartData2: number[],
    labelSource,
    labelTarget
  ) {
    if (this.chart) {
      this.chart.destroy();
    }
    const dataFirst = {
      data: chartData,
      fill: false,
      borderColor: '#eb4034',
      backgroundColor: '#eb4034',
      pointBorderColor: '#eb4034',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
      label: labelSource,
    };

    const dataSecond = {
      data: chartData2,
      fill: false,
      borderColor: '#45ac09',
      backgroundColor: '#45ac09',
      pointBorderColor: '#45ac09',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
      label: labelTarget,
    };

    const speedData = {
      labels: chartlabel,
      datasets: [dataFirst, dataSecond],
    };

    const chartOptions = {
      legend: {
        display: true,
        position: 'bottom',
      },
    };

    this.chart = new Chart('month-analysis-comparison', {
      type: 'line',
      //hover: false,
      data: speedData,
      //options: chartOptions,
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
