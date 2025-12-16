import { Injectable, inject, signal, effect, DestroyRef } from '@angular/core';

import { Subscription, BehaviorSubject, timer, map } from 'rxjs';

import { pomodoro } from './pomodoro.model';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  constructor() {
    const savedVars = localStorage.getItem('pomodoroVariables');

    if (savedVars) {
      const parsedVars = JSON.parse(savedVars);
      this.startTime.set(parsedVars['work']);
      this.pauseTime.set(parsedVars['curTime']);
      this.shortBreak.set(parsedVars['short']);
      this.longBreak.set(parsedVars['long']);
      this.intervalCount.set(parsedVars['interval']);
      this.currentInterval.set(parsedVars['curInterval']);
      this.autoStartCycles.set(parsedVars['autoCycle']);
      this.timeType.set(parsedVars['timeType']);
      this.session.set(parsedVars['session']);
      this.colorClass.next(parsedVars['color']);
      this.timer.next(parsedVars['curTime']);
    }

    effect(() => {
      const toSave: pomodoro = {
        work: this.startTime(),
        curTime: this.pauseTime(),
        short: this.shortBreak(),
        long: this.longBreak(),
        interval: this.intervalCount(),
        curInterval: this.currentInterval(),
        autoCycle: this.autoStartCycles(),
        timeType: this.timeType(),
        session: this.session(),
        color: this.colorClass.value,
      };
      localStorage.setItem('pomodoroVariables', JSON.stringify(toSave));
    });

    this.destroyRef.onDestroy(() => {
      this.generateTime.unsubscribe();
      this.timer.unsubscribe();
    });
  }

  private destroyRef = inject(DestroyRef);

  private startTime = signal(25);
  private pauseTime = signal(this.toMilliseconds(this.startTime()));
  private shortBreak = signal(5);
  private longBreak = signal(30);
  private intervalCount = signal(4);
  private currentInterval = signal(0);
  private autoStartCycles = signal(false);
  private timeType = signal(true);
  private status = signal(false);
  private session = signal(false);
  private colorClass = new BehaviorSubject('init-work');

  private timer = new BehaviorSubject(this.pauseTime());
  private generateTime = new Subscription();

  setPomodoroVariables(type: string, val: string | number | boolean | null) {
    if (this.status()) {
      return;
    }
    if (typeof val === 'number') {
      switch (type) {
        case 'minutes':
          this.startTime.set(val);

          if (!this.session() && this.timeType()) {
            this.pauseTime.set(this.toMilliseconds(val));
            this.timer.next(this.pauseTime());
          }
          break;
        case 'short':
          this.shortBreak.set(val);
          if (!this.session() && !this.timeType()) {
            this.pauseTime.set(this.toMilliseconds(val));
            this.timer.next(this.pauseTime());
          }
          break;
        case 'long':
          this.longBreak.set(val);
          if (
            !this.session() &&
            !this.timeType() &&
            this.intervalCount() === this.curInterval()
          ) {
            this.pauseTime.set(this.toMilliseconds(val));
            this.timer.next(this.pauseTime());
          }
          break;
        case 'intervals':
          this.intervalCount.set(val);
      }
    } else if (typeof val === 'boolean') {
      this.autoStartCycles.set(val);
    }
  }

  startTimer() {
    if (this.status()) {
      return;
    }

    this.session.set(true);
    this.status.set(true);
    var timerDate = new Date(this.pauseTime() + Date.now()).getTime();

    this.generateTime = timer(0, 100)
      .pipe(map(() => timerDate - Date.now()))
      .subscribe((val) => {
        if (val < 0) {
          this.cycleTimer();
        }

        this.timer.next(val);
      });
  }

  pauseTimer() {
    this.generateTime.unsubscribe();

    this.pauseTime.set(this.timer.value);
    this.status.set(false);
  }

  resetTimer() {
    this.generateTime.unsubscribe();

    this.pauseTime.set(this.toMilliseconds(this.startTime()));
    this.timer.next(this.pauseTime());
    this.currentInterval.set(0);
    this.status.set(false);
    this.timeType.set(true);
    this.session.set(false);

    switch (this.colorClass.value.split('-')[1]) {
      case 'work':
        this.colorClass.next('work-reset');
        break;
      case 'reset':
        this.colorClass.next('work-reset');
        break;
      case 'short':
        this.colorClass.next('short-reset');
        break;
      case 'long':
        this.colorClass.next('long-reset');
        break;
    }
  }

  cycleTimer() {
    this.generateTime.unsubscribe();

    this.status.set(false);
    this.session.set(false);

    /* When finishing work -> increment.
       When finishing long break -> reset to 0 */
    if (this.timeType()) {
      this.currentInterval.update((val) => val + 1);
    } else if (this.currentInterval() === this.intervalCount()) {
      this.currentInterval.set(0);
      this.colorClass.next('long-work');
    }

    // Alternate WORK/BREAK
    this.timeType.update((val) => !val);

    // WORK -> BREAK(S/L)
    if (this.timeType() === false) {
      if (this.currentInterval() === this.intervalCount()) {
        this.pauseTime.set(this.toMilliseconds(this.longBreak()));
        this.timer.next(this.toMilliseconds(this.longBreak()));
        this.colorClass.next('work-long');
      } else {
        this.pauseTime.set(this.toMilliseconds(this.shortBreak()));
        this.timer.next(this.toMilliseconds(this.shortBreak()));
        this.colorClass.next('work-short');
      }
    }

    // BREAK -> WORK
    else {
      this.pauseTime.set(this.toMilliseconds(this.startTime()));
      this.timer.next(this.toMilliseconds(this.startTime()));
      if (this.colorClass.value !== 'long-work') {
        this.colorClass.next('short-work');
      }
    }

    if (this.autoStartCycles() == true) {
      setTimeout(() => this.startTimer(), 1000);
    }
  }

  resetPomodoro() {
    this.startTime.set(25);
    this.pauseTime.set(this.toMilliseconds(this.startTime()));
    this.shortBreak.set(5);
    this.longBreak.set(30);
    this.intervalCount.set(4);
    this.autoStartCycles.set(false);

    if (this.timeType()) {
      this.timer.next(this.pauseTime());
      this.colorClass.next('work');
    } else {
      this.timer.next(this.toMilliseconds(this.shortBreak()));
      this.colorClass.next('short');
    }

    if (this.currentInterval() >= this.intervalCount()) {
      this.currentInterval.set(this.intervalCount() - 1);
    }
  }

  toMilliseconds(val: number): number {
    return val * 60000;
  }

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
    return this.colorClass;
  }
}
