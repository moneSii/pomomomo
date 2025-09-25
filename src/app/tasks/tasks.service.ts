import { Injectable, signal, effect } from '@angular/core';
import { WritableSignal } from '@angular/core';

import { task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {
    this.updateIdList();
    effect(() => {
      console.log(this.todoTaskList());
    });
  }
  private todoTaskList: WritableSignal<task[]> = signal([
    {
      title: 'Not Doing Anything',
      category: 'Life',
      content: 'some extra notes!',
      status: false,
      id: 0,
      dateCreation: new Date(),
    },
    {
      title: 'Kinda doing something',
      category: 'Academics',
      content: 'some extra notes!',
      status: false,
      id: 1,
      dateCreation: new Date(),
    },
    {
      title: 'Maybe Doing Something',
      category: 'Work',
      content: 'some extra notes!',
      status: false,
      id: 2,
      dateCreation: new Date(),
    },
  ]);
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
      id:
        this.todoTaskList().length > 0
          ? this.idList.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))[0] + 1
          : 0,
      dateCreation: new Date(),
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

  private reduceTasksID() {
    for (var i = 0; i < this.todoTaskList().length; i++) {
      this.todoTaskList()[i].id = i;
    }
  }

  public cycleRight() {
    if (this.todoTaskList().length > 0) {
      this.todoTaskList().push(this.todoTaskList().shift()!);
    }
  }
  public cycleLeft() {
    if (this.todoTaskList().length > 0) {
      this.todoTaskList().unshift(this.todoTaskList().pop()!);
    }
  }

  public sortTasksList(type: string) {
    if (this.todoTaskList().length > 0) {
      const taskObject = this.todoTaskList()[0];
      const keySort = type as keyof typeof this.sort;
      const keyTask = type as keyof typeof taskObject;

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
    }
  }

  public deleteTasksList(type: string) {
    if (this.todoTaskList().length > 0) {
      if (type === 'all') {
        this.todoTaskList.set([]);
        this.idList = [];
      }

      if (type === 'completed') {
        this.todoTaskList.update((val) =>
          val.filter((task) => task.status === false)
        );
        this.reduceTasksID();
      }
    }
  }

  public deleteTask(id: number) {
    this.todoTaskList.update((val) => val.filter((task) => task.id !== id));
    this.reduceTasksID();
  }

  public completeTask(index: number) {
    this.todoTaskList().push(this.todoTaskList().splice(index, 1)[0]);
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
