import { Injectable, signal, Pipe, PipeTransform } from '@angular/core';
import { Subscription, timer, map, takeWhile, BehaviorSubject, Observable } from 'rxjs';
import { pomoVariables } from './pomo-variables/pomo-variables.module';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  /* Timer Variables */

  private pomoVariables = {
    pomoMinutes: signal(60),
    pomoShortBreak: signal(5),
    pomoLongBreak: signal(30),
    pomoIntervals: signal(4),
  }

  private currentPomoVariables = {
    ...this.pomoVariables
  }

  setPomoVariables(pomoVars: pomoVariables) {
    this.pomoVariables.pomoMinutes.set(pomoVars.pomoMinutes);
    this.pomoVariables.pomoShortBreak.set(pomoVars.pomoShortBreak);
    this.pomoVariables.pomoLongBreak.set(pomoVars.pomoLongBreak);
    this.pomoVariables.pomoIntervals.set(pomoVars.pomoIntervals);
  }

  get minutes() {
    return this.pomoVariables.pomoMinutes;
  }

  onTimerStart() {}
  onTimerReset() {}
  onTimerPause() {}


  /* Timer */

  private readonly initialTime = this.pomoVariables.pomoMinutes()*60;
  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime)
  private lastStoppedTime: number = this.initialTime
  private timerSubscription: Subscription = new Subscription();
  private isRunning: boolean = false;

  public get stopWatch$(): Observable<number> {
    return this.timer$.pipe(map((val: number) => val))
  }

  startCount(): void {
    if (this.isRunning){
      return;
    }
    
    this.timerSubscription = timer(0,1000).pipe(
      map((value: number) : number => this.lastStoppedTime-value)
    ).subscribe(this.timer$)

    this.isRunning=true;
  }

  stopCount(): void {
    this.lastStoppedTime = this.timer$.value;
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetCount(): void{
    this.timerSubscription.unsubscribe()
    this.lastStoppedTime=this.initialTime;
    this.timer$.next(this.initialTime)
    this.isRunning=false;
  }
}
