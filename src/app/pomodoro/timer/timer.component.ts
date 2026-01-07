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
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private colorService = inject(ColorService);
  private pomodoroService = inject(PomodoroService);

  currentColor = this.colorService.colorAnimatedSecondary;

  isRunning = this.pomodoroService.curStatus;

  maxInterval = this.pomodoroService.maxInterval;
  curInterval = this.pomodoroService.curInterval;

  time = this.pomodoroService.stopWatch;
}
