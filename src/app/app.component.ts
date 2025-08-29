import { Component } from '@angular/core';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PomodoroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pomomomo';
}
