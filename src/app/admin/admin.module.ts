import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { ReactiveFormsModule } from '@angular/forms';
// import { AdminComponent } from './admin.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BarDirective } from './bar.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsEditorComponent } from './products-editor/products-editor.component';
import { UserAuthorizationComponent } from './user-authorization/user-authorization.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularMaterialModule,
    AngularFireAnalyticsModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    ProductsEditorComponent,
    BarDirective,
    UserAuthorizationComponent,
    NavbarComponent
  ]
})
export class AdminModule { }
