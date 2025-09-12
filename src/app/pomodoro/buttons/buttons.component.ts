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
    '../../shared/animations/animations-secondary-color.css',
  ],
})
export class ButtonsComponent {
  private pomodoroService = inject(PomodoroService);
  private colorService = inject(ColorService);
  private displayService = inject(DisplayService);

  currentColor = this.colorService.colorAnimatedSecondary;

  onStart() {
    this.pomodoroService.startTimer();
  }
  onPause() {
    this.pomodoroService.pauseTimer();
  }
  onReset() {
    this.pomodoroService.resetTimer();
  }
  onSkip() {
    this.pomodoroService.cycleTimer();
  }

  onOpenForm() {
    if (!this.pomodoroService.curStatus()) {
      this.displayService.alternateDisplayForm();
    } else {
      alert('Timer is still Running!');
    }
  }
}
