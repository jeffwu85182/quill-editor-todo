import { Injectable } from '@angular/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuillEditorService {
  quillUpdateSubject = new Subject<Delta>();
  constructor() {}

  insertHelloWorld(quill: Quill) {
    const helloWorldDelta = new Delta().insert('Hello world!');
    quill.updateContents(helloWorldDelta as any);
  }

  insertHeader(quill: Quill) {
    const headerDelta = new Delta()
      .insert('This is Header')
      .insert('\n', { header: 1 });
    quill.updateContents(headerDelta as any);
  }

  insertNormalText(quill: Quill) {
    const currentLength = quill.getLength() - 1;
    const normalText = new Delta().retain(currentLength).insert('Normal Text');
    quill.updateContents(normalText as any);
    quill.setSelection(quill.getLength(), 0, 'silent');
  }

  updateQuillChanges(quill: Quill) {
    quill.on('text-change', (delta) => this.quillUpdateSubject.next(delta));
  }
}
