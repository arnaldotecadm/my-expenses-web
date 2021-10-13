import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
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
import { HomeModule } from "./home/home.module";
import { FooterModule } from "./shared/footer/footer.module";
import { UserModule } from "./dashboard/dashboard.module";
import { MonthScheduleModule } from "./forms/month-schedule/month-schedule.module";
import { PartyDebtModule } from "./forms/party-debt/party-debt.module";
import { ImportExportModule } from "./forms/import-export/import-export.module";
import { RequestInterceptor } from "./interceptors/request.interceptor.service";

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
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
