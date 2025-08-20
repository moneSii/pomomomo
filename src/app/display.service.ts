import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private displayVars = signal(false);
  private displayForm = signal(false);

  get displayVariables() {
    return this.displayVars.asReadonly();
  }

  get displayFormInputs() {
    return this.displayForm.asReadonly();
  }

  alternateDisplayVariables() {
    this.displayVars.update((val) => !val);
  }

  alternateDisplayForm() {
    this.displayForm.update((val) => !val);
  }
}
