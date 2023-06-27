import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 100, completeWords: boolean = false, ellipsis: string = '...') {
    let finalValue = value;

    if (value.length > limit) {
      if (completeWords) {
        limit = value.substr(0, limit).lastIndexOf(' ');
      }
      finalValue = `${value.substr(0, limit)}${ellipsis}`;
    }

    return finalValue;
  }

}
