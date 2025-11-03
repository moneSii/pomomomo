import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private displayForm = signal(false);
  private displayLibrary = signal(false);
  private displayTasks = signal(false);

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
