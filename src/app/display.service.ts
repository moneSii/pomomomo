import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private displayForm = signal(false);

  get displayFormInputs() {
    return this.displayForm.asReadonly();
  }

  alternateDisplayForm() {
    this.displayForm.update((val) => !val);
  }
}
