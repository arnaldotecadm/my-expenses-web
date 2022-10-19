import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { SwitchAccountService } from '../service/switch-account.service';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  chart: any;

  constructor(
    private historyService: HistoryService,
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
    this.historyService.getTotalsGroupedByMonth().subscribe((data) => {
      console.log(data);
      this.buildChartInfo(data);
    });
  }

  buildChartInfo(data: any[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('detail-by-type', {
      type: 'bar',
      data: {
        labels: data.map((item) => item.yearMonth),
        datasets: [
          {
            type: 'line',
            label: 'Balance',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: data.map((item) => item.balance),
            fill: true,
            order: 1,
          },

          {
            type: 'bar',
            label: 'Expenses',
            data: data.map((item) => item.expense),
            backgroundColor: '#df001c',
            borderColor: 'red',
            order: 2,
          },

          {
            type: 'bar',
            label: 'Incomes',
            data: data.map((item) => item.income),
            backgroundColor: '#1c9146',
            borderColor: 'green',
            order: 3,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
          legend: {
            display: true,
            position: 'left',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
