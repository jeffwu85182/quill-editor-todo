import Quill from 'quill';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { Counter } from '../custom-module';
import { QuillEditorService } from './quill-editor.service';

interface IImageMeta {
  type: string;
  dataUrl: string;
  blobUrl: SafeUrl;
  file: File | null;
}

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css'],
})
export class QuillEditorComponent implements AfterViewInit {
  @ViewChild('quillContainer') quillContainer!: ElementRef;
  @ViewChild('toolbar') toolbar!: ElementRef;
  @ViewChild('counter') counter!: ElementRef;
  currentState: unknown;
  private quillEditor!: Quill;
  content: string = ''; // 初始化編輯器內容為空字串
  image: IImageMeta = {
    type: '',
    dataUrl: '',
    blobUrl: '',
    file: null,
  };
  constructor(private quillEditorService: QuillEditorService) {}
  ngAfterViewInit() {
    this.initQuillEditor();
    // 監聽編輯器內容變化事件，並將變化同步到 Angular 的資料模型
    this.quillEditor.on('text-change', () => {
      this.content = this.quillEditor.root.innerHTML;
    });
    this.subscribeCurrentState();
  }

  subscribeCurrentState() {
    this.quillEditorService.quillUpdateSubject$.subscribe({
      next: (changesDelta) => {
        const contents = this.quillEditor.getContents();
        this.currentState = JSON.stringify(
          {
            contents,
            changes: changesDelta,
          },
          null,
          2
        );
      },
    });
  }

  initQuillEditor(): void {
    // const toolbarOptions = {
    //   container: [
    //     ['bold', 'italic', 'underline', 'strike'], // 預設的工具按鈕
    //     [{ header: 1 }, { header: 2 }], // 預設的工具按鈕
    //     [{ list: 'ordered' }, { list: 'bullet' }], // 預設的工具按鈕
    //     [{ script: 'sub' }, { script: 'super' }], // 預設的工具按鈕
    //     [{ indent: '-1' }, { indent: '+1' }], // 預設的工具按鈕
    //     [{ direction: 'rtl' }], // 預設的工具按鈕
    //     [{ size: ['small', false, 'large', 'huge'] }], // false 是 normal 的意思
    //     [{ header: [1, 2, 3, 4, 5, 6, false] }], // 預設的工具按鈕
    //     [{ color: [] }, { background: [] }], // 預設的工具按鈕
    //     [{ font: [] }], // 預設的工具按鈕
    //     ['image', 'customButton'], // 自定義的內建工具按鈕
    //     ['clean'], // 預設的工具按鈕
    //   ],
    //   handlers: {
    //     customButton: () => console.log('handle custom button'),
    //   },
    // };
    const icons = Quill.import('ui/icons');
    icons['customButton'] = '<i class="fa-regular fa-star"></i>';
    icons['helloWorldButton'] = '<i class="fa-solid fa-ghost"></i>';
    icons['insertHeaderButton'] = '<i class="fa fa-info-circle"></i>';
    icons['insertNormalTextButton'] =
      '<i class="fa-solid fa-wand-magic-sparkles"></i>';
    Quill.register('modules/counter', Counter);
    this.quillEditor = new Quill(this.quillContainer.nativeElement, {
      // Quill Editor 的配置
      theme: 'snow', // 可以選擇不同的主題，例如 'bubble' 或 'core'
      modules: {
        // toolbar: toolbarOptions,
        toolbar: {
          container: this.toolbar.nativeElement,
          handlers: {
            customButton: () => console.log('handle custom button'),
            helloWorldButton: () => {
              this.quillEditorService.insertHelloWorld(this.quillEditor);
            },
            insertHeaderButton: () => {
              this.quillEditorService.insertHeader(this.quillEditor);
            },
            insertNormalTextButton: () => {
              this.quillEditorService.insertNormalText(this.quillEditor);
            },
          },
        },
        counter: {
          container: this.counter.nativeElement,
          unit: 'word',
        },
      },
    });

    this.quillEditorService.updateQuillChanges(this.quillEditor);
  }

  getQuillEditorInstance(): Quill {
    return this.quillEditor!;
  }
}
