import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + '/transaction/all-with-summary');
  }

  getDataForGraphPastFourMonth() {
    return this.http.get<any[]>(API + '/analise/graph-last-4-month');
  }

  getCurrentMonth() {
    return this.http.get<any>(API + '/analise/current-month');
  }

  getCurrentMonthByMonth(year, month) {
    return this.http.get<any>(
      API + '/analise/current-month/' + year + '/' + month
    );
  }

  getMonthAnalysisByMonth(year, month) {
    return this.http.get<any>(
      API + '/analise/month-analysis/' + year + '/' + month
    );
  }

  getMonthAnalysisAgainstLastMonth(source, target) {
    return this.http.get<any>(
      API + '/analise/month-analysis-comparison/' + source + '/' + target
    );
  }

  getValidYEarMonthCombination(){
    return this.http.get<any>(
      API + '/transaction/yearMonth'
    );
  }
}
