import {
  Directive,
  ElementRef,
  input,
  inject,
  OnInit,
  OnDestroy,
  AfterContentInit,
} from '@angular/core';
import { fromEvent, debounceTime, map, Subscription } from 'rxjs';

import { TasksService } from '../../tasks.service';

@Directive({
  selector: '[appEditable]',
})
export class EditableDirective implements OnInit, OnDestroy, AfterContentInit {
  private el = inject(ElementRef);
  private tasksService = inject(TasksService);

  contentType = input.required<string>();
  taskId = input.required<number>();

  inputSubscription = new Subscription();

  change = false;
  hold = {
    value: '',
    type: '',
    id: 0,
  };

  ngOnInit() {
    this.inputSubscription = fromEvent(this.el.nativeElement, 'input')
      .pipe(
        debounceTime(150),
        map((val: typeof this.el.nativeElement) => val.srcElement.innerText)
      )
      .subscribe((val) => {
        this.change = true;
        this.hold = {
          value: val,
          type: this.contentType(),
          id: this.taskId(),
        };
      });
  }

  ngAfterContentInit() {
    const withoutLineBreak = this.el.nativeElement.innerHTML.replace(
      /^\n|\n$/g,
      ''
    );
    this.el.nativeElement.innerHTML = withoutLineBreak;
  }

  ngOnDestroy(): void {
    if (this.change) {
      this.tasksService.modifyTask(
        this.hold.value,
        this.hold.type,
        this.hold.id
      );
    }
    this.inputSubscription.unsubscribe();
  }
}
