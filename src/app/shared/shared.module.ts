import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { BtoImgPipe } from './btoimg.pipe';
import { ObjectEntriesPipe } from './object-entries.pipe';
import { ResolveIdPipe } from './resolve-id.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';



@NgModule({
  declarations: [
    BtoImgPipe,
    ResolveIdPipe,
    ObjectEntriesPipe,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    BtoImgPipe,
    ResolveIdPipe,
    ObjectEntriesPipe,
    SearchBarComponent
  ]
})
export class SharedModule { }
