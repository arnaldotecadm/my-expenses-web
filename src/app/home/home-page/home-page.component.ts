import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/dashboard/dashboard.service";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Subject } from "rxjs";

Chart.register(
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: "app-home",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  private chartHistory;
  private chartHistoryPerCategory;
  constructor(private homeService: DashboardService) {}

  resumoAtual$ = new Subject();
  lastIncome;
  lastExpense;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.homeService.getAll().subscribe((data) => {
      this.lastIncome = data.filter((item) => item.amount > 0)[0];
      this.lastExpense = data.filter((item) => item.amount < 0)[0];
      this.resumoAtual$.next(data[0]);
      this.loadHistoryChart(
        data.filter((item) => item.entryType == "RESUMO").reverse()
      );

      this.loadChartGrouppedByCategory(
        data.filter((item) => item.entryType != "RESUMO")
      );
    });

    this.homeService
      .getSummaryPerCategory()
      .subscribe((data) => this.loadChartGroupedByCategory(data.reverse()));
  }

  loadChartGroupedByCategory(data: any[]) {
    if (!data || data.length == 0) {
      return;
    }

    const values = data.map((item) => item.values);
    const labels = values[0].map((i) => i.nome);
    const labelsCategory = data.map((i) => i.label);

    let datasetChart = [];

    let aux = 0;
    values.forEach((item) => {
      const dynamicColors =
        "rgb(" +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        ")";

      datasetChart.push({
        data: item.map((j) => Math.abs(j.valor)),
        borderWidth: 1,
        label: labelsCategory[aux],
        borderColor: dynamicColors,
        backgroundColor: dynamicColors,
      });
      aux++;
    });

    const chartData = {
      labels: labels,
      backgroundColor: "#fff",
      datasets: datasetChart,
    };

    if (this.chartHistoryPerCategory) {
      this.chartHistoryPerCategory.destroy();
    }
    this.chartHistoryPerCategory = new Chart("chartHistoryPerCategory", {
      type: "line",
      data: chartData,
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: "Mostrando os 20 Clientes mais relevantes para a Analise ",
          },
          tooltip: {},
          legend: {
            labels: { usePointStyle: true },
            position: "right",
            display: true,
          },
        },
      },
    });
  }

  loadHistoryChart(data) {
    data.forEach((item) => (item.expense = item.expense * -1));
    const chartData = {
      labels: data.map((item) => item.month),
      backgroundColor: "#fff",
      datasets: [
        {
          data: data.map((item) => item.income),
          borderWidth: 1,
          backgroundColor: "#4caf50",
        },

        {
          data: data.map((item) => item.expense),
          borderWidth: 1,
          backgroundColor: "#f44336",
        },
      ],
    };

    if (this.chartHistory) {
      this.chartHistory.destroy();
    }
    this.chartHistory = new Chart("chartHistory", {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Mostrando os 20 Clientes mais relevantes para a Analise ",
          },
          tooltip: {},
          legend: {
            display: false,
          },
        },
      },
    });
  }

  loadChartGrouppedByCategory(data: any[]) {
    const chartRawData = this.groupByKey(data, "labelMain");
    const chartGroupedData = Object.entries(chartRawData).map((item) => {
      return {
        name: item[0],
        values: item[1],
      };
    });
  }

  groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }
}
