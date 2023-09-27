import { Injectable } from '@angular/core';
import Quill from 'quill';
import Delta from 'quill-delta';

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

  insertEmbed(quill: Quill) {
    const delta = quill.insertEmbed(
      0,
      'image',
      'https://miro.medium.com/v2/resize:fit:1200/1*iNw33pBEYZIAoE9oHdhLLw.jpeg'
    );
    console.log(delta);
  }

  insertText(quill: Quill) {
    const delta = quill.insertText(0, 'This is Insert Text');
    console.log(delta);
  }

  insertTextWithParams(quill: Quill) {
    const delta = quill.insertText(0, 'This is Insert Text', {
      bold: true,
      color: 'red',
      italic: true,
      underline: true,
    });
    console.log(delta);
  }

  setContents(quill: Quill) {
    const delta = new Delta()
      .insert('This is a title')
      .insert('\n', { header: 1 })
      .insert('This is a subtitle \n', { header: 2, color: 'red' })
      .insert('The description is Hello World', {
        bold: true,
        color: 'purple',
      });
    quill.setContents(delta);
  }

  setText(quill: Quill) {
    const delta = quill.setText('This is Set Text');
    console.log(delta);
  }

  updateContents(quill: Quill) {
    const delta = new Delta().retain(5).delete(5).insert('Hello World');
    const changedContentDelta = quill.updateContents(delta);
    console.log(changedContentDelta);
  }
}
