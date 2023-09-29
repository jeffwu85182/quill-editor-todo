import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  constructor() {}

  getBounds(quill: Quill, index: number) {
    const bounds = quill.getBounds(index);
    console.log('bounds', bounds);
    return bounds;
  }

  getSelection(quill: Quill) {
    const range = quill.getSelection();
    console.log('range', range);
  }

  setSelection(quill: Quill) {
    const range = quill.setSelection(0, 10);
    console.log('range', range);
  }
}
