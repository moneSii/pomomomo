import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { PomodoroService } from '../pomodoro.service';
import { ColorService } from '../../color.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [NgClass],
  templateUrl: './buttons.component.html',
  styleUrls: [
    './buttons.component.css',
    '../../shared/styles/animations-secondary-color.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class ButtonsComponent {
  private pomodoroService = inject(PomodoroService);
  private colorService = inject(ColorService);
  private displayService = inject(DisplayService);

  currentColor = this.colorService.colorAnimatedSecondary;
  status = this.pomodoroService.curStatus;

  onStartPause() {
    if (!this.status()) {
      this.pomodoroService.startTimer();
    } else {
      this.pomodoroService.pauseTimer();
    }
  }
  onReset() {
    this.pomodoroService.resetTimer();
  }
  onSkip() {
    this.pomodoroService.cycleTimer();
  }

  onOpenForm() {
    if (!this.status()) {
      this.displayService.alternateDisplayForm();
    } else {
      alert('Timer is still Running!');
    }
  }
}
