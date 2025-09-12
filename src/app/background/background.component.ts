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
    '../shared/styles/animations-tertiary-color.css',
    '../shared/styles/static-colors.css',
  ],
})
export class BackgroundComponent {
  private colorService = inject(ColorService);

  currentColor = this.colorService.colorAnimatedTertiary;
}
