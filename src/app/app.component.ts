import { Component } from '@angular/core';

import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { BackgroundComponent } from './background/background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PomodoroComponent, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PomoMomo';
}
