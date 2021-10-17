import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-user",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashBoardComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  identifier = 0;
  obj$: Observable<any>;
  cliente: any;
  displayedColumns: string[] = ["dateStr", "comment", "labelMain", "amount"];
  dataSource: any;
  data;
  originalData;

  currentMonth$;

  totalExpenses = 0;
  totalIncome = 0;

  monthListEnum = [
    { index: -1, number: "00", name: "All" },
    { index: 0, number: "01", name: "January" },
    { index: 1, number: "02", name: "February" },
    { index: 2, number: "03", name: "Marh" },
    { index: 3, number: "04", name: "April" },
    { index: 4, number: "05", name: "May" },
    { index: 5, number: "06", name: "June" },
    { index: 6, number: "07", name: "July" },
    { index: 7, number: "08", name: "August" },
    { index: 8, number: "09", name: "September" },
    { index: 9, number: "10", name: "October" },
    { index: 10, number: "11", name: "November" },
    { index: 11, number: "12", name: "December" },
  ];

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private service: DashboardService
  ) {
    this.obj$ = this.service.getAll();
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  filter = "";

  filterMonth = "";

  filterData(value) {
    this.filter = value;
    this.applyFilter(this.filter, this.filterMonth);
  }

  monthChanged(month) {
    this.filterMonth = month;
    this.applyFilter(this.filter, this.filterMonth);
  }

  applyFilter(data, month) {
    this.filterMonth = month;

    let filteredData = this.originalData;

    if (month != "00") {
      filteredData = filteredData.filter(
        (item) => item.entryType || item.dateStr.substr(3, 2) == month
      );
    }

    filteredData = filteredData.filter(
      (item) =>
        item.entryType ||
        item.labelMain.toUpperCase().includes(data.toUpperCase()) ||
        item.labelSub.toUpperCase().includes(data.toUpperCase())
    );

    this.data = filteredData;
  }

  carregarDados() {
    this.service.getAll().subscribe((data: any[]) => {
      data.forEach((item) => {
        if (item.tagList) {
          item.tagList = item.tagList.split(",");
        }
      });

      this.data = data;
      this.originalData = data;

      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;

      this.totalExpenses = data
        .filter((item) => item.amount < 0.0)
        .reduce((acc, val) => (acc -= val.amount), 0);
      this.totalIncome = data
        .filter((item) => item.amount >= 0.0)
        .reduce((acc, val) => (acc += val.amount), 0);
    });

    this.currentMonth$ = this.service.getCurrentMonth();
  }
}
