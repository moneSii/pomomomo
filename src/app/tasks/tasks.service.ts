import { Injectable, signal, effect, computed } from '@angular/core';
import { WritableSignal } from '@angular/core';

import { task } from './task.model';

import { data } from '../dummydata/dummy-tasks';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {
    this.todoTaskList.set(data);
    this.updateIdList();

    if (this.todoTaskList().length > 0) {
      this.focusTaskId.next(this.todoTaskList()[0].id);
    } else {
      this.focusTaskId.next(-1);
    }
  }

  private todoTaskList: WritableSignal<task[]> = signal([]);

  private idList: number[] = [];

  private focusTaskId: BehaviorSubject<number> = new BehaviorSubject(-1);

  private sort = {
    title: false,
    status: false,
    category: false,
  };

  public addTasks(taskTitle: string, taskType: string) {
    var newId: number = Math.trunc(Math.random() * 1000);

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
    this.refocusTask();
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
      const index = this.todoTaskList().findIndex(
        (i) => i.id === this.focusTaskId.value
      );
      if (index + 1 <= this.todoTaskList().length - 1) {
        this.focusTaskId.next(this.todoTaskList()[index + 1].id);
      } else {
        this.focusTaskId.next(this.todoTaskList()[0].id);
      }
    } else {
      this.focusTaskId.next(-1);
    }
  }

  public cycleLeft() {
    if (this.todoTaskList().length > 0) {
      const index = this.todoTaskList().findIndex(
        (i) => i.id === this.focusTaskId.value
      );
      if (index - 1 >= 0) {
        this.focusTaskId.next(this.todoTaskList()[index - 1].id);
      } else {
        this.focusTaskId.next(
          this.todoTaskList()[this.todoTaskList().length - 1].id
        );
      }
    } else {
      this.focusTaskId.next(-1);
    }
  }

  public changeFocus(id: number) {
    this.focusTaskId.next(id);
  }

  private refocusTask() {
    if (this.todoTaskList().length === 0) {
      this.focusTaskId.next(-1);
    } else {
      const index = this.todoTaskList().findIndex(
        (i) => i.id === this.focusTaskId.value
      );
      if (index > 0) {
        this.focusTaskId.next(this.todoTaskList()[index].id);
      } else {
        this.focusTaskId.next(this.todoTaskList()[0].id);
      }
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
    this.refocusTask();
  }

  public deleteTask(id: number) {
    this.todoTaskList.update((val) => val.filter((task) => task.id !== id));
    this.idList = this.idList.filter((val) => val !== id);
    this.refocusTask();
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

  get focusedTaskId() {
    return this.focusTaskId;
  }

  get focusedTask() {
    return computed(() => {
      if (this.focusTaskId.value < 0) {
        return false;
      } else {
        return this.todoTaskList()[
          this.todoTaskList().findIndex((i) => i.id === this.focusTaskId.value)
        ];
      }
    });
  }
}
