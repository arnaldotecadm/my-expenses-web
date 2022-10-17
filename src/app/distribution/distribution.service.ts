import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class DistributionService {
  constructor(private http: HttpClient) {}

  getAllCategory(year: number, month: number) {
    return this.http.get<any[]>(API + "/category/chart/" + year + "/" + month);
  }

}
