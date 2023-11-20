import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(API + '/planning');
  }

  getByUuid(uuid) {
    return this.http.get<any[]>(API + '/planning/' + uuid);
  }

  save(planning) {
    return this.http.post<any[]>(API + '/planning', planning);
  }

  delete(uuid) {
    return this.http.delete<any[]>(API + '/planning/' + uuid);
  }

  getPlanningSummary(startDate, endDate) {
    return this.http.get<any[]>(API + '/planning/' + startDate + '/' + endDate);
  }

  copyOver(yearMonth){
    return this.http.put<any>(API+'/planning/copy-over/'+ yearMonth, "");
  }

  cleanUpCopyOver(yearMonth){
    return this.http.delete<any>(API+'/planning/clean-up/'+ yearMonth);
  }
}
