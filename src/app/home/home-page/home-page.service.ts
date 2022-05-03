import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + "/transaction/all-with-summary");
  }

  getDataForGraphPastFourMonth() {
    return this.http.get<any[]>(API + "/analise/graph-last-4-month");
  }

  getCurrentMonth() {
    return this.http.get<any>(API + "/analise/current-month");
  }

  getCurrentMonthByMonth(month) {
    return this.http.get<any>(API + "/analise/current-month/" + month);
  }

  getMonthAnalysisByMonth(month) {
    return this.http.get<any>(API + "/analise/month-analysis/" + month);
  }

  getMonthAnalysisAgainstLastMonth(source, target) {
    return this.http.get<any>(
      API + "/analise/month-analysis-comparison/" + source + "/" + target
    );
  }
}
