import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class PartyDebtService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + "/party");
  }

  getTransactionByParty(party) {
    return this.http.get<any[]>(API + "/transacao/party/" + party);
  }
}
