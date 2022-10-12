import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate({
    route,
    state,
  }: {
    route: ActivatedRouteSnapshot;
    state: RouterStateSnapshot;
  }): boolean | Observable<boolean> | Promise<boolean> {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        Auth.currentSession()
          .then((currentSesion) => {
            const refresh_token = currentSesion.getRefreshToken();
            user.refreshSession(refresh_token, (refErr, refSession) => {
              if (refErr) {
                Auth.signOut();
              }
            });
          })
          .catch((ex) => {
            Auth.signOut();
          });
      })
      .catch((ex) => {
        Auth.signOut();
      });

      return new Promise<boolean>((resolve) => {
        Auth.currentSession().then(
          (currentSesion) => {
            if (this.userService.getUserInfo() != null) {
              this.userService.getUserInfo().idToken = currentSesion
                .getIdToken()
                .getJwtToken();
            }
            resolve(currentSesion.isValid());
          },
          (err) => {
            Auth.signOut();
          }
        );
      });
  }
}
