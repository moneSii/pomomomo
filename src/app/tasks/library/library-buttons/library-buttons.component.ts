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

  onClickSort(type: string) {
    this.tasksService.sortTasksList(type);
  }
  onClickDelete(type: string) {
    this.tasksService.deleteTasksList(type);
  }
}
