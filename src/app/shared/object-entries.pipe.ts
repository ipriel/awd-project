import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectEntries'
})
export class ObjectEntriesPipe implements PipeTransform {

  transform(object: {}): unknown {
    if (object == null || typeof object == 'undefined')
      return null;

    return Object.entries(object).map(([title, value]) => ({ title, value }));
  }

}
