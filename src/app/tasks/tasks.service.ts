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
      title: 'Not Doing Anything',
      category: 'Life',
      content: 'some extra notes!',
      status: false,
      id: 0,
    },
    {
      title: 'Kinda doing something',
      category: 'Academics',
      content: 'some extra notes!',
      status: false,
      id: 1,
    },
    {
      title: 'Maybe Doring Something',
      category: 'Work',
      content: 'some extra notes!',
      status: false,
      id: 2,
    },
  ]);
  private focusTask: task = this.todoTaskList()[0];
  private idList: number[] = [];

  private sort = {
    title: false,
    status: false,
    category: false,
  };

  public addTasks(taskTitle: string, taskType: string, taskContent: string) {
    this.todoTaskList().unshift({
      title: taskTitle,
      category: taskType,
      content: taskContent,
      status: false,
      id: this.idList.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))[0] + 1,
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

  public sortTasksList(type: string) {
    const keySort = type as keyof typeof this.sort;
    const keyTask = type as keyof typeof this.focusTask;

    if (this.sort[keySort] === true) {
      this.todoTaskList().sort((a, b) =>
        a[keyTask] > b[keyTask] ? -1 : a[keyTask] < b[keyTask] ? 1 : 0
      );
      this.sort[keySort] = false;
    } else {
      this.todoTaskList().sort((a, b) =>
        a[keyTask] > b[keyTask] ? 1 : a[keyTask] < b[keyTask] ? -1 : 0
      );
      Object.keys(this.sort).forEach(
        (val) => (this.sort[val as keyof typeof this.sort] = false)
      );
      this.sort[keySort] = true;
    }
    console.log(this.sort);
  }

  public filterTasksList(type: string) {}
  public deleteTasksList(type: string) {}

  public completeTask(index: number) {
    this.todoTaskList().push(this.todoTaskList().splice(index, 1)[0]);
    console.log(this.todoTaskList());
  }

  public onMoveList() {
    Object.keys(this.sort).forEach(
      (val) => (this.sort[val as keyof typeof this.sort] = false)
    );
  }

  get taskList() {
    return this.todoTaskList.asReadonly();
  }
}
