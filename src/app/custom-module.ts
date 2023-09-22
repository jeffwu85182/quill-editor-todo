import Quill from 'quill';

interface CounterOptions {
  container: HTMLElement;
  unit: string;
}

export class Counter {
  quill: Quill;
  container: HTMLElement;
  options: CounterOptions;
  constructor(quill: Quill, options: CounterOptions) {
    this.quill = quill;
    this.options = options;
    this.container = options.container;
    quill.on('text-change', this.update.bind(this));
    this.update(); // Account for initial contents
  }

  calculate() {
    let text = this.quill.getText();
    if (this.options.unit === 'word') {
      text = text.trim();
      // Splitting empty text returns a non-empty array
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    const length = this.calculate();
    let label = this.options.unit;
    if (length !== 1) {
      label += 's';
    }
    this.container.innerText = length + ' ' + label;
  }
}
