import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appEditableConstraints]',
  host: {
    '[class.at-limit]': 'atLimit',
  },
})
export class EditableContraintsDirective {
  constructor(private el: ElementRef) {}

  limit = input.required<number>();

  range = window.getSelection();
  caretOffset = this.range?.anchorOffset;

  oldVal = '';
  atLimit = false;

  @HostListener('input', ['$event']) onInput() {
    const val = this.el.nativeElement.innerHTML;
    const newRange = document.createRange();

    if (val.length > this.limit()) {
      this.el.nativeElement.innerHTML = this.oldVal;

      newRange.setStart(this.el.nativeElement.firstChild, this.caretOffset!);

      this.range?.removeAllRanges();
      this.range?.addRange(newRange);

      this.atLimit = true;
    } else {
      this.atLimit = false;
      this.oldVal = val;
    }
    this.caretOffset = this.range?.anchorOffset;
  }

  @HostListener('click', ['$event']) onClick() {
    this.caretOffset = this.range?.anchorOffset;
  }
}
