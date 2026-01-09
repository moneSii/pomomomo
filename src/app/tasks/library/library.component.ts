import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';

import { LibraryTaskComponent } from './library-task/library-task.component';
import { LibraryButtonsComponent } from './library-buttons/library-buttons.component';
import { MiniTimerComponent } from '../../shared/components/mini-timer/mini-timer.component';

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
    '../../shared/styles/animations-form.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class LibraryComponent implements OnInit, OnDestroy {
  private tasksService = inject(TasksService);
  private displayService = inject(DisplayService);
  private colorService = inject(ColorService);

  list = this.tasksService.taskList;
  focusedTaskId = this.tasksService.focusedTaskId;
  focusedTask: any;
  colorPrimary = this.colorService.colorStaticPrimary;
  colorSecondary = this.colorService.colorStaticSecondary;

  ngOnInit() {
    this.focusedTaskId.subscribe(() => {
      this.focusedTask = this.focusedTaskId.value;
    });
  }

  ngOnDestroy() {
    this.tasksService.saveTasks();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
    this.tasksService.onMoveList();
  }

  onClose() {
    this.displayService.alternateDisplayLibrary();
  }

  onClick() {
    this.tasksService.addTasks('New Task', 'Category');
  }

  focusTask(id: number) {
    this.tasksService.changeFocus(id);
  }
}
