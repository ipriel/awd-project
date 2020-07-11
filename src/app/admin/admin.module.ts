import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { BarDirectiveDirective } from './bar-directive.directive';
// import { AdminComponent } from './admin.component';


@NgModule({
  // declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
  ],
  declarations: [DashboardComponent, BarDirectiveDirective]
})
export class AdminModule { }
