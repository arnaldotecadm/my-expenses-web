import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HomePageService } from 'src/app/home/home-page/home-page.service';
import { SwitchAccountService } from 'src/app/service/switch-account.service';

@Component({
  selector: 'app-switch-account',
  templateUrl: './switch-account.component.html',
  styleUrls: ['./switch-account.component.scss'],
})
export class SwitchAccountComponent implements OnInit {
  currentlyActiveAccount;
  accountList$!: Observable<any>;

  constructor(private homePageService: HomePageService, private switchAccountService : SwitchAccountService) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.accountList$ = this.homePageService.getAllAccounts().pipe(    
      tap((accountList) => {
        if (accountList && accountList.length > 0) {
          this.currentlyActiveAccount = accountList[0];
          this.switchAccountService.setSelectedAcount(this.currentlyActiveAccount)
        }
      })
    );
  }

  changeAccount(account){
    this.currentlyActiveAccount = account;
    this.switchAccountService.setSelectedAcount(account);
  }
}
