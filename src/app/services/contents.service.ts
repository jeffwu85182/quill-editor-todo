import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class ContentsService {
  constructor() {}

  deleteText(quill: Quill) {
    quill.deleteText(4, 6);
  }

  getContent(quill: Quill) {
    const content = quill.getContents();
    console.log(content);
  }

  getContentWithParams(quill: Quill) {
    const content = quill.getContents(27);
    // const content = quill.getContents(27, 5);
    console.log(content);
  }

  getLength(quill: Quill) {
    const length = quill.getLength();
    console.log(length);
  }

  getText(quill: Quill) {
    const text = quill.getText();
    console.log(text.toString());
  }
}
