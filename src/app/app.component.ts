import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from 'aws-amplify';
import { UserService } from './core/user/user.service';
import { LoadingService } from './service/loading-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-expenses';

  constructor(
    @Inject(LoadingService) readonly loadingService: LoadingService,
    private router: Router,
    private userService: UserService
  ) {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'signIn') {
        userService.loadUserInfoFromSession();
        router.navigate(['dashboard']);
      } else if (event == 'signOut') {
        userService.unloadUserInfoFromSession();
      }
    });
  }
}
