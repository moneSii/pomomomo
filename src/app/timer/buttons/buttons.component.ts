import { Component, inject } from '@angular/core';
import { TimerService } from '../timer.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  private timerService = inject(TimerService);
  private displayService = inject(DisplayService);

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
}
