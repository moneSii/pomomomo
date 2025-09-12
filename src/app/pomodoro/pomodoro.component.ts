import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormComponent } from './form/form.component';

import { ColorService } from '../color.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, ButtonsComponent, FormComponent, NgClass],
  templateUrl: './pomodoro.component.html',
  styleUrls: [
    './pomodoro.component.css',
    '../shared/styles/animations-primary-color.css',
    '../shared/styles/static-colors.css',
  ],
})
export class PomodoroComponent {
  private colorService = inject(ColorService);
  firstInit = true;

  currentColor = this.colorService.colorAnimatedPrimary;
}
