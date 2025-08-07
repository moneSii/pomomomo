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

  private startTime = signal(5);
  private pauseTime = 5;
  private shortBreak = signal(3);
  private longBreak = signal(10);
  private intervalCount = signal(4);
  private currentInterval = signal(1);
  private timeType = signal(true);
  private status = signal(false);
  private timer = new BehaviorSubject(5);
  private timerSubscription = new Subscription();

  private autoStartCycles = signal(true);
  ///
  get workTime() {
    return this.startTime.asReadonly();
  }

  get breakTimeS() {
    return this.shortBreak.asReadonly();
  }

  get breakTimeL() {
    return this.longBreak.asReadonly();
  }

  get maxInterval() {
    return this.intervalCount.asReadonly();
  }

  get curInterval() {
    return this.currentInterval.asReadonly();
  }

  get autoCycle() {
    return this.autoStartCycles.asReadonly();
  }
  ////
  get stopWatch(): Observable<number> {
    return this.timer.pipe(map((val) => val));
  }

  setPomoVars(type: string, val: number) {
    if (this.status()) {
      return;
    }

    switch (type) {
      case 'minutes':
        console.log('minutes');
        this.startTime.set(val);
        break;
      case 'shortBreak':
        console.log('shortBreak');
        this.shortBreak.set(val);
        break;
      case 'longBreak':
        console.log('longBreak');
        this.longBreak.set(val);
        break;
      case 'intervals':
        console.log('intervals');
        this.intervalCount.set(val);
        break;
    }
  }

  startCount(): void {
    if (this.status()) {
      return;
    }

    this.timerSubscription = timer(0, 1000)
      .pipe(
        map((val) => {
          return this.pauseTime - val;
        })
      )
      .subscribe(this.timer);

    this.status.set(true);
  }

  stopCount(): void {
    this.pauseTime = this.timer.value;
    this.timerSubscription.unsubscribe();
    this.status.set(false);
  }

  resetCount(): void {
    this.timerSubscription.unsubscribe();
    this.pauseTime = this.startTime();
    this.timer.next(this.pauseTime);
    this.status.set(false);
  }

  cycleTimer() {
    this.timerSubscription.unsubscribe();
    this.status.set(false);

    this.timeType.update((val) => !val); // alternate work/break

    // WORK => BREAK
    if (this.timeType() === false) {
      if (this.currentInterval() === this.intervalCount()) {
        this.pauseTime = this.longBreak(); //*60;
        this.timer.next(this.longBreak());
        this.currentInterval.set(1);
        console.log('STARTING LONG BREAK');
      } else {
        this.pauseTime = this.shortBreak(); //*60;
        this.timer.next(this.shortBreak());
        this.currentInterval.update((val) => val + 1);
        console.log('STARTING SHORT BREAK');
      }
    }

    // BREAK => WORK
    else {
      this.pauseTime = this.startTime(); //*60;
      this.timer.next(this.startTime());
      console.log('STARTING WORK');
    }

    if (this.autoStartCycles() == true) {
      this.startCount();
    }

    this.destroyRef.onDestroy(() => {
      this.timerSubscription.unsubscribe();
      this.timer.unsubscribe();
    });
  }
}
