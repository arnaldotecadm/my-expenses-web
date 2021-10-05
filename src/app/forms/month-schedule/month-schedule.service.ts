import { HttpClient } from "@angular/common/http";
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
    return this.http.get<any[]>(API + "/all-item")
      .pipe(share())
  }

  public getAllGroupedByMonth() {
    return this.http.get<any[]>(API + "/group-month");
  }

  public addItem(item) {
    return this.http.post<any[]>(API + "/add-item", item);
  }
}
