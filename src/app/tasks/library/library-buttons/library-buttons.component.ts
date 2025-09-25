import { Component, inject } from '@angular/core';

import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-library-buttons',
  imports: [],
  templateUrl: './library-buttons.component.html',
  styleUrl: './library-buttons.component.css',
})
export class LibraryButtonsComponent {
  private tasksService = inject(TasksService);

  onClick(type: string) {
    if (type === 'category' || type === 'status' || type === 'dateCreation') {
      this.tasksService.sortTasksList(type);
    } else if (type === 'all' || type === 'completed') {
      this.tasksService.deleteTasksList(type);
    }
  }
}
