import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor() {}

  blur(quill: Quill) {
    // 點擊之後再點回編輯器，五秒後游標會自動跳出
    setTimeout(() => quill.blur(), 5000);
  }

  disable(quill: Quill) {
    quill.disable();
  }

  enable(quill: Quill) {
    quill.enable();
  }

  focus(quill: Quill) {
    quill.focus();
  }
}
