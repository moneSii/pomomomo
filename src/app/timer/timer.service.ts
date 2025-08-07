import { Injectable, signal, Pipe, PipeTransform } from '@angular/core';
import {
  Subscription,
  timer,
  map,
  takeWhile,
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { pomoVariables } from './pomo-variables/pomo-variables.module';
import { DestroyRef, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private destroyRef = inject(DestroyRef);
  constructor() {}

  setPomoVariables(pomoVars: pomoVariables) {}

  startTime = 5;
  pauseTime = 5;
  shortBreak = 3;
  longBreak = 10;
  intervalCount = 4;
  currentInterval = 1;
  timeType = true;
  status = false;
  timer = new BehaviorSubject(5);
  timerSubscription = new Subscription();

  autoStartCycles = true;

  public get stopWatch(): Observable<number> {
    return this.timer.pipe(map((val) => val));
  }

  setPomoVars(type: string, val: number) {
    if (this.status) {
      return;
    }

    switch (type) {
      case 'minutes':
        console.log('minutes');
        this.startTime = val;
        break;
      case 'shortBreak':
        console.log('shortBreak');
        this.shortBreak = val;
        break;
      case 'longBreak':
        console.log('longBreak');
        this.longBreak = val;
        break;
      case 'intervals':
        console.log('intervals');
        this.intervalCount = val;
        break;
    }
  }

  startCount(): void {
    if (this.status) {
      return;
    }

    this.timerSubscription = timer(0, 1000)
      .pipe(
        map((val) => {
          return this.pauseTime - val;
        })
      )
      .subscribe(this.timer);

    this.status = true;
  }

  stopCount(): void {
    this.pauseTime = this.timer.value;
    this.timerSubscription.unsubscribe();
    this.status = false;
  }

  resetCount(): void {
    this.timerSubscription.unsubscribe();
    this.pauseTime = this.startTime;
    this.timer.next(this.pauseTime);
    this.status = false;
  }

  cycleTimer() {
    this.timerSubscription.unsubscribe();
    this.status = false;

    this.timeType = !this.timeType; // alternate work/break

    // WORK => BREAK
    if (this.timeType === false) {
      if (this.currentInterval === this.intervalCount) {
        this.pauseTime = this.longBreak; //*60;
        this.timer.next(this.longBreak);
        this.currentInterval = 1;
        console.log('STARTING LONG BREAK');
      } else {
        this.pauseTime = this.shortBreak; //*60;
        this.timer.next(this.shortBreak);
        this.currentInterval++;
        console.log('STARTING SHORT BREAK');
      }
    }

    // BREAK => WORK
    else {
      this.pauseTime = this.startTime; //*60;
      this.timer.next(this.startTime);
      console.log('STARTING WORK');
    }

    if (this.autoStartCycles == true) {
      this.startCount();
    }

    this.destroyRef.onDestroy(() => {
      this.timerSubscription.unsubscribe();
      this.timer.unsubscribe();
    });
  }
}
