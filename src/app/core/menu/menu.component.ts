import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { UserService } from "../user/user.service";
import * as firebase from "firebase/app";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  MENU_ITEMS = [
    { routerLink: "home", icon: "home", label: "Home" },
    { routerLink: "dashboard", icon: "dashboard", label: "Dashboard" },
    { routerLink: "party-debt", icon: "dashboard", label: "Payee/Payer" },
    { routerLink: "tags", icon: "dashboard", label: "Tags" },
    { routerLink: "settings", icon: "settings", label: "Settings" },
    {
      routerLink: "import-export",
      icon: "import_export",
      label: "Import Transactions",
    },
    /*{
      routerLink: "monthly-schedule",
      icon: "playlist_add_check",
      label: "Monthly Expense List",
    },*/
  ];

  constructor(public location: Location, private userService : UserService) {}

  currentUser$ = new Subject();

  selectedItem = "home";

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged((data) => {
      this.currentUser$.next(firebase.default.auth().currentUser);
    });

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

  logout() {
    this.userService.logout();
  }

  isLoggedIn(): boolean {
    return this.userService.isLogged();
  }
}
