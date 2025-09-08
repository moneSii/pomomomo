import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { TimerService } from '../timer/timer.service';
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
  private timerService = inject(TimerService);
  private displayService = inject(DisplayService);
  private destroyRef = inject(DestroyRef);

  timeType = this.timerService.timeTypeStatus;
  currentColor = '';

  ngOnInit() {
    const colorSubscription = this.timerService.color.subscribe((val) => {
      this.currentColor = val;
      console.log(this.currentColor);
    });
    this.destroyRef.onDestroy(() => colorSubscription.unsubscribe());
  }

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

  onOpenForm() {
    if (!this.timerStatus) {
      this.displayService.alternateDisplayForm();
    } else {
      alert('Timer is still Running!');
    }
  }

  get timerStatus() {
    return this.timerService.curStatus();
  }
}
