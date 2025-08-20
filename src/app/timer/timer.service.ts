import {
  Injectable,
  inject,
  signal,
  DestroyRef,
  OnDestroy,
} from '@angular/core';

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

  private startTime = signal(1500);
  private pauseTime = 1500;

  private shortBreak = signal(300);
  private longBreak = signal(600);

  private intervalCount = signal(4);
  private currentInterval = signal(1);

  private timeType = signal(true);
  private status = signal(false);

  private timer = new BehaviorSubject(this.startTime());
  private timerSubscription = new Subscription();

  private autoStartCycles = signal(true);

  private displayVars = signal(false);

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

  get displayVariables() {
    return this.displayVars.asReadonly();
  }

  get stopWatch(): Observable<number> {
    return this.timer.pipe(map((val) => val));
  }

  setPomoVars(type: string, val: string | boolean | null) {
    if (this.status()) {
      return;
    }

    if (typeof val === 'string') {
      const numVal = +val * 60;
      switch (type) {
        case 'minutes':
          console.log('minutes Changed');
          this.startTime.set(numVal);
          this.pauseTime = numVal;
          this.timer.next(numVal);
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

  alternateDisplayVariables() {
    this.displayVars.set(!this.displayVars());
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
    this.currentInterval.set(1);
    this.status.set(false);
  }

  cycleTimer() {
    this.timerSubscription.unsubscribe();
    this.status.set(false);

    this.timeType.update((val) => !val); // alternate WORK/BREAK

    // WORK => BREAK
    if (this.timeType() === false) {
      if (this.currentInterval() === this.intervalCount()) {
        this.pauseTime = this.longBreak();
        this.timer.next(this.longBreak());
        this.currentInterval.set(1);
        console.log('STARTING LONG BREAK');
      } else {
        this.pauseTime = this.shortBreak();
        this.timer.next(this.shortBreak());
        this.currentInterval.update((val) => val + 1);
        console.log('STARTING SHORT BREAK');
      }
    }

    // BREAK => WORK
    else {
      this.pauseTime = this.startTime();
      this.timer.next(this.startTime());
      console.log('STARTING WORK');
    }

    if (this.autoStartCycles() == true) {
      this.startCount();
    }
  }
}
