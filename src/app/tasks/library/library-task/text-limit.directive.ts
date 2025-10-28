import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appTextLimit]',
  host: {
    '[class.at-limit]': 'atLimit',
  },
})
export class TextLimitDirective {
  constructor(private el: ElementRef) {}

  limit = input.required<number>();

  range = window.getSelection();

  oldVal = '';
  atLimit = false;

  @HostListener('input', ['$event']) onInput(event: Event) {
    const val = this.el.nativeElement.innerText;

    if (val.length > this.limit()) {
      this.el.nativeElement.innerText = this.oldVal;

      this.range?.removeAllRanges();
      this.el.nativeElement.blur();

      this.atLimit = true;
    } else {
      this.atLimit = false;
      this.oldVal = val;
    }
  }
}
