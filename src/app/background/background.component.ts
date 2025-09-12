import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { ColorService } from '../color.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [NgClass],
  templateUrl: './background.component.html',
  styleUrls: [
    './background.component.css',
    '../shared/animations/animations-tertiary-color.css',
  ],
})
export class BackgroundComponent {
  private colorService = inject(ColorService);

  currentColor = this.colorService.colorAnimatedTertiary;
}
