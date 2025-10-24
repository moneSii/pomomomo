import { Component, inject } from '@angular/core';
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
import { ColorService } from '../../color.service';

@Component({
  selector: 'app-library',
  imports: [
    LibraryTaskComponent,
    MiniTimerComponent,
    LibraryButtonsComponent,
    CdkDrag,
    CdkDropList,
    CdkScrollable,
  ],
  templateUrl: './library.component.html',
  styleUrls: [
    './library.component.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class LibraryComponent {
  private tasksService = inject(TasksService);
  private displayService = inject(DisplayService);
  private colorService = inject(ColorService);

  list = this.tasksService.taskList;

  displayForm = this.displayService.displayLibForm;

  colorPrimary = this.colorService.colorStaticPrimary;
  colorSecondary = this.colorService.colorStaticSecondary;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
    this.tasksService.onMoveList();
  }

  onClose() {
    this.displayService.alternateDisplayLibrary();
  }

  onClick() {
    this.tasksService.addTasks('New Task', 'Life');
  }
}
