import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CoreModule } from "./core/core.module";
import { GlobalErrorHandler } from "./core/errors/error-handler/global-error-handler";
import { UserModule } from "./dashboard/dashboard.module";
import { ImportExportModule } from "./forms/import-export/import-export.module";
import { MonthScheduleModule } from "./forms/month-schedule/month-schedule.module";
import { PartyDebtModule } from "./forms/party-debt/party-debt.module";
import { TagListModule } from "./forms/tags/tag-list/tag-list.module";
import { HomeModule } from "./home/home.module";
import { LoadingInterceptor } from "./interceptors/LoadingInterceptor";
import { RequestInterceptor } from "./interceptors/request.interceptor.service";
import { LoadingService } from "./service/loading-service";
import { FooterModule } from "./shared/footer/footer.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FooterModule,
    AppRoutingModule,
    HomeModule,
    UserModule,
    MonthScheduleModule,

    BrowserModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,

    ToastrModule.forRoot(),

    PartyDebtModule,
    ImportExportModule,
    CoreModule,
    TagListModule,
  ],
  declarations: [AppComponent],
  providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
