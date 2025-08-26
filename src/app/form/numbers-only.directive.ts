import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef, private control: NgControl) {}
  @HostListener('input', ['$event']) onInput(event: Event) {
    const initialVal = this.el.nativeElement.value;
    const newVal = initialVal.replace(/[^0-9]*/g, '');

    if (newVal !== initialVal) {
      this.control.reset(newVal);
      this.el.nativeElement.value = newVal;
      event.stopPropagation();
    }
  }
}
