import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  getTotalsGroupedByMonth() {
    return this.http.get<any[]>(API + '/transaction/totals-grouped-by-month');
  }
}
