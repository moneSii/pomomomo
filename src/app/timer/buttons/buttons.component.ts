import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TimerService } from '../timer.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [NgClass],
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
  onToggleDisplayVars() {
    this.displayService.alternateDisplayVariables();
  }
  onOpenForm() {
    this.displayService.alternateDisplayForm();
  }

  get timerStatus() {
    return this.timerService.curStatus();
  }
}
