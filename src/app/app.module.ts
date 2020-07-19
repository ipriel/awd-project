import { NgModule } from "@angular/core";
import { AngularFireAnalyticsModule, CONFIG, ScreenTrackingService } from '@angular/fire/analytics';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { AboutComponent } from "./about/about.component";
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "./shared/shared.module";
import { UserProfileComponent } from "./store/user-profile/user-profile.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    RouterModule,
    AngularMaterialModule,
    AngularFireAnalyticsModule,
    HttpClientModule
  ],
  providers: [
    ScreenTrackingService,
    {
      provide: CONFIG, useValue: {
        send_page_view: false,
        allow_ad_personalization_signals: false,
        anonymize_ip: true
      }
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
