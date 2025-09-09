import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { PomodoroService } from '../pomodoro.service';
import { MinuteTimePipe } from '../../shared/pipes/minute-time.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe, NgClass],
  templateUrl: './timer.component.html',
  styleUrls: [
    './timer.component.css',
    '../../shared/animations/animations-secondary-color.css',
  ],
})
export class TimerComponent implements OnInit {
  private pomodoroService = inject(PomodoroService);
  private destroyRef = inject(DestroyRef);

  maxInterval = this.pomodoroService.maxInterval;
  curInterval = this.pomodoroService.curInterval;

  time = 0;

  currentColor = '';

  ngOnInit() {
    const timerSubscription = this.pomodoroService.stopWatch.subscribe(
      (val) => {
        this.time = val;
        if (val < 0) {
          this.pomodoroService.cycleTimer();
        }
      }
    );

    const colorSubscription = this.pomodoroService.color.subscribe((val) => {
      this.currentColor = val;
    });
    this.destroyRef.onDestroy(() => {
      timerSubscription.unsubscribe();
      colorSubscription.unsubscribe();
    });
  }
}
