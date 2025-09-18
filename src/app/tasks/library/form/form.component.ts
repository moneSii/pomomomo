import { Component, inject } from '@angular/core';

import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-form-tasks',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  tasksService = inject(TasksService);
  wow = this.tasksService.taskList;
}
