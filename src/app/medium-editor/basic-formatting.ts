import Quill from 'quill';

const Inline = Quill.import('blots/inline');

export class BoldBlot extends Inline {
  static blotName = 'myBold';
  static tagName = 'strong';
}

export class ItalicBlot extends Inline {
  static blotName = 'myItalic';
  static tagName = 'em';
}

export class LinkBlot extends Inline {
  static blotName = 'myLink';
  static tagName = 'a';

  static create(value: string) {
    let node = super.create();
    // Sanitize url value if desired
    node.setAttribute('href', value);
    // Okay to set other non-format related attributes
    // These are invisible to Parchment so must be static
    node.setAttribute('target', '_blank');
    return node;
  }

  static formats(node: HTMLElement) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('href');
  }
}

const Block = Quill.import('blots/block');
export class BlockquoteBlot extends Block {
  static blotName = 'myBlockquote';
  static tagName = 'blockquote';
}

export class HeaderBlot extends Block {
  static blotName = 'myHeader';
  static tagName = ['H1', 'H2'];

  static formats(node: HTMLElement) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}
