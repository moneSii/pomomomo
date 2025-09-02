import { Component, inject, OnInit } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormComponent } from './form/form.component';

import { ColorDirective } from '../color.directive';

import { TimerService } from './timer/timer.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, ButtonsComponent, FormComponent, ColorDirective],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
})
export class PomodoroComponent implements OnInit {
  private timerService = inject(TimerService);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  timeType = this.timerService.timeTypeStatus;

  ngOnInit() {}
}
