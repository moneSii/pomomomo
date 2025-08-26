import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { TimerService } from '../timer.service';
import { DisplayService } from '../../display.service';
import { MinuteTimePipe } from '../minute-time.pipe';

@Component({
  selector: 'app-variables',
  standalone: true,
  imports: [MinuteTimePipe, FormsModule],
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
    if (!this.timerService.curStatus()) {
      this.displayService.alternateDisplayForm();
    } else {
      alert('Timer is still running! Stop it first!');
    }
  }
}
