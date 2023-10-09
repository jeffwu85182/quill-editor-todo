import { Injectable } from '@angular/core';
import Quill, { ClipboardMatcherCallback, ClipboardMatcherNode } from 'quill';
import Delta from 'quill-delta';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  quill!: Quill;
  constructor() {}

  customMatcherA(node: HTMLElement, delta: Delta) {
    console.log('custom matcher', delta);
    if (delta && delta.ops && delta.ops.length > 0) {
      console.log('do this');
       delta.compose(new Delta().retain(delta.length(), { bold: true }));
    }
    return delta
  }

  addMatcherWithBTagAsBold(quill: Quill) {
    const clipboard = quill.getModule('clipboard');
    clipboard.addMatcher('B', this.customMatcherA);
    console.log('addMatcher');
  }

  pasteHTML(quill: Quill) {
    const currentSelection = quill.getSelection();
    if (currentSelection?.index) {
      quill.insertText(currentSelection.index, 'hello, paste start with');
    }
    quill.setText('Hello!');
    quill.clipboard.dangerouslyPasteHTML(
      6,
      '<b>World!</b>'
    );
  }

  initialWithClipboard(container: HTMLElement) {
    console.log('initialWithClipboard');
    this.quill = new Quill(container, {
      theme: 'snow',
      modules: {
        toolbar: ['bold', 'italic', 'underline', 'strike'],
        // clipboard: {
        //   matchers: [['B', this.customMatcherA]],
        // },
      },
    });

    return this.quill;
  }
}
