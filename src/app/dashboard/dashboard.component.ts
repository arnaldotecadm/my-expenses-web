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

  currentMonth$;

  totalExpenses = 0;
  totalIncome = 0;

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

  carregarDados() {
    this.service.getAll().subscribe((data: any[]) => {
      data.forEach((item) => {
        if (item.tagList) {
          item.tagList = item.tagList.split(",");
        }
      });

      this.data = data;

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
