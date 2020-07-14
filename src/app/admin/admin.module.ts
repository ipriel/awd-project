import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { BarDirective } from './bar.directive';
import { ProductsEditorComponent } from './products-editor/products-editor.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { AdminComponent } from './admin.component';


@NgModule({
  // declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [DashboardComponent, BarDirective, ProductsEditorComponent]
})
export class AdminModule { }
