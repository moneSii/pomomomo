import { Component, inject } from '@angular/core';

import { TasksService } from '../tasks.service';
import { ColorService } from '../../color.service';
import { DisplayService } from '../../display.service';

@Component({
  selector: 'app-options',
  imports: [],
  templateUrl: './options.component.html',
  styleUrls: [
    './options.component.css',
    '../../shared/styles/animations-secondary-color.css',
    '../../shared/styles/static-colors.css',
  ],
})
export class OptionsComponent {
  private tasksService = inject(TasksService);
  private colorService = inject(ColorService);
  private displayService = inject(DisplayService);

  currentColor = this.colorService.colorAnimatedSecondary;

  onSettings() {
    this.displayService.alternateDisplayLibrary();
    this.clearFocus();
  }

  onBack() {
    this.tasksService.cycleLeft();
    this.clearFocus();
  }

  onForth() {
    this.tasksService.cycleRight();
    this.clearFocus();
  }

  clearFocus() {
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 3000);
  }
}
