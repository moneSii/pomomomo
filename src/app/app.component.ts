import { Component, inject } from '@angular/core';

import { BackgroundComponent } from './background/background.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TasksComponent } from './tasks/tasks.component';

import { DisplayService } from './display.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundComponent, PomodoroComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PomoMomo';

  private displayService = inject(DisplayService);
  showTasks = this.displayService.displayTasksComponent;
}
