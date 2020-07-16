import { Pipe, PipeTransform } from '@angular/core';
import { ImageData } from './types';

@Pipe({
  name: 'btoimg'
})
export class BtoImgPipe implements PipeTransform {

  transform(value:  ImageData): string {
    if (value == null || typeof value == 'undefined')
      return null;

    const imgData = btoa(String.fromCharCode.apply(null, value.data));
    return `data:${value.contentType};base64,${imgData}`;
  }

}
