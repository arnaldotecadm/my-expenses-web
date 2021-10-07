import { Component, Input } from "@angular/core";
import { Chart } from "chart.js";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-month-analysis-comparison",
  templateUrl: "./month-analysis-comparison.component.html",
  styleUrls: ["./month-analysis-comparison.component.css"],
})
export class MonthAnalysisComparisonComponent {
  pieChart: any;

  selectedMonth = -1;
  monthListEnum = [
    { index: 0, name: "January" },
    { index: 1, name: "February" },
    { index: 2, name: "Marh" },
    { index: 3, name: "April" },
    { index: 4, name: "May" },
    { index: 5, name: "June" },
    { index: 6, name: "July" },
    { index: 7, name: "August" },
    { index: 8, name: "September" },
    { index: 9, name: "October" },
    { index: 10, name: "November" },
    { index: 11, name: "December" },
  ];

  @Input() inputValues = [];

  @Input() application = "My Expenses";

  @Input() selectedLabel = "Default Account";

  selectedOption = "";

  chart: any;

  numberExceptions = 5;

  constructor(private homeService: DashboardService) {}

  totalIncome;
  totalExpense;

  monthAnalysis;

  dataTable = [];
  selectedSourceMonth;
  selectedTargetMonth;

  sourceMonth;
  targetMonth;

  ngOnInit(): void {
    const month = new Date().getMonth();

    this.selectedSourceMonth = month;
    this.selectedTargetMonth = month > 0 ? month - 1 : 11;
    this.loadChart(
      this.selectedSourceMonth,
      this.selectedTargetMonth,
      "Source",
      "Target"
    );
  }

  monthChanged(source, target) {
    this.sourceMonth = this.monthListEnum.filter(
      (item) => item.index == source
    )[0].name;
    this.targetMonth = this.monthListEnum.filter(
      (item) => item.index == target
    )[0].name;

    this.loadChart(source, target, this.sourceMonth, this.targetMonth);
  }

  loadChart(source, target, labelSource, labelTarget) {
    this.homeService
      .getMonthAnalysisAgainstLastMonth(source, target)
      .subscribe((data) => {
        this.monthAnalysis = data;

        let currentMonthList = data.map((item) => item.currentMonth);
        let expensesList = data.map((item) => item.lastMonth);
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
    const speedCanvas = document.getElementById("month-analysis-comparison");

    const dataFirst = {
      data: chartData,
      fill: false,
      borderColor: "#eb4034",
      backgroundColor: "#eb4034",
      pointBorderColor: "#eb4034",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
      label: labelSource,
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
      label: labelTarget,
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
