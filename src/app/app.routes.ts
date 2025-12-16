import { Routes } from '@angular/router';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    title: 'tasks-board',
    component: PomodoroComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    outlet: 'tasks',
  },
];
