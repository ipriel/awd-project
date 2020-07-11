import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btoimg'
})
export class BtoImgPipe implements PipeTransform {

  transform(value:  {data: Buffer, contentType: string}): string {
    const imgData = btoa(String.fromCharCode.apply(null, value.data));
    return `data:${value.contentType};base64,${imgData}`;
  }

}
