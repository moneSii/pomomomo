import { Component, inject, DestroyRef } from '@angular/core';

import { debounce, timer } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { PomodoroService } from '../pomodoro.service';
import { ColorService } from '../../color.service';
import { DisplayService } from '../../display.service';
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
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
  private destroyRef = inject(DestroyRef);

  showButton = false;
  currentColor = this.colorService.colorAnimatedSecondary;
  status = this.pomodoroService.curStatus;

  constructor() {
    const controlSubscription = toObservable(
      this.displayService.displayTimerControls
    )
      .pipe(debounce((val) => (val ? timer(150) : timer(1000))))
      .subscribe((val) => (this.showButton = val));

    this.destroyRef.onDestroy(() => controlSubscription.unsubscribe());
  }

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
