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
      console.log(this.todoTaskList(), this.idList);
    });
  }

  private todoTaskList: WritableSignal<task[]> = signal([
    {
      id: 0,
      completed: false,
      title: 'Not Doing Anything',
      category: 'Life',
      dateCreation: new Date(),
    },
    {
      id: 1,
      completed: false,
      title: 'Kinda doing something',
      category: 'Academics',
      dateCreation: new Date(),
    },
    {
      id: 2,
      completed: false,
      title: 'Maybe Doing Something',
      category: 'Work',
      dateCreation: new Date(),
    },
  ]);

  private idList: number[] = [];

  private sort = {
    title: false,
    status: false,
    category: false,
  };

  public addTasks(taskTitle: string, taskType: string) {
    var newId: number = 0;

    while (this.idList.includes(newId)) {
      newId = Math.trunc(Math.random() * 1000);
    }

    this.todoTaskList.update((list) => {
      list.push({
        id: newId,
        title: taskTitle,
        category: taskType,
        completed: false,
        dateCreation: new Date(),
      });
      return list;
    });

    this.updateIdList();
  }

  public modifyTask(newVal: string, contentType: string, taskId: number) {
    this.todoTaskList.update((list) => {
      const targetIndex = list.findIndex((i) => i.id == taskId);

      switch (contentType) {
        case 'title':
          list[targetIndex].title = newVal;
          break;
        case 'category':
          list[targetIndex].category = newVal;
          break;
      }

      return list;
    });
  }

  private updateIdList() {
    for (var i = 0; i < this.todoTaskList().length; i++) {
      if (!this.idList.includes(this.todoTaskList()[i].id)) {
        this.idList.push(this.todoTaskList()[i].id);
      }
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
          val.filter((task) => task.completed === false)
        );
        this.idList = [];
        this.updateIdList();
      }
    }
  }

  public deleteTask(id: number) {
    this.todoTaskList.update((val) => val.filter((task) => task.id !== id));
    this.idList = this.idList.filter((val) => val !== id);
  }

  public toggleTaskComplete(id: number) {
    this.todoTaskList.update((task) => {
      const target = task.findIndex((val) => val.id === id);
      task[target].completed = !task[target].completed;
      return task;
    });
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
