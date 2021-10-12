import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { share, shareReplay } from "rxjs/operators";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class ImportExportService {
  constructor(private http: HttpClient) {}

  public parseFile(file: File) {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this.http
      .post<any[]>(API + "/import-export/parse", formData)
      .pipe(share());
  }
}
