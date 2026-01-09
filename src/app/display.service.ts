import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private displayControls = signal(false);
  get displayTimerControls() {
    return this.displayControls.asReadonly();
  }
  alternateDisplayControls() {
    this.displayControls.update((val) => !val);
  }

  private displayForm = signal(false);
  get displayFormInputs() {
    return this.displayForm.asReadonly();
  }
  alternateDisplayForm() {
    this.displayForm.update((val) => !val);
  }

  private displayLibrary = signal(false);
  get displayLib() {
    return this.displayLibrary.asReadonly();
  }
  alternateDisplayLibrary() {
    this.displayLibrary.update((val) => !val);
  }

  private displayTasks = signal(true);
  get displayTasksComponent() {
    return this.displayTasks.asReadonly();
  }
  alternateDisplayTasks() {
    this.displayTasks.update((val) => !val);
  }
}
