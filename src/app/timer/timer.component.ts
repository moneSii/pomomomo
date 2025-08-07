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
import { timer, takeWhile, map, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private subscription: Subscription = new Subscription();
  private destroyRef = inject(DestroyRef);
  counter: number = 0;

  constructor(private timerService: TimerService) {
    this.subscription.add(
      this.timerService.stopWatch.subscribe((val) => {
        this.counter = val;
        console.log(
          val,
          'Working:' + this.timerService.timeType,
          this.timerService.currentInterval +
            ':' +
            this.timerService.intervalCount
        );
        setTimeout(() => {
          if (val === 0) {
            this.onCycle();
          }
        }, 1000);
      })
    );

    const minuteSub = this.form.controls['minutes'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        if (val) {
          this.timerService.setPomoVars('minutes', +val);
        }
      });
    const shortBreakSub = this.form.controls.breaks.controls[
      'short'
    ].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        if (val) {
          this.timerService.setPomoVars('shortBreak', +val);
        }
      });
    const longBreakSub = this.form.controls.breaks.controls['long'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        if (val) {
          this.timerService.setPomoVars('longBreak', +val);
        }
      });
    const intervalSub = this.form.controls['intervals'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        if (val) {
          this.timerService.setPomoVars('intervals', +val);
        }
      });

    this.destroyRef.onDestroy(() => {
      minuteSub?.unsubscribe();
      shortBreakSub?.unsubscribe();
      longBreakSub?.unsubscribe();
      intervalSub?.unsubscribe();
    });
  }

  form = new FormGroup({
    minutes: new FormControl(5, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    breaks: new FormGroup({
      short: new FormControl<number>(3, {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
      }),
      long: new FormControl<number>(10, {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
      }),
    }),
    intervals: new FormControl<number>(4, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
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

  onCycle() {
    console.log('CYCLE TIMER');
    this.timerService.cycleTimer();
  }

  onDebugCheck() {
    console.log('DEBUG');
  }
}
