import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getSummary() {
    return this.http.get<any[]>(API + "/transaction/all-with-summary");
  }
}
