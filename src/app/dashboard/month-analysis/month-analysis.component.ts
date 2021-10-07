import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatSelect, MatSelectChange } from "@angular/material/select";
import { Chart } from "chart.js";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-month-analysis",
  templateUrl: "./month-analysis.component.html",
  styleUrls: ["./month-analysis.component.css"],
})
export class MonthAnalysisComponent {
  @ViewChild("selectExceptionType", { static: true }) selectOption: MatSelect;

  selectedMonth = -1;
  monthListEnum = [
    {index: 0, name: "January"},
    {index: 1, name: "February"},
    {index: 2, name: "Marh"},
    {index: 3, name: "April"},
    {index: 4, name: "May"},
    {index: 5, name: "June"},
    {index: 6, name: "July"},
    {index: 7, name: "August"},
    {index: 8, name: "September"},
    {index: 9, name: "October"},
    {index: 10, name: "November"},
    {index: 11, name: "December"}
  ]

  pieChart: any;

  @Input() inputValues = [];

  @Input() application = "My Expenses";

  @Input() selectedLabel = "Default Account";

  selectedOption = "";

  chart: any;

  numberExceptions = 5;

  constructor(private homeService: DashboardService) {
    this.selectedMonth = new Date().getMonth();
  }

  incomeList;
  expensesList;
  monthList;

  totalIncome;
  totalExpense;

  monthAnalysis$;
  currentMonth;

  ngOnInit(): void {
    this.loadChart(this.selectedMonth);
  }

  monthChanged(input){
    this.loadChart(input)
  }

  loadChart(monthToLoad) {
    this.monthAnalysis$ = this.homeService.getMonthAnalysisByMonth(monthToLoad)
    this.homeService.getCurrentMonthByMonth(monthToLoad).subscribe((data) => {
      this.currentMonth = data;
      this.totalIncome = data.income;
      this.totalExpense = data.expense;

      this.incomeList = data.perWeekList.map((item) => item.income);
      this.expensesList = data.perWeekList.map((item) => item.expense);
      this.monthList = data.perWeekList.map((item) => item.week + " ª Semana");

      this.buildChartInfo(this.expensesList, this.monthList, this.incomeList);
    });
  }

  buildChartInfo(chartData: number[], chartlabel = [], chartData2: number[]) {
    const speedCanvas = document.getElementById("month-analysis");

    const dataFirst = {
      data: chartData,
      fill: false,
      borderColor: "#eb4034",
      backgroundColor: "#eb4034",
      pointBorderColor: "#eb4034",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
      label: "Expenses",
    };

    const dataSecond = {
      data: chartData2,
      fill: false,
      borderColor: "#45ac09",
      backgroundColor: "#45ac09",
      pointBorderColor: "#45ac09",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
      label: "Income",
      indexAxis: "asf",
    };

    const speedData = {
      labels: chartlabel,
      datasets: [dataFirst, dataSecond],
    };

    const chartOptions = {
      legend: {
        display: true,
        position: "bottom",
      },
    };

    this.chart = new Chart(speedCanvas, {
      type: "line",
      hover: false,
      data: speedData,
      options: chartOptions,
    });
  }
}
