import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticsRoutingModule } from './logistics-routing.module';
import { LogisticsComponent } from './logistics.component';


@NgModule({
  declarations: [LogisticsComponent],
  imports: [
    CommonModule,
    LogisticsRoutingModule
  ]
})
export class LogisticsModule { }
