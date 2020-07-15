import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtoImgPipe } from './btoimg.pipe';
import { ResolveIdPipe } from './resolve-id.pipe';



@NgModule({
  declarations: [
    BtoImgPipe,
    ResolveIdPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [BtoImgPipe, ResolveIdPipe]
})
export class SharedModule { }
