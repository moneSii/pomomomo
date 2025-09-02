import { Component, inject } from '@angular/core';

import { ColorDirective } from '../../color.directive';

import { TimerService } from '../timer/timer.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [ColorDirective],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  private timerService = inject(TimerService);
  private displayService = inject(DisplayService);
  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  timeType = this.timerService.timeTypeStatus;

  onStart() {
    this.timerService.startCount();
  }
  onPause() {
    this.timerService.stopCount();
  }
  onReset() {
    this.timerService.resetCount();
  }
  onSkip() {
    this.timerService.cycleTimer();
  }
  // onToggleDisplayVars() {
  //   this.displayService.alternateDisplayVariables();
  // }
  onOpenForm() {
    if (!this.timerStatus) {
      this.displayService.alternateDisplayForm();
    } else {
      alert('Timer is still Running!');
    }
  }

  get timerStatus() {
    return this.timerService.curStatus();
  }
}
