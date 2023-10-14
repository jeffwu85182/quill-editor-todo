import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

export class DividerBlot extends BlockEmbed {
  static blotName = 'myDivider';
  static tagName = 'hr';
}

export class ImageBlot extends BlockEmbed {
  static blotName = 'myImage';
  static tagName = 'img';
  static create(value: { alt: string; url: string }) {
    const node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node: HTMLImageElement) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
    };
  }
}
