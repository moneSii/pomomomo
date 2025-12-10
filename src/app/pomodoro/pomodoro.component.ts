import { Component, inject } from '@angular/core';

import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormComponent } from './form/form.component';

import { ColorService } from '../color.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, ButtonsComponent, FormComponent],
  templateUrl: './pomodoro.component.html',
  styleUrls: [
    './pomodoro.component.css',
    '../shared/styles/animations-primary-color.css',
    '../shared/styles/static-colors.css',
  ],
})
export class PomodoroComponent {
  private colorService = inject(ColorService);
  private displayService = inject(DisplayService);
  firstInit = true;

  currentColor = this.colorService.colorAnimatedPrimary;

  buttonsControl(type: boolean) {
    this.displayService.alternateDisplayControls(type);
  }
}
