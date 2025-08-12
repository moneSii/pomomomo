import { Component, DestroyRef, EventEmitter, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { debounceTime, tap, merge, map } from 'rxjs';

import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private destroyRef = inject(DestroyRef);
  private timerService = inject(TimerService);

  counter: number = 0;

  workTime = this.timerService.workTime;
  breakTimeS = this.timerService.breakTimeS;
  breakTimeL = this.timerService.breakTimeL;
  maxInterval = this.timerService.maxInterval;
  curInterval = this.timerService.curInterval;
  autoCycle = this.timerService.autoCycle;

  constructor() {
    const subscription = this.timerService.stopWatch.subscribe((val) => {
      this.counter = val * 1000;
      setTimeout(() => {
        if (val === 0) {
          this.timerService.cycleTimer();
        }
      }, 1000);
    });

    const formSubscription = merge(
      this.form.controls.minutes.valueChanges.pipe(
        map((val) => ({ source: 'minutes', val }))
      ),
      this.form.controls.short.valueChanges.pipe(
        map((val) => ({ source: 'short', val }))
      ),
      this.form.controls.long.valueChanges.pipe(
        map((val) => ({ source: 'long', val }))
      ),
      this.form.controls.intervals.valueChanges.pipe(
        map((val) => ({ source: 'intervals', val }))
      ),
      this.form.controls.cycle.valueChanges.pipe(
        map((val) => ({ source: 'cycle', val }))
      )
    )
      .pipe(
        debounceTime(500),
        tap((valSource) => {
          if (this.form.status == 'INVALID') {
            this.form.controls[
              valSource.source as keyof typeof this.form.controls
            ].reset(null, { emitEvent: false });
          }
        })
      )
      .subscribe({
        next: (valSource) => {
          if (this.form.status != 'INVALID') {
            return this.timerService.setPomoVars(
              valSource.source,
              valSource.val
            );
          }
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
      formSubscription.unsubscribe();
    });
  }

  form = new FormGroup({
    minutes: new FormControl('25', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    short: new FormControl('5', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    long: new FormControl('10', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    intervals: new FormControl('4', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    cycle: new FormControl<boolean>(true, {
      validators: [Validators.required],
    }),
  });

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
}
