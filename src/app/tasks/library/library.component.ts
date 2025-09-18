import { Component, inject } from '@angular/core';
import { FormComponent } from './form/form.component';
import { LibraryTaskComponent } from './library-task/library-task.component';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';

import { TasksService } from '../tasks.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-library',
  imports: [
    FormComponent,
    LibraryTaskComponent,
    CdkDrag,
    CdkDropList,
    CdkScrollable,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  private taskService = inject(TasksService);
  private displayService = inject(DisplayService);

  list = this.taskService.taskList;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
  }

  onClose() {
    this.displayService.alternateDisplayLibrary();
  }
}
