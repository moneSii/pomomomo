import { Component, inject, DestroyRef } from '@angular/core';
import { PomodoroService } from '../../../pomodoro/pomodoro.service';
import { MinuteTimePipe } from '../../pipes/minute-time.pipe';

@Component({
  selector: 'app-mini-timer',
  imports: [MinuteTimePipe],
  templateUrl: './mini-timer.component.html',
  styleUrl: './mini-timer.component.css',
})
export class MiniTimerComponent {
  private pomodoroService = inject(PomodoroService);
  private destroyRef = inject(DestroyRef);
  time = 0;

  constructor() {
    const timerSubscription = this.pomodoroService.stopWatch.subscribe(
      (val) => {
        this.time = val;
      }
    );
    this.destroyRef.onDestroy(() => {
      timerSubscription.unsubscribe();
    });
  }
}
