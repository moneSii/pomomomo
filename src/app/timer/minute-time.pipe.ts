import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteTime',
  standalone: true,
})
export class MinuteTimePipe implements PipeTransform {
  transform(milliseconds: number, format: 'mm:ss:S' | 'mm:ss'): string {
    const seconds = Math.trunc(milliseconds / 1000) % 60;
    const minutes = Math.trunc(milliseconds / 1000 / 60);

    if (format == 'mm:ss:S') {
      const decaSeconds = Math.trunc(milliseconds / 100) % 10;
      return (
        minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        ':' +
        seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        '.' +
        decaSeconds
      );
    } else {
      return (
        minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        ':' +
        seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      );
    }
  }
}
