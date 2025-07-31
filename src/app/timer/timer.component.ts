import { Component, inject, OnInit, signal } from '@angular/core';
import { TimerService } from './timer.service';
import { pomoVariables } from './pomo-variables/pomo-variables.module';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit {
  private timerService = inject(TimerService);

  ngOnInit(): void {}

  form = new FormGroup({
    minutes: new FormControl(25, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    breaks: new FormGroup({
      short: new FormControl<number>(5, { nonNullable: true }),
      long: new FormControl<number>(30, { nonNullable: true }),
    }),
    intervals: new FormControl<number>(4, { nonNullable: true }),
  });

  onSubmit() {
    const pomoVars: pomoVariables = {
      pomoMinutes: this.form.controls.minutes.value,
      pomoShortBreak: this.form.controls.breaks.controls.short.value,
      pomoLongBreak: this.form.controls.breaks.controls.long.value,
      pomoIntervals: this.form.controls.intervals.value,
    };

    this.timerService.setPomoVariables(pomoVars);
  }
}
