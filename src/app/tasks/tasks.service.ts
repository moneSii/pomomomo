import { Injectable, signal } from '@angular/core';
import { WritableSignal } from '@angular/core';

import { task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private todoTaskList: WritableSignal<task[]> = signal([
    {
      title: 'Wash Dishes',
      content: 'Make sure to scrub them clean!',
      type: 'Life',
      status: false,
      id: '1',
    },
    {
      title: 'Complete French Homework',
      content: 'Practice',
      type: 'Academics',
      status: false,
      id: '2',
    },
    {
      title: 'Create a Scheduler',
      content: 'For both daily and weekly timeframes',
      type: 'Life',
      status: false,
      id: '3',
    },
    {
      title: 'Clean up',
      content: 'Dust -> Wipe -> Dry',
      type: 'Life',
      status: false,
      id: '4',
    },
    {
      title: 'Nothing',
      content: '',
      type: 'Misc',
      status: false,
      id: '5',
    },
  ]);

  public cycleRight() {
    this.todoTaskList().push(this.todoTaskList().shift()!);
  }
  public cycleLeft() {
    this.todoTaskList().unshift(this.todoTaskList().pop()!);
  }

  get taskList() {
    return this.todoTaskList.asReadonly();
  }
}
