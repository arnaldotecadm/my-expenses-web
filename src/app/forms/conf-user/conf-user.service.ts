import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class ConfUserService {
  constructor(private http: HttpClient) {}

  getEstatisticaUtilizacao() {
    return this.http.get(API + "/statistics/user/records");
  }

  deleteAllTransactions() {
    return this.http.delete(API + "/statistics/user/records");
  }
}
