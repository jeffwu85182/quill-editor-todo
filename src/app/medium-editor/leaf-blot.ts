declare var twttr: any;
import Quill from 'quill';
const BlockEmbed = Quill.import('blots/block/embed');

interface Format {
  height?: string;
  width?: string;
}

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

export class VideoBlot extends BlockEmbed {
  static blotName = 'myVideo';
  static tagName = 'iframe';
  static create(value: { url: string }) {
    const node = super.create();
    node.setAttribute('src', value.url);
    // Set non-format related attributes with static values
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', 'true');

    return node;
  }

  static formats(node: HTMLIFrameElement): Format {
    let format: Format = {};
    if (node.hasAttribute('height')) {
      format['height'] = node.getAttribute('height')!;
    }
    if (node.hasAttribute('width')) {
      format['width'] = node.getAttribute('width')!;
    }
    return format;
  }

  static value(node: HTMLImageElement) {
    return node.getAttribute('src');
  }

  format(name: string, value: number | string) {
    // Handle unregistered embed formats
    if (name === 'height' || name === 'width') {
      if (value) {
        this['domNode'].setAttribute(name, value);
      } else {
        this['domNode'].removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}

export class TweetBlot extends BlockEmbed {
  static blotName = 'myTweet';
  static tagName = 'div';
  static className = 'tweet';

  static create(id: string) {
    const node = super.create();
    node.dataset.id = id;
    // Allow twitter library to modify our content
    twttr.widgets.createTweet(id, node);
    return node;
  }

  static value(domNode: HTMLElement) {
    return domNode.dataset['id'];
  }
}
