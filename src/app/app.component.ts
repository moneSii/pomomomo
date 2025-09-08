import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { NgClass } from '@angular/common';

import { PomodoroComponent } from './pomodoro/pomodoro.component';

import { TimerService } from './pomodoro/timer/timer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PomodoroComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    'shared/animations/animations-tertiary-color.css',
  ],
})
export class AppComponent implements OnInit {
  title = 'PomoMomo';

  private timerService = inject(TimerService);
  private destroyRef = inject(DestroyRef);

  currentColor = '';
  ngOnInit() {
    const colorSubscription = this.timerService.color.subscribe((val) => {
      this.currentColor = val;
      console.log(this.currentColor);
    });
    this.destroyRef.onDestroy(() => colorSubscription.unsubscribe());
  }
}
