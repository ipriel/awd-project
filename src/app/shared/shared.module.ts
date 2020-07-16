import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtoImgPipe } from './btoimg.pipe';
import { ObjectEntriesPipe } from './object-entries.pipe';
import { ResolveIdPipe } from './resolve-id.pipe';



@NgModule({
  declarations: [
    BtoImgPipe,
    ResolveIdPipe,
    ObjectEntriesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [BtoImgPipe, ResolveIdPipe, ObjectEntriesPipe]
})
export class SharedModule { }
