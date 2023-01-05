import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable, Subscription, tap } from 'rxjs';
import { SwitchAccountService } from '../service/switch-account.service';
import { DistributionService } from './distribution.service';


@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss'],
})
export class DistributionComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  allCategories$!: Observable<any>;
  chart: any;
  allData;
  selectedCategory;
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  years = [...Array(30).keys()].reverse()

  constructor(
    private distributionService: DistributionService,
    private switchAccountService: SwitchAccountService
  ) {}

  ngOnInit(): void {
    if (this.switchAccountService.getSelectedAccount()) {
      this.loadData(this.selectedYear, this.selectedMonth);
    }

    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.loadData(this.selectedYear, this.selectedMonth);
      });
  }

  loadData(year, month) {
    this.allCategories$ = this.distributionService.getAllCategory(year, month).pipe(
      tap((data) => {
        this.loadChart(data);
        this.allData = data;
      })
    );
  }

  loadChart(groupedCategory: any[]) {
    this.buildChartInfo(groupedCategory);
  }

  loadSubCategory(cat: string) {
    this.selectedCategory = cat;
    const category = this.allData.filter((item) => item.name === cat)[0];
    this.loadChart(category.subCategoryList);
  }

  buildChartInfo(groupedCategory: any[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const cores: any = [];

    groupedCategory.forEach((item) => {
      const dynamicColors =
        'rgb(' +
        Math.floor(Math.random() * 255) +
        ',' +
        Math.floor(Math.random() * 255) +
        ',' +
        Math.floor(Math.random() * 255) +
        ')';
      cores.push(dynamicColors);
    });

    const chartData = {
      labels: groupedCategory.map((item) => item.name),
      datasets: [
        {
          label: 'My First Dataset',
          data: groupedCategory.map((item) => item.amount),
          backgroundColor: cores,
          hoverOffset: 5,
        },
      ],
    };

    this.chart = new Chart('detail-by-type', {
      type: 'doughnut',
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'left',
          },
        },
        maintainAspectRatio: false,
      },
    });
  }

  closedPanel(categoryName) {
    if (this.selectedCategory == categoryName) {
      this.loadChart(this.allData);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  monthListEnum = [
    {
      index: 1,
      name: 'January',
    },
    {
      index: 2,
      name: 'February',
    },
    {
      index: 3,
      name: 'Marh',
    },
    {
      index: 4,
      name: 'April',
    },
    {
      index: 5,
      name: 'May',
    },
    {
      index: 6,
      name: 'June',
    },
    {
      index: 7,
      name: 'July',
    },
    {
      index: 8,
      name: 'August',
    },
    {
      index: 9,
      name: 'September',
    },
    {
      index: 10,
      name: 'October',
    },
    {
      index: 11,
      name: 'November',
    },
    {
      index: 12,
      name: 'December',
    },
  ];
}
