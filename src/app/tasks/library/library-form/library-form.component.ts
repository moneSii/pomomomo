import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { DisplayService } from '../../../display.service';

import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-library-form',
  imports: [ReactiveFormsModule],
  templateUrl: './library-form.component.html',
  styleUrl: './library-form.component.css',
})
export class LibraryFormComponent {
  private tasksService = inject(TasksService);
  private displayService = inject(DisplayService);

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    type: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.tasksService.addTasks(
        this.form.controls.title.getRawValue(),
        this.form.controls.type.getRawValue()
      );
    }
  }

  onClose() {
    this.displayService.alternateDisplayLibraryForm();
  }
}
