import { Directive, ElementRef, HostListener, input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLessThan]',
  standalone: true,
})
export class LessThanDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  upperLimit = input.required<number>();
  lowerLimit = input.required<number>();

  @HostListener('input', ['$event']) onInput(event: Event) {
    const initialVal = this.el.nativeElement.value;
    if (initialVal > this.upperLimit()) {
      this.el.nativeElement.value = 60;
      this.control.reset('60');
      event.stopPropagation();
    } else if (initialVal < this.lowerLimit()) {
      this.el.nativeElement.value = 1;
      this.control.reset('1');
      event.stopPropagation();
    }
  }
}
