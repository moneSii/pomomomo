import { Component } from '@angular/core';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { ColorDirective } from './color.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PomodoroComponent, ColorDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PomoMomo';
}
