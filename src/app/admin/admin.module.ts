import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
    AngularFireAnalyticsModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [DashboardComponent, BarDirective]
})
export class AdminModule { }
