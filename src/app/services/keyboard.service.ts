import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  constructor() {}

  addBinding(quill: Quill) {
    console.log('addBinding');
    quill.keyboard.addBinding(
      {
        key: 'B', // 只按下 B 鍵即可觸發
      },
      (range, context) => {
        const isBold = context.format.bold || false;
        quill.formatText(range, 'bold', !isBold);
      }
    );
  }

  addBindingWithMoreContext(quill: Quill) {
    console.log('addBindingWithMoreContext');
    quill.keyboard.addBinding(
      { key: 'd', shortKey: true },
      {
        collapsed: false,
        format: ['blockquote', 'list'],
        offset: 0,
      },
      function (range, context) {
        console.log('backspace pressed');
        if (context.format.list) {
          quill.format('list', false);
        } else {
          quill.format('blockquote', false);
        }
      }
    );
  }

  addBindingWithEmpty(quill: Quill) {
    console.log('addKeyboardBindingWithEmpty');
    quill.keyboard.addBinding(
      { key: 'enter' },
      { empty: true }, // 只在空行觸發
      (range, context) => {
        // 插入特殊符號的代碼
        quill.insertText(range.index, '★');
      }
    );
  }
}
