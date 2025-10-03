import { Component, inject } from '@angular/core';
import { LibraryFormComponent } from './library-form/library-form.component';
import { LibraryTaskComponent } from './library-task/library-task.component';
import { MiniTimerComponent } from '../../shared/components/mini-timer/mini-timer.component';
import { LibraryButtonsComponent } from './library-buttons/library-buttons.component';

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
    LibraryFormComponent,
    LibraryTaskComponent,
    MiniTimerComponent,
    LibraryButtonsComponent,
    CdkDrag,
    CdkDropList,
    CdkScrollable,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  private tasksService = inject(TasksService);
  private displayService = inject(DisplayService);

  list = this.tasksService.taskList;

  displayForm = this.displayService.displayLibForm;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
    this.tasksService.onMoveList();
  }

  onClose() {
    this.displayService.alternateDisplayLibrary();
  }

  onClick() {
    this.displayService.alternateDisplayLibraryForm();
  }
}
