import { Injectable } from '@angular/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import { Subject } from 'rxjs';
import { RedTextBlot } from '../custom-blot/red-text';

@Injectable({
  providedIn: 'root',
})
export class QuillEditorService {
  quillUpdateSubject$ = new Subject<Delta>();
  constructor() {}

  insertHelloWorld(quill: Quill) {
    const currentIndex = quill.getSelection()?.index;
    const currentLength = quill.getLength() - 1;
    if (typeof currentIndex === 'number') {
      const insertContent = 'Hello World!';
      const helloWorldDelta = new Delta()
        .retain(currentIndex)
        .insert(insertContent);
      quill.updateContents(helloWorldDelta);
      // quill.setSelection(currentIndex + insertContent.length, 0);
    }
  }

  insertHeader(quill: Quill) {
    const currentLength = quill.getLength();
    const currentIndex = quill.getSelection()?.index;
    if (typeof currentIndex === 'number') {
      const headerContent = 'This is Header';
      const headerDelta = new Delta()
        .retain(currentLength)
        .insert(headerContent)
        .insert('\n', { header: 1 });
      quill.updateContents(headerDelta);
      quill.setSelection(currentIndex + headerContent.length + 1, 0);
    }
  }

  insertNormalText(quill: Quill) {
    const currentLength = quill.getLength() - 1;
    const normalText = new Delta().retain(currentLength).insert('Normal Text');
    quill.updateContents(normalText);
    quill.setSelection(quill.getLength(), 0, 'silent');
  }

  updateQuillChanges(quill: Quill) {
    quill.on('text-change', (delta) => {
      console.log('quill text-change', delta);
      this.quillUpdateSubject$.next(delta);
    });
  }

  registerCustomBolt() {
    Quill.register(RedTextBlot);
  }

  insertRedText(quill: Quill) {
    quill.insertText(0, 'This is Red Text', 'red-text', true);
  }
}
