import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  MENU_ITEMS = [
    { routerLink: "home", icon: "home", label: "Home" },
    { routerLink: "dashboard", icon: "dashboard", label: "Dashboard" },
    { routerLink: "settings", icon: "settings", label: "Settings" },
    { routerLink: "", icon: "import_export", label: "Import Transactions" },
    {
      routerLink: "monthly-schedule",
      icon: "playlist_add_check",
      label: "Monthly Expense List",
    },
    { routerLink: "", icon: "exit_to_app", label: "Logout" },
  ];

  constructor(public location: Location) {}

  selectedItem = "home";

  ngOnInit() {
    let itemFromUrl = this.location.path().split("/");

    if (itemFromUrl.length == 0) {
      this.selectedItem = "Home";
    } else {
      let item = this.MENU_ITEMS.filter(
        (item) => item.routerLink === itemFromUrl[1]
      );
      if (item && item.length > 0) {
        this.selectedItem = item[0].label;
      }
    }
  }
}
