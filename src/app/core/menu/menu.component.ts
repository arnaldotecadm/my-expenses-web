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
  subscription: Subscription | undefined;
  MENU_ITEMS = [
    { routerLink: 'home', icon: 'home', label: 'Home' },
    { routerLink: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { routerLink: 'party-debt', icon: 'dashboard', label: 'Payee/Payer' },
    { routerLink: 'tags', icon: 'dashboard', label: 'Tags' },
    { routerLink: 'distributions', icon: 'dashboard', label: 'Distributions' },
    { routerLink: 'history', icon: 'dashboard', label: 'History' },
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
