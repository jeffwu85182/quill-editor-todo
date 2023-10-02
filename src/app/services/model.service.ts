import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor() {}

  find(quill: Quill, container: HTMLElement) {
    // 帶入 container 尋找並取得 quill instance
    const target = Quill.find(container);
    console.log('target is quill instance', target === quill);

    // 編輯器輸入連結文字並嘗試取得 link node
    quill.insertText(0, 'Hello, World!', 'link', 'https://google.com');
    const linkNode = container.querySelector('a');
    const findLinkNode = Quill.find(linkNode!);
    console.log('linkNode', findLinkNode);
  }

  getIndex(quill: Quill) {
    // 預先輸入文字並取得第 10 個字元的 blot
    quill.insertText(0, 'Hello, World!');
    const [line, offset] = quill.getLine(10);
    console.log('line', line);

    // 帶入 blot 取得 index
    const index = quill.getIndex(line); // index + offset should == 10
    console.log('index', index);
    console.log('offset', offset);
  }

  getLeaf(quill: Quill) {
    quill.setText('Hello Good World!');
    quill.formatText(6, 4, 'bold', true);

    const [leaf, offset] = quill.getLeaf(7);
    // leaf 會是帶有值為 "Good" 的葉節點
    // offset 應為 1，因為回傳的葉節點在索引 6 開始
    console.log('leaf', leaf);
    console.log('offset', offset);
  }

  getLine(quill: Quill) {
    quill.setText('Hello\nWorld!');
    const [line, offset] = quill.getLine(7);
    // line 應為代表第二個 "World!" 行的 Block Blot
    console.log('line', line);
    // offset 為 1，因為 index 7 是在第二行 "World!" 的第二個字元
    console.log('offset', offset);
  }

  getLines(quill: Quill) {
    quill.setText('Hello\nGood\nWorld!');
    quill.formatLine(1, 1, 'list', 'bullet');

    const lines = quill.getLines(2, 5);
    // 帶有 ListItem 與 Block Blot 的陣列
    // 代表是前面的兩行
    console.log('lines', lines);

    // 帶入 range 物件
    const linesByRange = quill.getLines({ index: 8, length: 5 });
    console.log('linesByRange', linesByRange);
  }
}
