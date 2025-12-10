import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private displayControls = signal(false);
  private displayForm = signal(false);
  private displayLibrary = signal(false);
  private displayTasks = signal(true);

  get displayTimerControls() {
    return this.displayControls.asReadonly();
  }

  alternateDisplayControls(type: boolean) {
    this.displayControls.update((val) => !val);
  }

  get displayFormInputs() {
    return this.displayForm.asReadonly();
  }
  alternateDisplayForm() {
    this.displayForm.update((val) => !val);
  }
  get displayLib() {
    return this.displayLibrary.asReadonly();
  }
  alternateDisplayLibrary() {
    this.displayLibrary.update((val) => !val);
  }
  get displayTasksComponent() {
    return this.displayTasks.asReadonly();
  }
  alternateDisplayTasks() {
    this.displayTasks.update((val) => !val);
  }
}
