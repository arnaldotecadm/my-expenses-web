import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import { AnalysisModule } from './analysis/analysis.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetAnalysisModule } from './budgeting/budget-analysis/budget-analysis.module';
import { BudgetModule } from './budgeting/budget/budget.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DistributionModule } from './distribution/distribution.module';
import { ConfUserModule } from './forms/conf-user/conf-user.module';
import { ImportExportModule } from './forms/import-export/import-export.module';
import { PartyDebtModule } from './forms/party-debt/party-debt.module';
import { TagsModule } from './forms/tags/tags.module';
import { HistoryModule } from './history/history.module';
import { HomeModule } from './home/home.module';
import { LoadingInterceptor } from './interceptors/LoadingInterceptor';
import { GlobalErrorHandler } from './interceptors/error.handler';
import { RequestInterceptor } from './interceptors/request.interceptor.service';
import { LoadingService } from './service/loading-service';
import { ServiceLocator } from './service/service.locator';
import { NavbarModule } from './shared/navbar/navbar.module';

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
    PartyDebtModule,
    TagsModule,
    DistributionModule,
    HistoryModule,
    AnalysisModule,
    BudgetModule,
    BudgetAnalysisModule,
    NavbarModule,
    ConfUserModule,
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
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
