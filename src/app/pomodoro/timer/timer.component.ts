import { Component, inject, DestroyRef, OnInit } from '@angular/core';

import { PomodoroService } from '../pomodoro.service';
import { MinuteTimePipe } from '../../shared/pipes/minute-time.pipe';
import { ColorService } from '../../color.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe],
  templateUrl: './timer.component.html',
  styleUrls: [
    './timer.component.css',
    '../../shared/styles/animations-secondary-color.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class TimerComponent implements OnInit {
  private pomodoroService = inject(PomodoroService);
  private colorService = inject(ColorService);
  private destroyRef = inject(DestroyRef);

  maxInterval = this.pomodoroService.maxInterval;
  curInterval = this.pomodoroService.curInterval;

  time = 0;

  currentColor = this.colorService.colorAnimatedSecondary;

  ngOnInit() {
    const timerSubscription = this.pomodoroService.stopWatch.subscribe(
      (val) => {
        this.time = val;
        if (val < 0) {
          this.pomodoroService.cycleTimer();
        }
      }
    );

    this.destroyRef.onDestroy(() => {
      timerSubscription.unsubscribe();
    });
  }
}
