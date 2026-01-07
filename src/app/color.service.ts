import {
  Injectable,
  inject,
  DestroyRef,
  WritableSignal,
  signal,
  computed,
} from '@angular/core';

import { PomodoroService } from './pomodoro/pomodoro.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {
    const colorState = this.pomodoroService.color.subscribe((val) => {
      if (this.firstInit === true) {
        this.firstInit = false;
        this.currentAnimationColor.set(val.split('-')[1]);
        if (val.split('-').length <= 1) {
          this.currentStaticColor.set(val);
        } else {
          this.currentStaticColor.set(val.split('-')[1]);
        }
      } else {
        this.currentAnimationColor.set(val);
        if (val.split('-').length <= 1) {
          this.currentStaticColor.set(val);
        } else {
          this.currentStaticColor.set(val.split('-')[1]);
        }
      }
    });
    this.destroyRef.onDestroy(() => {
      colorState.unsubscribe();
    });
  }
  private pomodoroService = inject(PomodoroService);
  private destroyRef = inject(DestroyRef);
  private currentAnimationColor: WritableSignal<string> = signal('');
  private currentStaticColor: WritableSignal<string> = signal('');
  private firstInit = true;

  get colorAnimatedPrimary() {
    return computed(() => this.currentAnimationColor() + '-primary');
  }
  get colorAnimatedSecondary() {
    return computed(() => this.currentAnimationColor() + '-secondary');
  }
  get colorAnimatedTertiary() {
    return computed(() => this.currentAnimationColor() + '-tertiary');
  }
  get colorStaticPrimary() {
    return computed(() => this.currentStaticColor() + '-primary');
  }
  get colorStaticSecondary() {
    return computed(() => this.currentStaticColor() + '-secondary');
  }
  get colorStaticTertiary() {
    return computed(() => this.currentStaticColor() + '-tertiary');
  }
}
