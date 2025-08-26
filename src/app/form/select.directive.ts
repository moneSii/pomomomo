import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelect]',
  standalone: true,
})
export class SelectDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) onClick() {
    this.el.nativeElement.select();
  }
}
