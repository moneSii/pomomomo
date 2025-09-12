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
      this.currentAnimationColor.set(val);
      this.currentStaticColor.set(val.split('-')[1]);
      console.log(this.currentAnimationColor(), this.currentStaticColor());
    });

    this.destroyRef.onDestroy(() => {
      colorState.unsubscribe();
    });
  }

  private currentAnimationColor: WritableSignal<string> = signal('');
  private currentStaticColor: WritableSignal<string> = signal('');
  private pomodoroService = inject(PomodoroService);
  private destroyRef = inject(DestroyRef);

  get colorAnimatedPrimary() {
    return computed(() => {
      return this.currentAnimationColor() + '-primary';
    });
  }
  get colorAnimatedSecondary() {
    return computed(() => {
      return this.currentAnimationColor() + '-secondary';
    });
  }
  get colorAnimatedTertiary() {
    return computed(() => {
      return this.currentAnimationColor() + '-tertiary';
    });
  }
  get colorStaticPrimary() {
    return computed(() => {
      return this.currentStaticColor() + '-primary';
    });
  }
  get colorStaticSecondary() {
    return computed(() => {
      return this.currentStaticColor() + '-secondary';
    });
  }
  get colorStaticTertiary() {
    return computed(() => {
      return this.currentStaticColor() + '-tertiary';
    });
  }
}
