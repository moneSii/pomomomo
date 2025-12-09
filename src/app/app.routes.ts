import { Routes } from '@angular/router';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

export const routes: Routes = [
  {
    path: '',
    title: 'tasks-board',
    component: PomodoroComponent,
  },
];
