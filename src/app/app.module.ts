import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {AngularMaterialModel} from './angular-material.module'

import { MatCarouselModule } from "@ngmodule/material-carousel";

import { from } from "rxjs";
import { HeaderComponent } from "./header/header.component";
import { UserProfileComponent } from "./store/user-profile/user-profile.component";
import { AboutComponent } from "./about/about.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";


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
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    RouterModule,
    AngularMaterialModel,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
