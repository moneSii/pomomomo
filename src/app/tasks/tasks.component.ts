import { Component, inject } from '@angular/core';

import { FocusComponent } from './focus/focus.component';
import { OptionsComponent } from './options/options.component';
import { LibraryComponent } from './library/library.component';

import { ColorService } from '../color.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-tasks',
  imports: [FocusComponent, LibraryComponent, OptionsComponent],
  templateUrl: './tasks.component.html',
  styleUrls: [
    './tasks.component.css',
    '../shared/styles/animations-primary-color.css',
    '../shared/styles/static-colors.css',
  ],
})
export class TasksComponent {
  private colorService = inject(ColorService);
  private displayService = inject(DisplayService);
  showTasks = true;

  currentColor = this.colorService.colorAnimatedPrimary;
  display = this.displayService.displayLib;
}
