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

  counter: number = 0;

  workTime = this.timerService.workTime;
  breakTimeS = this.timerService.breakTimeS;
  breakTimeL = this.timerService.breakTimeL;
  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  autoCycle = this.timerService.autoCycle;

  private displayVars = false;

  constructor() {
    const subscription = this.timerService.stopWatch.subscribe((val) => {
      this.counter = val * 1000;
      setTimeout(() => {
        if (val === 0) {
          this.timerService.cycleTimer();
        }
      }, 1000);
    });

    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
    });
  }

  get displayVariables() {
    return this.displayVars;
  }
}
