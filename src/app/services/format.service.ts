import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  format(quill: Quill) {
    quill.format('bold', true);
  }

  formatLine(quill: Quill) {
    const delta = quill.formatLine(1, 1);
    console.log(delta);
  }

  formatLineWithSingleFormat(quill: Quill) {
    const delta = quill.formatLine(0, 5, 'align', 'right');
    console.log(delta);
  }

  formatLineWithMultipleFormats(quill: Quill) {
    const delta = quill.formatLine(0, 5, {
      list: 'bullet',
      align: 'right',
    });

    console.log(delta);
  }

  formatText(quill: Quill) {
    const delta = quill.formatText(0, 5, 'bold', true);

    // 將選取範圍的文字解除粗體，並設為藍色
    // const delta = quill.formatText(0, 5, {
    //   bold: false,
    //   color: 'rgb(0, 0, 255)',
    // });

    // 將選取的文字的那一行置右
    // const delta = quill.formatText(5, 1, 'align', 'right'); // 將 Hello 的那一行置右

    console.log(delta);
  }

  // 獲取指定範圍的格式
  getFormat(quill: Quill) {
    const formats = quill.getFormat(0, 5);
    console.log(formats);
  }

  // 解除指定範圍的格式
  removeFormat(quill: Quill) {
    const delta = quill.removeFormat(0, 5);
    console.log(delta);
  }
}
