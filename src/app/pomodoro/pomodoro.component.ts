import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { NgClass } from '@angular/common';

import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormComponent } from './form/form.component';

import { PomodoroService } from './pomodoro.service';

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
  private pomodoroService = inject(PomodoroService);
  private destroyRef = inject(DestroyRef);

  maxInterval = this.pomodoroService.maxInterval;
  curInterval = this.pomodoroService.curInterval;
  timeType = this.pomodoroService.timeTypeStatus;

  currentColor = '';

  ngOnInit() {
    const colorSubscription = this.pomodoroService.color.subscribe((val) => {
      this.currentColor = val;
      console.log(this.currentColor);
    });
    this.destroyRef.onDestroy(() => colorSubscription.unsubscribe());
  }
}
