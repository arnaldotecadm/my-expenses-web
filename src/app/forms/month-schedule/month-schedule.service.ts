import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { share, shareReplay } from "rxjs/operators";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class MonthScheduleService {
  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<any[]>(API + "/lista-compras/all-item").pipe(share());
  }

  public getAllGroupedByMonth() {
    return this.http.get<any[]>(API + "/analise/group-month");
  }

  public addItem(item) {
    return this.http.post<any[]>(API + "/lista-compras/add-item", item);
  }

  public removeItem(item) {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: item,
    };

    return this.http.delete<any[]>(API + "/lista-compras/remove-item", options);
  }
}
