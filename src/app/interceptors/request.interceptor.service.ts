import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MenssageService } from "app/shared/notification/notification.service";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private router: Router, private msgService: MenssageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    return next.handle(req).pipe(
      tap((data) => {
        //console.log("LOG >>>>>", data);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.msgService.showError(error.error ? error.error.message : error.message)
        } 
        throw new HttpErrorResponse(error);
      })
    );
  }
}
