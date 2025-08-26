import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { debounceTime, tap, merge, map } from 'rxjs';

import { TimerService } from '../timer/timer.service';
import { DisplayService } from '../display.service';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { LessThanDirective } from './less-than.directive';
import { SelectDirective } from './select.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NumbersOnlyDirective,
    LessThanDirective,
    SelectDirective,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private timerService = inject(TimerService);
  private displayService = inject(DisplayService);

  display = this.displayService.displayFormInputs;

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
          console.log(valSource.val);
          if (
            this.form.controls[
              valSource.source as keyof typeof this.form.controls
            ].status != 'INVALID'
          ) {
            return this.timerService.setPomoVars(
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
    minutes: new FormControl('25', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    short: new FormControl('5', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    long: new FormControl('10', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    intervals: new FormControl('4', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    cycle: new FormControl<boolean>(true, {
      validators: [Validators.required],
    }),
  });

  closeForm() {
    this.displayService.alternateDisplayForm();
  }
}
