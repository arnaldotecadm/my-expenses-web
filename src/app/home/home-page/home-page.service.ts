import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + '/transaction/all-with-summary');
  }

  getAllAccounts() {
    return this.http.get<any[]>(API + '/account');
  }

  getSummaryPerCategory() {
    return this.http.get<any[]>(API + '/transaction/summary-per-category');
  }
}
