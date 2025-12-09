import { Component, inject } from '@angular/core';

import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { BackgroundComponent } from './background/background.component';

import { RouterOutlet } from '@angular/router';

import { DisplayService } from './display.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PomodoroComponent, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PomoMomo';

  private displayService = inject(DisplayService);
  showTasks = this.displayService.displayTasksComponent;
}
