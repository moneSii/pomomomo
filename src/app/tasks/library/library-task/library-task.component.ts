import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CdkDragHandle } from '@angular/cdk/drag-drop';

import { TasksService } from '../../tasks.service';

import { task } from '../../task.model';

@Component({
  selector: 'app-library-task',
  imports: [FormsModule, CdkDragHandle],
  templateUrl: './library-task.component.html',
  styleUrl: './library-task.component.css',
})
export class LibraryTaskComponent {
  private tasksService = inject(TasksService);
  task = input.required<task>();

  onClick() {
    this.tasksService.deleteTask(this.task().id);
  }
}
