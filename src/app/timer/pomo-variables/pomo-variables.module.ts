import { BehaviorSubject, Subscription } from "rxjs";

export interface pomoVariables {
  startTime: number;
  pauseTime: number;
  shortBreak: number;
  longBreak: number;
  intervalCount: number;
  currentInterval: number;
  timeType: boolean; // TRUE = WORKTIME | FALSE = BREAKTIME
  status: boolean;
  timer: BehaviorSubject<number>;
  timerSubscription: Subscription;
  
}