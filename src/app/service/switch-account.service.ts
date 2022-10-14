import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'any' })
export class SwitchAccountService {
  private switchAccount$ = new Subject();

  private selectedAcount;

  setSelectedAcount(selectedAcount: string) {
    this.selectedAcount = selectedAcount;
    this.switchAccount$.next(selectedAcount);
  }

  getSelectedAccount() {
    return this.selectedAcount;
  }

  getSwitchAccountAsObservable(){
    return this.switchAccount$.asObservable()
  }
}
