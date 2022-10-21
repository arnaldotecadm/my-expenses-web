import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-detail-by-type',
  templateUrl: './detail-by-type.component.html',
  styleUrls: ['./detail-by-type.component.css'],
})
export class DetailByTypeComponent implements OnInit, OnChanges {
  @ViewChild('selectExceptionType', { static: true }) selectOption:
    | MatSelect
    | undefined;

  pieChart: any;

  @Input() application = 'My Expenses';

  @Input() selectedLabel = 'Default Account';

  selectedOption = '';

  chart: any;

  numberExceptions = 5;

  constructor(private service: DashboardService) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {}

  changeFilter(change: MatSelectChange) {}

  incomeList;
  expensesList;
  monthList;

  totalIncome;
  totalExpense;

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    this.service.getDataForGraphPastFourMonth().subscribe((data) => {
      this.incomeList = data.map((item) => item.income);
      this.expensesList = data.map((item) => item.expense);
      this.monthList = data.map((item) => item.month);

      this.totalIncome = data.reduce((acc, val) => (acc += val.income), 0);
      this.totalExpense = data.reduce((acc, val) => (acc += val.expense), 0);

      this.buildChartInfo(this.expensesList, this.monthList, this.incomeList);
    });
  }

  buildChartInfo(chartData: number[], chartlabel = [], chartData2: number[]) {
    const speedCanvas = document.getElementById('detail-by-type');

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

    const chartOptions = {
      legend: {
        display: true,
        position: 'bottom',
      },
    };

    this.chart = new Chart('detail-by-type', {
      type: 'line',
      //hover: false,
      data: speedData,
      //options: chartOptions,
    });
  }
}
