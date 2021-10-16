import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "app/dashboard/dashboard.service";
import { Observable } from "rxjs";
import { MonthScheduleService } from "./month-schedule.service";

@Component({
  selector: "app-month-schedule",
  templateUrl: "./month-schedule.component.html",
  styleUrls: ["./month-schedule.component.css"],
})
export class MonthScheduleComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  identifier = 0;
  obj$: Observable<any>;
  cliente: any;
  displayedColumns: string[] = ["item", "qty"];
  dataSource: any;
  data = [];
  list$: Observable<any>;

  currentMonth$;

  totalExpenses = 0;
  totalIncome = 0;

  itemQty = 0;
  itemAmount = 0.0;
  qtyLines = 0;

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private service: MonthScheduleService
  ) {
    this.update();
  }

  ngOnInit(): void {
    this.list$ = this.service.getAllGroupedByMonth();
  }

  carregarDados(item, qty, amount) {
    let itemdata = {
      itemName: item,
      qty: qty,
      amount: amount,
    };

    this.service.addItem(itemdata).subscribe((data) => {
      this.update();
    });
  }

  removeItem(item) {
    this.service.removeItem(item).subscribe((data) => {
      this.update();
    });
  }

  private update() {
    this.obj$ = this.service.getAll();

    this.itemQty = 0;
    this.itemAmount = 0.0;
    this.qtyLines = 0;

    this.service.getAll().subscribe((data) => {
      this.qtyLines = data.length;
      data.forEach((d) => {
        this.itemAmount += d.amount;
        this.itemQty += d.qty;
      });
    });
  }
}
