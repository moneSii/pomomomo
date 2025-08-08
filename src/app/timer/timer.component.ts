import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TimerService } from './timer.service';
import { pomoVariables } from './pomo-variables/pomo-variables.module';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import {
  timer,
  takeWhile,
  map,
  Subscription,
  debounceTime,
  pairwise,
  merge,
  zip,
  startWith,
} from 'rxjs';

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

    const formSubscription = this.form.valueChanges
      .pipe(
        debounceTime(1000),
        startWith({
          minutes: this.workTime(),
          short: this.breakTimeS(),
          long: this.breakTimeL(),
          intervals: this.maxInterval(),
          cycle: this.autoCycle(),
        }),
        pairwise()
      )
      .subscribe({
        next: (val) => {
          Object.keys(this.form.controls).forEach((field) => {
            if (
              val[0][field as keyof (typeof val)[0]] !==
              val[1][field as keyof (typeof val)[0]]
            ) {
              if (field !== 'cycle') {
                return this.timerService.setPomoVars(
                  field,
                  +val[1][field as keyof (typeof val)[0]]
                );
              } else {
                return this.timerService.setPomoVars(
                  field,
                  val[1][field as keyof (typeof val)[0]]
                );
              }
            }
          });
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
