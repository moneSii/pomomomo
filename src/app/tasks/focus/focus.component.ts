import { Component, inject } from '@angular/core';

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
export class FocusComponent {
  tasksService = inject(TasksService);
  colorService = inject(ColorService);

  currentColor = this.colorService.colorAnimatedSecondary;
  focusedTask = this.tasksService.taskList;

  onClick() {
    this.tasksService.toggleTaskComplete(this.focusedTask()[0].id);
  }
}
