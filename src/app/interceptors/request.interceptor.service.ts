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
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from 'src/app/service/loading-service';
import { UserService } from '../core/user/user.service';
import { SwitchAccountService } from '../service/switch-account.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private usuarioService: UserService,
    private switchAccountService: SwitchAccountService
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
    let account = this.switchAccountService.getSelectedAccount()?.uuid;

    const info = this.usuarioService.getUserInfo();
    if (info) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + info.idToken,
          identityId: info.identityId,
          selectedAccount: '' + account,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.logout();
        } else if (error.status === 403) {
          this.logout();
        }

        throw new HttpErrorResponse(error);
      })
    );
  }

  logout() {
    setTimeout(() => {
      Auth.signOut();
      this.loadingService.setLoading(false);
    }, 2000);
  }
}
