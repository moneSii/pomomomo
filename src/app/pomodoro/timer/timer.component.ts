import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TimerService } from './timer.service';
import { MinuteTimePipe } from './minute-time.pipe';
import { ColorDirective } from '../../color.directive';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MinuteTimePipe, AsyncPipe, ColorDirective],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private timerService = inject(TimerService);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  timeType = this.timerService.timeTypeStatus;

  status = this.timerService.curStatus;

  counter = this.timerService.stopWatch;
}
