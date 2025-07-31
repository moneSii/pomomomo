import { Injectable, signal, Pipe, PipeTransform } from '@angular/core';
import { Subscription, timer, map } from 'rxjs';
import { pomoVariables } from './pomo-variables/pomo-variables.module';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  private pomoVariables = {
    pomoMinutes: signal(60),
    pomoShortBreak: signal(5),
    pomoLongBreak: signal(30),
    pomoIntervals: signal(4),
  };

  setPomoVariables(pomoVars: pomoVariables) {
    this.pomoVariables.pomoMinutes.set(pomoVars.pomoMinutes);
    this.pomoVariables.pomoShortBreak.set(pomoVars.pomoShortBreak);
    this.pomoVariables.pomoLongBreak.set(pomoVars.pomoLongBreak);
    this.pomoVariables.pomoIntervals.set(pomoVars.pomoIntervals);

    console.log(this.pomoVariables.pomoIntervals());
  }

  get minutes() {
    return this.pomoVariables.pomoMinutes;
  }

  onTimerStart() {}
  onTimerReset() {}
  onTimerPause() {}
}
