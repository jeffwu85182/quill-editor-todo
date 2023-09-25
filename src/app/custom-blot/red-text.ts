import Quill from 'quill';

// 自訂一個紅色的 span 元素
export class RedTextBlot extends Quill.import('blots/inline') {
  static blotName = 'red-text';
  static tagName = 'span';
  static create(value: string) {
    const node: HTMLElement = super.create() as HTMLElement;

    if (value) {
    node.style.color = 'red';
    }
    return node;
  }
}
