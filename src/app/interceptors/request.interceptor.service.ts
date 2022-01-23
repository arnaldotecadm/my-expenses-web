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
import { TokenService } from "app/core/token/token.service";
import { UserService } from "app/core/user/user.service";
import { LoadingService } from "app/service/loading-service";
import { MenssageService } from "app/shared/notification/notification.service";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private msgService: MenssageService,
    private tokenService: TokenService,
    private usuarioService: UserService,
    private loadingService: LoadingService
  ) {}

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
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }

    return next.handle(req).pipe(
      tap((data) => {
        //console.log("LOG >>>>>", data);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.msgService.showError(
            error.error ? error.error.message : error.message
          );
        }
        if (error.status === 401 || error.status == 0) {
          this.usuarioService.logout();
          this.loadingService.setLoading(false);
          this.router.navigate(["sigin-in"]);
        }
        throw new HttpErrorResponse(error);
      })
    );
  }
}
