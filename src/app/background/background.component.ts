import { Component, inject } from '@angular/core';

import { ColorService } from '../color.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrls: [
    './background.component.css',
    '../shared/styles/animations-primary-color.css',
    '../shared/styles/static-colors.css',
  ],
})
export class BackgroundComponent {
  private colorService = inject(ColorService);

  currentColor = this.colorService.colorAnimatedPrimary;
}
