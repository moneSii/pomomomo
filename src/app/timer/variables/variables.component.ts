import { Component, inject } from '@angular/core';

import { DatePipe } from '@angular/common';

import { TimerService } from '../timer.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-variables',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './variables.component.html',
  styleUrl: './variables.component.css',
})
export class VariablesComponent {
  private timerService = inject(TimerService);
  private displayService = inject(DisplayService);

  workTime = this.timerService.workTime;
  breakTimeS = this.timerService.breakTimeS;
  breakTimeL = this.timerService.breakTimeL;
  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  autoCycle = this.timerService.autoCycle;

  displayVars = this.displayService.displayVariables;

  onOpenForm() {
    this.displayService.alternateDisplayForm();
  }
}
