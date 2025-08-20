import { Component, inject } from '@angular/core';
import { TimerService } from '../timer/timer.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  private timerService = inject(TimerService);

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
    console.log('SKIP');
    this.timerService.cycleTimer();
  }
  onToggleDisplayVars() {
    this.timerService.alternateDisplayVariables();
    console.log(this.timerService.displayVariables());
  }
  onOpenForm() {
    this.timerService.alternateDisplayForm();
  }
}
