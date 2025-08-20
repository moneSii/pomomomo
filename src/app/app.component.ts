import { Component, signal } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { FormComponent } from './form/form.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { VariablesComponent } from './timer/variables/variables.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TimerComponent,
    FormComponent,
    ButtonsComponent,
    VariablesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pomomomo';
}
