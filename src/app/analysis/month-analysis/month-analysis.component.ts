import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Chart } from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { SwitchAccountService } from 'src/app/service/switch-account.service';

@Component({
  selector: 'app-month-analysis',
  templateUrl: './month-analysis.component.html',
  styleUrls: ['./month-analysis.component.css'],
})
export class MonthAnalysisComponent implements OnInit, OnDestroy {
  @ViewChild('selectExceptionType', { static: true }) selectOption!: MatSelect;
  subscription: Subscription | undefined;
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

  pieChart: any;

  @Input() inputValues = [];

  @Input() application = 'My Expenses';

  @Input() selectedLabel = 'Default Account';

  selectedOption = '';

  chart: any;

  numberExceptions = 5;

  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  years = [...Array(30).keys()].reverse();

  constructor(
    private homeService: DashboardService,
    private switchAccountService: SwitchAccountService
  ) {
    this.selectedMonth = new Date().getMonth() + 1;
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  incomeList;
  expensesList;
  monthList;

  totalIncome;
  totalExpense;

  monthAnalysis$!: Observable<any>;
  currentMonth;

  ngOnInit(): void {
    if (this.switchAccountService.getSelectedAccount()) {
      this.loadChart(this.selectedYear, this.selectedMonth);
    }

    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.loadChart(this.selectedYear, this.selectedMonth);
      });
  }

  monthChanged(year, month) {
    this.loadChart(year, month);
  }

  loadChart(yearToLoad, monthToLoad) {
    this.monthAnalysis$ = this.homeService.getMonthAnalysisByMonth(
      yearToLoad,
      monthToLoad
    );
    this.homeService
      .getCurrentMonthByMonth(yearToLoad, monthToLoad)
      .subscribe((data) => {
        this.currentMonth = data;
        this.totalIncome = data.income;
        this.totalExpense = data.expense;

        this.incomeList = data.perWeekList.map((item) => item.income);
        this.expensesList = data.perWeekList.map((item) => item.expense);
        this.monthList = data.perWeekList.map(
          (item) => item.week + ' ª Semana'
        );

        this.buildChartInfo(this.expensesList, this.monthList, this.incomeList);
      });
  }

  buildChartInfo(chartData: number[], chartlabel = [], chartData2: number[]) {
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
      label: 'Expenses',
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
      label: 'Income',
    };

    const speedData = {
      labels: chartlabel,
      datasets: [dataFirst, dataSecond],
    };

    this.chart = new Chart('month-analysis', {
      type: 'line',
      //hover: false,
      data: speedData,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }
}
