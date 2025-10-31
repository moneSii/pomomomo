import { Component, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { ColorService } from '../../color.service';

@Component({
  selector: 'app-focus',
  imports: [FormsModule],
  templateUrl: './focus.component.html',
  styleUrls: [
    './focus.component.css',
    '../../shared/styles/animations-secondary-color.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class FocusComponent implements OnInit {
  tasksService = inject(TasksService);
  colorService = inject(ColorService);

  currentColor = this.colorService.colorAnimatedSecondary;
  focusedTask: any;
  focusedTaskId = this.tasksService.focusedTaskId;

  ngOnInit() {
    this.focusedTaskId.subscribe((val) => {
      if (val >= 0) {
        this.focusedTask = this.tasksService.focusedTask;
      }
    });
  }

  onClick() {
    this.tasksService.toggleTaskComplete(this.focusedTask().id);
  }
}
