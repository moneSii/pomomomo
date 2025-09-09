import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { PomodoroService } from '../pomodoro.service';
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
export class ButtonsComponent implements OnInit {
  private pomodoroService = inject(PomodoroService);
  private displayService = inject(DisplayService);
  private destroyRef = inject(DestroyRef);

  timeType = this.pomodoroService.timeTypeStatus;
  currentColor = '';

  ngOnInit() {
    const colorSubscription = this.pomodoroService.color.subscribe((val) => {
      this.currentColor = val;
      console.log(this.currentColor);
    });
    this.destroyRef.onDestroy(() => colorSubscription.unsubscribe());
  }

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
    if (!this.timerStatus) {
      this.displayService.alternateDisplayForm();
    } else {
      alert('Timer is still Running!');
    }
  }

  get timerStatus() {
    return this.pomodoroService.curStatus();
  }
}
