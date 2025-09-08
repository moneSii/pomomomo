import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { NgClass } from '@angular/common';

import { TimerService } from '../pomodoro/timer/timer.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [NgClass],
  templateUrl: './background.component.html',
  styleUrls: [
    './background.component.css',
    '../shared/animations/animations-tertiary-color.css',
  ],
})
export class BackgroundComponent implements OnInit {
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
