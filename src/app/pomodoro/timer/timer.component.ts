import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { ColorService } from '../../color.service';
import { PomodoroService } from '../pomodoro.service';

import { MinuteTimePipe } from '../../shared/pipes/minute-time.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe, AsyncPipe],
  templateUrl: './timer.component.html',
  styleUrls: [
    './timer.component.css',
    '../../shared/styles/animations-secondary-color.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class TimerComponent {
  private colorService = inject(ColorService);
  private pomodoroService = inject(PomodoroService);

  currentColor = this.colorService.colorAnimatedSecondary;

  maxInterval = this.pomodoroService.maxInterval;
  curInterval = this.pomodoroService.curInterval;

  time = this.pomodoroService.stopWatch;
}
