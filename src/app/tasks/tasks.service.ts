import { Injectable, signal } from '@angular/core';
import { WritableSignal } from '@angular/core';

import { task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {
    this.updateIdList();
  }
  private todoTaskList: WritableSignal<task[]> = signal([
    {
      title: 'Title of your Task',
      type: 'Category',
      content: 'some extra notes!',
      status: false,
      id: 1,
    },
  ]);
  private idList: number[] = [];

  public addTasks(taskTitle: string, taskType: string, taskContent: string) {
    this.todoTaskList().unshift({
      title: taskTitle,
      type: taskType,
      content: taskContent,
      status: false,
      id: this.idList.sort(highestToLowest)[0] + 1,
    });

    this.updateIdList();
  }

  private updateIdList() {
    for (var i = 0; i < this.todoTaskList().length; i++) {
      if (!this.idList.includes(this.todoTaskList()[i].id)) {
        this.idList.push(this.todoTaskList()[i].id);
      }
    }
  }

  public cycleRight() {
    if (this.todoTaskList()) {
      this.todoTaskList().push(this.todoTaskList().shift()!);
    }
  }
  public cycleLeft() {
    if (this.todoTaskList()) {
      this.todoTaskList().unshift(this.todoTaskList().pop()!);
    }
  }

  public sortTasksList(type: string) {}
  public filterTasksList(type: string) {}
  public deleteTasksList(type: string) {}

  get taskList() {
    return this.todoTaskList.asReadonly();
  }
}

function highestToLowest(a: number, b: number) {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
}
