import { Component, DestroyRef, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { debounceTime, pairwise, startWith, merge, map } from 'rxjs';

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

  counter: number = 0;

  workTime: any;
  breakTimeS: any;
  breakTimeL: any;
  maxInterval: any;
  curInterval: any;
  autoCycle: any;

  constructor(private timerService: TimerService) {
    this.workTime = this.timerService.workTime;
    this.breakTimeS = this.timerService.breakTimeS;
    this.breakTimeL = this.timerService.breakTimeL;
    this.maxInterval = this.timerService.maxInterval;
    this.curInterval = this.timerService.curInterval;
    this.autoCycle = this.timerService.autoCycle;

    const subscription = this.timerService.stopWatch.subscribe((val) => {
      this.counter = val;
      console.log('Ticking');
      setTimeout(() => {
        if (val === 0) {
          this.onCycle();
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
      .pipe(debounceTime(500))
      .subscribe({
        next: (valSource) => {
          if (valSource.source == 'cycle') {
            return this.timerService.setPomoVars(
              valSource.source,
              valSource.val
            );
          } else {
            return this.timerService.setPomoVars(
              valSource.source,
              +valSource.val
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
    minutes: new FormControl<number>(5, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    short: new FormControl<number>(3, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    long: new FormControl<number>(10, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    intervals: new FormControl<number>(4, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    cycle: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get minutesIsInvalid() {
    return (
      this.form.controls.minutes.touched && this.form.controls.minutes.invalid
    );
  }
  get intervalsIsInvalid() {
    return (
      this.form.controls.intervals.touched &&
      this.form.controls.intervals.invalid
    );
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

  onCycle() {
    console.log('CYCLE TIMER');
    this.timerService.cycleTimer();
  }
}
