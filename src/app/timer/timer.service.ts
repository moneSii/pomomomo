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

  public pomoVars: pomoVariables = {
    startTime: 5,
    pauseTime: 5,
    shortBreak: 3,
    longBreak: 10,
    intervalCount: 4,
    currentInterval: 1,
    timeType: true,
    status: false,
    timer: new BehaviorSubject(5),
    timerSubscription: new Subscription(),
  };

  autoStartCycles = true;

  public get stopWatch(): Observable<number> {
    return this.pomoVars.timer.pipe(map((val) => val));
  }

  setPomoVars(type: string, val: number) {
    if (this.pomoVars.status) {
      return;
    }

    switch (type) {
      case 'minutes':
        console.log('minutes');
        this.pomoVars.startTime = val;
        break;
      case 'shortBreak':
        console.log('shortBreak');
        this.pomoVars.shortBreak = val;
        break;
      case 'longBreak':
        console.log('longBreak');
        this.pomoVars.longBreak = val;
        break;
      case 'intervals':
        console.log('intervals');
        this.pomoVars.intervalCount = val;
        break;
    }

    console.log(this.pomoVars);
  }

  startCount(): void {
    if (this.pomoVars.status) {
      return;
    }

    this.pomoVars.timerSubscription = timer(0, 1000)
      .pipe(
        map((val) => {
          return this.pomoVars.pauseTime - val;
        })
      )
      .subscribe(this.pomoVars.timer);

    this.pomoVars.status = true;
  }

  stopCount(): void {
    this.pomoVars.pauseTime = this.pomoVars.timer.value;
    this.pomoVars.timerSubscription.unsubscribe();
    this.pomoVars.status = false;
  }

  resetCount(): void {
    this.pomoVars.timerSubscription.unsubscribe();
    this.pomoVars.pauseTime = this.pomoVars.startTime;
    this.pomoVars.timer.next(this.pomoVars.pauseTime);
    this.pomoVars.status = false;
  }

  cycleTimer() {
    this.pomoVars.timerSubscription.unsubscribe();
    this.pomoVars.status = false;

    this.pomoVars.timeType = !this.pomoVars.timeType; // alternate work/break

    // WORK => BREAK
    if (this.pomoVars.timeType === false) {
      if (this.pomoVars.currentInterval === this.pomoVars.intervalCount) {
        this.pomoVars.pauseTime = this.pomoVars.longBreak; //*60;
        this.pomoVars.timer.next(this.pomoVars.longBreak);
        this.pomoVars.currentInterval = 1;
        console.log('STARTING LONG BREAK');
      } else {
        this.pomoVars.pauseTime = this.pomoVars.shortBreak; //*60;
        this.pomoVars.timer.next(this.pomoVars.shortBreak);
        this.pomoVars.currentInterval++;
        console.log('STARTING SHORT BREAK');
      }
    }

    // BREAK => WORK
    else {
      this.pomoVars.pauseTime = this.pomoVars.startTime; //*60;
      this.pomoVars.timer.next(this.pomoVars.startTime);
      console.log('STARTING WORK');
    }

    if (this.autoStartCycles == true) {
      this.startCount();
    }

    this.destroyRef.onDestroy(() => {
      this.pomoVars.timerSubscription.unsubscribe();
      this.pomoVars.timer.unsubscribe();
    });
  }
}
