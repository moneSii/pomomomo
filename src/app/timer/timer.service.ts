import {
  Injectable,
  inject,
  signal,
  DestroyRef,
  OnDestroy,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { Subscription, BehaviorSubject, Observable, timer, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements OnDestroy {
  private destroyRef = inject(DestroyRef);
  constructor() {}

  ngOnDestroy() {
    this.destroyRef.onDestroy(() => {
      this.timerSubscription.unsubscribe();
      this.timer.unsubscribe();
    });
  }

  private startTime = signal(25);
  private pauseTime = this.startTime() * 60000;

  private shortBreak = signal(5);
  private longBreak = signal(30);

  private intervalCount = signal(4);
  private currentInterval = signal(0);

  private autoStartCycles = signal(false);

  private timeType = signal(true);
  private status = signal(false);

  private timer = new BehaviorSubject(this.pauseTime);
  private timerSubscription = new Subscription();

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

  get curStatus() {
    return this.status.asReadonly();
  }

  get timeTypeStatus() {
    return this.timeType.asReadonly();
  }

  get stopWatch(): Observable<number> {
    return this.timer.pipe(map((val) => val));
  }

  setPomoVars(type: string, val: string | boolean | null) {
    if (this.status()) {
      return;
    }

    if (typeof val === 'string') {
      const numVal = +val;
      switch (type) {
        case 'minutes':
          console.log('minutes Changed');
          this.startTime.set(numVal);
          this.pauseTime = numVal * 60000;
          this.timer.next(this.pauseTime);
          break;
        case 'short':
          console.log('shortBreak Changed');
          this.shortBreak.set(numVal);
          break;
        case 'long':
          console.log('longBreak Changed');
          this.longBreak.set(numVal);
          break;
        case 'intervals':
          console.log('intervals Changed');
          this.intervalCount.set(+val);
          break;
      }
    } else if (typeof val === 'boolean') {
      console.log('cycle Changed');
      this.autoStartCycles.set(val);
    }
  }

  startCount(): void {
    if (this.status()) {
      return;
    }
    var timerDate = new Date(this.pauseTime + Date.now());

    this.timerSubscription = timer(0, 20)
      .pipe(
        map(() => {
          return timerDate.getTime() - Date.now();
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
    this.pauseTime = this.startTime() * 60000;
    this.timer.next(this.pauseTime);
    this.currentInterval.set(1);
    this.status.set(false);
  }

  cycleTimer() {
    this.timerSubscription.unsubscribe();
    this.status.set(false);

    // When finishing work increment
    // When finishing long break reset to 0
    if (this.timeType()) {
      this.currentInterval.update((val) => val + 1);
    } else if (this.currentInterval() === this.intervalCount()) {
      this.currentInterval.set(0);
    }

    this.timeType.update((val) => !val); // alternate WORK/BREAK

    // WORK => BREAK
    if (this.timeType() === false) {
      if (this.currentInterval() === this.intervalCount()) {
        this.pauseTime = this.longBreak() * 60000;
        this.timer.next(this.longBreak() * 60000);
        console.log('STARTING LONG BREAK');
      } else {
        this.pauseTime = this.shortBreak() * 60000;
        this.timer.next(this.shortBreak() * 60000);
        console.log('STARTING SHORT BREAK');
      }
    }

    // BREAK => WORK
    else {
      this.pauseTime = this.startTime() * 60000;
      this.timer.next(this.startTime() * 60000);
      console.log('STARTING WORK');
    }

    if (this.autoStartCycles() == true) {
      this.startCount();
    }
  }

  toMilliseconds() {}
}
