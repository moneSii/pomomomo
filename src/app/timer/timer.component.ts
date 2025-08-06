import { Component, inject, OnInit, signal } from '@angular/core';
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
import { timer, takeWhile, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private subscription: Subscription = new Subscription();
  counter: number = 0;

  constructor(private timerService: TimerService) {
    this.subscription.add(
      this.timerService.stopWatch.subscribe((val) => {
        this.counter = val;
        console.log(
          val,
          'Working:' + this.timerService.pomoVars.timeType,
          this.timerService.pomoVars.currentInterval +
            ':' +
            this.timerService.pomoVars.intervalCount
        );
        setTimeout(() => {
          if (val === 0) {
            this.onCycle();
          }
        }, 1000);
      })
    );
  }

  form = new FormGroup({
    minutes: new FormControl(25, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    breaks: new FormGroup({
      short: new FormControl<number>(5, { nonNullable: true }),
      long: new FormControl<number>(30, { nonNullable: true }),
    }),
    intervals: new FormControl<number>(4, { nonNullable: true }),
  });

  onSubmit() {}

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
    console.log(this.timerService.pomoVars);
  }
}
