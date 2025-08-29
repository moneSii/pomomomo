import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TimerService } from './timer.service';
import { MinuteTimePipe } from './minute-time.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe, AsyncPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private timerService = inject(TimerService);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;

  status = this.timerService.curStatus;
  timeType = this.timerService.timeTypeStatus;

  counter = this.timerService.stopWatch;
}
