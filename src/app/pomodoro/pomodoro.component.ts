import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormComponent } from './form/form.component';

import { TimerService } from './timer/timer.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, ButtonsComponent, FormComponent, NgClass],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
})
export class PomodoroComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private timerService = inject(TimerService);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  timeType = this.timerService.timeTypeStatus;

  colorState: string = '';

  ngOnInit() {
    const colorSubscription = this.timerService.color.subscribe((val) => {
      switch (val) {
        case 'init':
          this.colorState = 'work';
          break;
        case 'work-short':
          this.colorState = 'work-short';
          break;
        case 'work-long':
          this.colorState = 'work-long';
          break;
        case 'short-work':
          this.colorState = 'short-work';
          break;
        case 'long-work':
          this.colorState = 'long-work';
          break;
      }
    });
    this.destroyRef.onDestroy(() => {
      colorSubscription.unsubscribe();
    });
  }
}
