import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + '/budget');
  }

  getAllCategories() {
    return this.http.get<any[]>(API + '/category');
  }

  getByUuid(uuid) {
    return this.http.get<any[]>(API + '/budget/' + uuid);
  }

  save(budget) {
    return this.http.post<any[]>(API + '/budget', budget);
  }
}
