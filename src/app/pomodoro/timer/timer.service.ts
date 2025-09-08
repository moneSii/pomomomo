import {
  Injectable,
  inject,
  signal,
  DestroyRef,
  OnDestroy,
} from '@angular/core';

import { Subscription, BehaviorSubject, timer, map } from 'rxjs';

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

  private classStatus = new BehaviorSubject('init');

  private startTime = signal(25);
  private pauseTime = this.toMilliseconds(this.startTime());

  private shortBreak = signal(5);
  private longBreak = signal(30);

  private intervalCount = signal(4);
  private currentInterval = signal(0);

  private autoStartCycles = signal(false);

  private timeType = signal(true); // work=true : break=false
  private status = signal(false); // running
  private session = signal(false); // if currently in a session

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

  get stopWatch() {
    return this.timer;
  }

  get color() {
    return this.classStatus;
  }

  setPomoVars(type: string, val: string | boolean | null) {
    if (this.status()) {
      return;
    }
    if (typeof val === 'string') {
      const numVal = +val;
      switch (type) {
        case 'minutes':
          this.startTime.set(numVal);

          if (!this.session()) {
            this.pauseTime = this.toMilliseconds(numVal);
            this.timer.next(this.pauseTime);
          }
          break;
        case 'short':
          this.shortBreak.set(numVal);
          break;
        case 'long':
          this.longBreak.set(numVal);
          break;
        case 'intervals':
          this.intervalCount.set(+val);
          break;
      }
    } else if (typeof val === 'boolean') {
      this.autoStartCycles.set(val);
    }
  }

  startCount() {
    if (this.status()) {
      return;
    }

    this.session.set(true);
    this.status.set(true);
    var timerDate = new Date(this.pauseTime + Date.now());

    this.timerSubscription = timer(0, 100)
      .pipe(
        map(() => {
          return timerDate.getTime() - Date.now();
        })
      )
      .subscribe(this.timer);
  }

  stopCount() {
    this.pauseTime = this.timer.value;
    this.timerSubscription.unsubscribe();
    this.status.set(false);
  }

  resetCount() {
    this.timerSubscription.unsubscribe();
    this.pauseTime = this.toMilliseconds(this.startTime());
    this.timer.next(this.pauseTime);
    this.currentInterval.set(0);
    this.status.set(false);
    this.timeType.set(true);
    this.session.set(false);

    if (this.classStatus.value.split('-').length > 1) {
      if (this.classStatus.value.split('-')[1] === 'work') {
        this.classStatus.next('work-reset');
      } else if (this.classStatus.value.split('-')[1] === 'short') {
        this.classStatus.next('short-reset');
      } else if (this.classStatus.value.split('-')[1] === 'long') {
        this.classStatus.next('long-reset');
      } else if (this.classStatus.value.split('-')[1] === 'reset') {
        this.classStatus.next('work-reset');
      }
    } else {
      this.classStatus.next('work-reset');
    }
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
      this.session.set(false);
      this.classStatus.next('long-work');
    }

    this.timeType.update((val) => !val); // alternate WORK/BREAK

    // WORK => BREAK
    if (this.timeType() === false) {
      if (this.currentInterval() === this.intervalCount()) {
        this.pauseTime = this.toMilliseconds(this.longBreak());
        this.timer.next(this.toMilliseconds(this.longBreak()));
        this.classStatus.next('work-long');
      } else {
        this.pauseTime = this.toMilliseconds(this.shortBreak());
        this.timer.next(this.toMilliseconds(this.shortBreak()));
        this.classStatus.next('work-short');
      }
    }

    // BREAK => WORK
    else {
      this.pauseTime = this.toMilliseconds(this.startTime());
      this.timer.next(this.toMilliseconds(this.startTime()));
      if (this.classStatus.value !== 'long-work') {
        this.classStatus.next('short-work');
      }
    }

    if (this.autoStartCycles() == true) {
      this.startCount();
    }
  }

  toMilliseconds(val: number): number {
    return val * 60000;
  }
}
