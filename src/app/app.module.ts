import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImportExportModule } from './forms/import-export/import-export.module';
import { MonthScheduleModule } from './forms/month-schedule/month-schedule.module';
import { PartyDebtModule } from './forms/party-debt/party-debt.module';
import { TagsModule } from './forms/tags/tags.module';
import { HomeModule } from './home/home.module';
import { LoadingService } from './service/loading-service';
import { GlobalErrorHandler } from './interceptors/error.handler';
import { RequestInterceptor } from './interceptors/request.interceptor.service';
import { LoadingInterceptor } from './interceptors/LoadingInterceptor';

Amplify.configure(awsmobile);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AmplifyAuthenticatorModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    DashboardModule,
    ImportExportModule,
    MonthScheduleModule,
    PartyDebtModule,
    TagsModule,
  ],
  providers: [
    LoadingService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
