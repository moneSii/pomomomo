import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { debounceTime, merge, map } from 'rxjs';

import { PomodoroService } from '../pomodoro.service';
import { DisplayService } from '../../display.service';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { LessThanDirective } from './less-than.directive';

import { ColorService } from '../../color.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NumbersOnlyDirective, LessThanDirective],
  templateUrl: './form.component.html',
  styleUrls: [
    './form.component.css',
    '../../shared/styles/static-colors.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class FormComponent implements OnInit {
  private pomodoroService = inject(PomodoroService);
  private colorService = inject(ColorService);
  private displayService = inject(DisplayService);
  private destroyRef = inject(DestroyRef);

  curInterval = this.pomodoroService.curInterval;

  display = this.displayService.displayFormInputs;
  currentColor = this.colorService.colorStaticPrimary;

  ngOnInit() {
    const formSubscription = merge(
      this.form.controls.minutes.valueChanges.pipe(
        map((val) => ({ source: 'minutes', val }))
      ),
      this.form.controls.short.valueChanges.pipe(
        map((val) => ({ source: 'short', val }))
      ),
      this.form.controls.long.valueChanges.pipe(
        map((val) => ({ source: 'long', val }))
      ),
      this.form.controls.intervals.valueChanges.pipe(
        map((val) => ({ source: 'intervals', val }))
      ),
      this.form.controls.cycle.valueChanges.pipe(
        map((val) => ({ source: 'cycle', val }))
      )
    )
      .pipe(debounceTime(250))
      .subscribe({
        next: (valSource) => {
          if (
            this.form.controls[
              valSource.source as keyof typeof this.form.controls
            ].status != 'INVALID' ||
            !this.pomodoroService.curStatus() ||
            !(valSource.val === null)
          ) {
            return this.pomodoroService.setPomodoroVariables(
              valSource.source,
              valSource.val
            );
          }
        },
      });
    this.destroyRef.onDestroy(() => {
      formSubscription.unsubscribe();
    });
  }

  form = new FormGroup({
    minutes: new FormControl(this.pomodoroService.workTime(), {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    short: new FormControl(this.pomodoroService.breakTimeS(), {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    long: new FormControl(this.pomodoroService.breakTimeL(), {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    intervals: new FormControl(this.pomodoroService.maxInterval(), {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    cycle: new FormControl<boolean>(this.pomodoroService.autoCycle(), {
      validators: [Validators.required],
    }),
  });

  closeForm() {
    this.displayService.alternateDisplayForm();
  }
  onReset() {
    this.pomodoroService.resetPomodoro();
    this.form.patchValue(
      {
        minutes: this.pomodoroService.workTime(),
        short: this.pomodoroService.breakTimeS(),
        long: this.pomodoroService.breakTimeL(),
        intervals: this.pomodoroService.maxInterval(),
        cycle: this.pomodoroService.autoCycle(),
      },
      { emitEvent: false }
    );
  }

  onToggleTasks() {
    this.displayService.alternateDisplayTasks();
  }
}
