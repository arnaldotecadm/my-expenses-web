import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Subject, Subscription } from 'rxjs';
import { SwitchAccountService } from 'src/app/service/switch-account.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menuItems: any[] | undefined;
  subscription: Subscription | undefined;
  MENU_ITEMS = [
    { routerLink: 'home', icon: 'home', label: 'Home' },
    { routerLink: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { routerLink: 'party-debt', icon: 'dashboard', label: 'Payee/Payer' },
    { routerLink: 'tags', icon: 'dashboard', label: 'Tags' },
    { routerLink: 'distributions', icon: 'dashboard', label: 'Distributions' },
    { routerLink: 'history', icon: 'dashboard', label: 'History' },
    { routerLink: 'analysis', icon: 'dashboard', label: 'Analisys' },
    {
      routerLink: 'import-export',
      icon: 'import_export',
      label: 'Import Transactions',
    },
  ];

  constructor(
    public location: Location,
    private menuService: MenuService,
    private switchAccountService: SwitchAccountService
  ) {}

  currentUser$ = new Subject();
  summary$ = new Subject();

  selectedItem = 'home';

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.subscription = this.switchAccountService
      .getSwitchAccountAsObservable()
      .subscribe(() => {
        this.loadData;
      });
  }

  loadData() {
    this.menuService.getSummary().subscribe((data) => {
      this.summary$.next(data[0]);
    });

    let itemFromUrl = this.location.path().split('/');

    if (itemFromUrl.length == 0) {
      this.selectedItem = 'Home';
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
    Auth.signOut();
  }

  isLoggedIn(): boolean {
    return true;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

declare interface RouteInfo {
  id;
  path: string;
  title: string;
  icon: string;
  class: string;
  subItems: Object;
  descricao: string;
}
export const ROUTES: RouteInfo[] = [
  {
    id: null,
    path: "/home",
    title: "Home",
    icon: "home",
    class: "",
    subItems: [],
    descricao: "",
  },
  {
    id: null,
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    subItems: [],
    descricao: "",
  },
  {
    id: null,
    path: "/party-debt",
    title: "Payee/Payer",
    icon: "account_balance",
    class: "",
    subItems: [],
    descricao:
      "",
  },
  {
    id: null,
    path: "/tags",
    title: "Tags",
    icon: "local_offer",
    class: "",
    subItems: [],
    descricao:
      "",
  },
  {
    id: null,
    path: "/distributions",
    title: "distributions",
    icon: "pie_chart",
    class: "",
    subItems: [],
    descricao:
      "",
  },
  {
    id: null,
    path: "/history",
    title: "History",
    icon: "history",
    class: "",
    subItems: [],
    descricao:
      "",
  },
  {
    id: "analysis",
    path: "/analysis",
    title: "analysis",
    icon: "dashboard",
    class: "",
    subItems: [
      {
        path: "/monthly-analysis",
        title: "Monthly Analysis",
        icon: "analytics",
        class: "",
        descricao: "",
      },
      {
        path: "/four-months-review",
        title: "Four Months Review",
        icon: "analytics",
        class: "",
        descricao: "",
      },
      {
        path: "/current-month-analysis",
        title: "Monthly Comparison",
        icon: "analytics",
        class: "",
        descricao: "",
      },
    ],
    descricao: "",
  },
  {
    id: "budgeting",
    path: "/budgeting",
    title: "Budgeting",
    icon: "account_balance_wallet",
    class: "",
    subItems: [
      {
        path: "/budgets",
        title: "Budget List",
        icon: "wallet",
        class: "",
        descricao: "",
      },
      {
        path: "/budget-analysis",
        title: "Budgeting Analysis",
        icon: "equalizer",
        class: "",
        descricao: "",
      }
    ],
    descricao: "",
  },
  {
    id: null,
    path: "/import-export",
    title: "Import Transactions",
    icon: "import_export",
    class: "",
    subItems: [],
    descricao: "",
  },
  
];