import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { AboutComponent } from "./about/about.component";
import { AngularMaterialModel } from './angular-material.module';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { BtoImgPipe } from './btoimg.pipe';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { UserProfileComponent } from "./store/user-profile/user-profile.component";





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
    BtoImgPipe,
    
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
