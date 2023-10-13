import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  SecurityContext,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
import {
  BlockquoteBlot,
  BoldBlot,
  HeaderBlot,
  ItalicBlot,
  LinkBlot,
} from './basic-formatting';
import { DomSanitizer } from '@angular/platform-browser';

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
}
