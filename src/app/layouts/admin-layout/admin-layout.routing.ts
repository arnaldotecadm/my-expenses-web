import { Routes } from '@angular/router';

import { UserComponent } from '../../user/user.component';
import { AppListComponent } from 'app/aplicativo/app-list/app-list.component';
import { SoftwareComponent } from 'app/aplicativo/software/software.component';
import { AuthGuard } from 'app/core/auth/auth.guard';
import { HomePageComponent } from 'app/home/home-page/home-page.component';
import { UserListComponent } from 'app/user/user-list/user-list.component';
import { UpdatesComponent } from 'app/aplicativo/updates/updates.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    component: UserComponent,
  },
  { path: 'user-list', component: UserListComponent },
  { path: 'app-list', component: AppListComponent },
  { path: 'software', component: SoftwareComponent },
  { path: 'updates', component: UpdatesComponent },
];
