import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor() {}

  initializeWithCustomHistory(containerElement: HTMLElement): Quill {
    return new Quill(containerElement, {
      modules: {
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true,
        },
      },
      theme: 'snow',
    });
  }

  // API
  undo(quill: Quill) {
    quill.history.undo();
    console.log(quill.history.stack)
  }

  redo(quill: Quill) {
    quill.history.redo();
    console.log(quill.history.stack)
  }

  clear(quill: Quill) {
    quill.history.clear();
    console.log(quill.history.stack)
  }

  cutOffHistory(quill: Quill) {
    quill.history.cutoff();
  }
}
