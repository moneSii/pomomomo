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

  oldVal = '';
  atLimit = false;

  @HostListener('input', ['$event']) oninput(event: Event) {
    const val = this.el.nativeElement.innerText;

    if (val.length > this.limit()) {
      this.el.nativeElement.innerText = this.oldVal;
      this.atLimit = true;
    } else {
      this.atLimit = false;
      this.oldVal = val;
    }
  }
}
