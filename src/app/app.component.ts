import { Component } from '@angular/core';

import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TasksComponent } from './tasks/tasks.component';
import { BackgroundComponent } from './background/background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PomodoroComponent, BackgroundComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PomoMomo';
}
