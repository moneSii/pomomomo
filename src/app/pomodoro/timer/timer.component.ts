import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';

import { TimerService } from './timer.service';
import { MinuteTimePipe } from './minute-time.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe, AsyncPipe, NgClass],
  templateUrl: './timer.component.html',
  styleUrls: [
    './timer.component.css',
    '../../shared/animations/animations-secondary-color.css',
  ],
})
export class TimerComponent implements OnInit {
  private timerService = inject(TimerService);
  private destroyRef = inject(DestroyRef);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  timeType = this.timerService.timeTypeStatus;

  status = this.timerService.curStatus;
  counter = this.timerService.stopWatch;
  currentColor = '';

  ngOnInit() {
    const subscription = this.counter.subscribe((val) => {
      if (val < 0) {
        this.timerService.cycleTimer();
      }
    });

    const colorSubscription = this.timerService.color.subscribe((val) => {
      this.currentColor = val;
      console.log(this.currentColor);
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      colorSubscription.unsubscribe();
    });
  }
}
