import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormComponent } from './form/form.component';

import { TimerService } from './timer/timer.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, ButtonsComponent, FormComponent, NgClass],
  templateUrl: './pomodoro.component.html',
  styleUrls: [
    './pomodoro.component.css',
    '../shared/animations/animations-primary-color.css',
  ],
})
export class PomodoroComponent implements OnInit {
  private timerService = inject(TimerService);
  private destroyRef = inject(DestroyRef);

  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  timeType = this.timerService.timeTypeStatus;

  currentColor = '';

  ngOnInit() {
    const colorSubscription = this.timerService.color.subscribe((val) => {
      this.currentColor = val;
      console.log(this.currentColor);
    });
    this.destroyRef.onDestroy(() => colorSubscription.unsubscribe());
  }
}
