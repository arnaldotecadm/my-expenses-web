import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/dashboard/dashboard.service";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Subject } from "rxjs";

Chart.register(
  BarController,
  BarElement,
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
  constructor(private homeService: DashboardService) {}

  resumoAtual$ = new Subject();
  lastIncome;
  lastExpense;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.homeService.getAll().subscribe((data) => {
      console.log(data);
      debugger;
      this.lastIncome = data.filter((item) => item.amount > 0)[0];
      this.lastExpense = data.filter((item) => item.amount < 0)[0];
      this.resumoAtual$.next(data[0]);

      this.loadHistoryChart(
        data.filter((item) => item.entryType == "RESUMO").reverse()
      );
    });
  }

  loadHistoryChart(data) {
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
}
