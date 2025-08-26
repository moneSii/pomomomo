import { Component, inject, DestroyRef } from '@angular/core';

import { TimerService } from './timer.service';
import { MinuteTimePipe } from './minute-time.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe],
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
      console.log(this.counter);
      if (val <= 0) {
        this.timerService.cycleTimer();
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
    });
  }
}
