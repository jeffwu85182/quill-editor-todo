import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Quill from 'quill';
import {
  BlockquoteBlot,
  BoldBlot,
  HeaderBlot,
  ItalicBlot,
  LinkBlot,
} from './basic-formatting';
import { DividerBlot, ImageBlot } from './leaf-blot';

@Component({
  selector: 'app-medium-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medium-editor.component.html',
  styleUrls: ['./medium-editor.component.scss'],
})
export class MediumEditorComponent implements AfterViewInit {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  quillInstance!: Quill;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.registerBasicFormatting();
    this.quillInstance = new Quill(this.editorContainer.nativeElement);
  }

  insertText() {
    this.quillInstance.insertText(0, 'Test', { myBold: true });
  }

  formatText() {
    this.quillInstance.formatText(0, 4, 'myItalic', true);
  }

  registerBasicFormatting() {
    Quill.register(BoldBlot);
    Quill.register(ItalicBlot);
    Quill.register(LinkBlot);
    Quill.register(BlockquoteBlot);
    Quill.register(HeaderBlot);
    // Leaf blot
    Quill.register(DividerBlot);
    Quill.register(ImageBlot);
  }

  formatBold() {
    this.quillInstance.format('bold', true);
  }

  formatItalic() {
    this.quillInstance.format('myItalic', true);
  }

  addLink() {
    const url = prompt('請輸入 URL');
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    this.quillInstance.format('myLink', safeUrl);
  }

  addBlockquote() {
    this.quillInstance.format('myBlockquote', true);
  }

  addHeader1() {
    this.quillInstance.format('myHeader', 1);
  }

  addHeader2() {
    this.quillInstance.format('myHeader', 2);
  }

  addDivider() {
    const range = this.quillInstance.getSelection(true);
    this.quillInstance.insertText(range.index, '\n', Quill.sources.USER);
    this.quillInstance.insertEmbed(
      range.index + 1,
      'myDivider',
      true,
      Quill.sources.USER
    );
    this.quillInstance.setSelection(
      { index: range.index + 2, length: 0 },
      Quill.sources.SILENT
    );
  }

  addImage() {
    const range = this.quillInstance.getSelection(true);
    this.quillInstance.insertText(range.index, '\n', Quill.sources.USER);
    this.quillInstance.insertEmbed(
      range.index + 1,
      'myImage',
      {
        alt: 'Quill Cloud',
        url: 'https://quilljs.com/0.20/assets/images/cloud.png',
      },
      Quill.sources.USER
    );
    this.quillInstance.setSelection(
      { index: range.index + 2, length: range.length },
      Quill.sources.SILENT
    );
  }
}
