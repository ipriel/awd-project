import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';


import {NgModule} from '@angular/core';

@NgModule({
    exports: [
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatToolbarModule,
      MatExpansionModule,
      MatButtonToggleModule,
      MatMenuModule,
      MatIconModule,
      MatBadgeModule,
      MatDividerModule,
      MatListModule,
      MatGridListModule,
      MatCheckboxModule,
    ]
  })

  export class AngularMaterialModel{}