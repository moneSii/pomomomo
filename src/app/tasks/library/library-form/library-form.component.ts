import { Component, inject } from '@angular/core';

import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-library-form',
  imports: [],
  templateUrl: './library-form.component.html',
  styleUrl: './library-form.component.css',
})
export class LibraryFormComponent {
  tasksService = inject(TasksService);
}
