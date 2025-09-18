import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CdkDragHandle } from '@angular/cdk/drag-drop';

import { task } from '../../task.model';

@Component({
  selector: 'app-library-task',
  imports: [FormsModule, CdkDragHandle],
  templateUrl: './library-task.component.html',
  styleUrl: './library-task.component.css',
})
export class LibraryTaskComponent {
  task = input.required<task>();
}
