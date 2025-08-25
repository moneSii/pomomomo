import { Component, inject, DestroyRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private destroyRef = inject(DestroyRef);
  private timerService = inject(TimerService);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;

  status = this.timerService.curStatus;
  timeType = this.timerService.timeTypeStatus;

  counter: number = 0;
  constructor() {
    const subscription = this.timerService.stopWatch.subscribe((val) => {
      this.counter = val;
      setTimeout(() => {
        if (val === 0) {
          this.timerService.cycleTimer();
        }
      }, 200);
    });

    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
    });
  }
}
