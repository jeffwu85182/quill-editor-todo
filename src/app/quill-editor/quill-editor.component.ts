import Quill from 'quill';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css'],
})
export class QuillEditorComponent implements AfterViewInit {
  @ViewChild('quillContainer') quillContainer!: ElementRef;

  private quillEditor: any;
  content: string = ''; // 初始化編輯器內容為空字串

  ngAfterViewInit() {
    this.quillEditor = new Quill(this.quillContainer.nativeElement, {
      // this.quillEditor = new Quill("#quill", { // also works
      theme: 'snow', // 可以選擇不同的主題，例如 'bubble' 或 'core'
    });

    // 監聽編輯器內容變化事件，並將變化同步到 Angular 的資料模型
    this.quillEditor.on('text-change', () => {
      this.content = this.quillEditor.root.innerHTML;
    });
  }
}
