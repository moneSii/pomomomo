import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CdkDragHandle } from '@angular/cdk/drag-drop';

import { TasksService } from '../../tasks.service';

import { EditableDirective } from './editable.directive';

import { task } from '../../task.model';
import { TextLimitDirective } from './text-limit.directive';

@Component({
  selector: 'app-library-task',
  imports: [FormsModule, CdkDragHandle, EditableDirective, TextLimitDirective],
  templateUrl: './library-task.component.html',
  styleUrl: './library-task.component.css',
})
export class LibraryTaskComponent {
  private tasksService = inject(TasksService);
  task = input.required<task>();

  onClick(type: string) {
    if (type === 'delete') {
      this.tasksService.deleteTask(this.task().id);
    } else if (type === 'completed') {
      this.tasksService.toggleTaskComplete(this.task().id);
    }
  }
}
