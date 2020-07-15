import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { AdminComponent } from './admin.component';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { MatCardModule } from '@angular/material/card';
import { AdminRoutingModule } from './admin-routing.module';
import { BarDirective } from './bar.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AdminComponent } from './admin.component';


@NgModule({
  // declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    AngularFireAnalyticsModule
  ],
  declarations: [DashboardComponent, BarDirective]
})
export class AdminModule { }
