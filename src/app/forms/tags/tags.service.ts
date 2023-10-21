import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + "/tag");
  }

  getTransactionByParty(party) {
    return this.http.get<any[]>(API + "/tag/" + party);
  }
}
