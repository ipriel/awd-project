import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from '../angular-material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BarDirective } from './bar.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsEditorComponent } from './products-editor/products-editor.component';


@NgModule({
  // declarations: [AdminComponent],
  imports: [
    CommonModule,
  //  BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularMaterialModule,
    AngularFireAnalyticsModule
  ],
  declarations: [
    DashboardComponent,
    ProductsEditorComponent,
    BarDirective
  ]
})
export class AdminModule { }
