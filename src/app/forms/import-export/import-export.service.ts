import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(private http: HttpClient) {}

  public parseFile(file: File) {
    return this.http
      .post<any[]>(API + '/upload/parse/' + file.name, file, {
        headers:{
          'Content-Type': "application/json"
        }
      })
      .pipe(share());
  }

  public saveBatch(account) {
    return this.http
      .post<any[]>(API + '/account', account)
      .pipe(share());
  }
}
