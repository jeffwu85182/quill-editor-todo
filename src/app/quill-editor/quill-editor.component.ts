import Quill, { History, RangeStatic, Sources } from 'quill';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { Counter } from '../custom-module';
import { QuillEditorService } from '../services/quill-editor.service';
import { ContentsService } from '../services/contents.service';
import { FormatService } from '../services/format.service';
import { SelectionService } from '../services/selection.service';
import { EditorService } from '../services/editor.service';
import Delta from 'quill-delta';
import { ModelService } from '../services/model.service';
import { ExtensionService } from '../services/extension.service';
import { KeyboardService } from '../services/keyboard.service';

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
  styleUrls: ['./quill-editor.component.scss'],
})
export class QuillEditorComponent implements AfterViewInit {
  @ViewChild('quillContainer') quillContainer!: ElementRef;
  @ViewChild('toolbar') toolbar!: ElementRef;
  @ViewChild('counter') counter!: ElementRef;
  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('custom2') custom2!: ElementRef;
  currentState: unknown;
  history!: any;
  private quillEditor!: Quill;
  content: string = ''; // 初始化編輯器內容為空字串
  image: IImageMeta = {
    type: '',
    dataUrl: '',
    blobUrl: '',
    file: null,
  };
  constructor(
    private quillEditorService: QuillEditorService,
    private contentService: ContentsService,
    private formatService: FormatService,
    private selectionService: SelectionService,
    private editorService: EditorService,
    private modelService: ModelService,
    private extensionService: ExtensionService,
    private keyboardService: KeyboardService
  ) {}
  ngAfterViewInit() {
    this.quillEditorService.registerCustomBolt();
    this.initQuillEditor();
    // 監聽編輯器內容變化事件，並將變化同步到 Angular 的資料模型
    // this.quillEditor.on(
    //   'text-change',
    //   (delta: Delta, oldContent: Delta, source: Sources) => {
    //     console.log('text-change', delta);
    //     console.log('oldContent', oldContent);
    //     console.log('source', source);
    //     this.content = this.quillEditor.root.innerHTML;
    //     this.history = this.quillEditor.history;
    //   }
    // );

    // 監聽選擇範圍變化事件
    // this.quillEditor.on('selection-change', (range, oldRange, source) => {
    //   console.log('selection-change', range);
    //   console.log('oldRange', oldRange);
    //   console.log('source', source);
    // });

    // 監聽編輯器內容變化事件
    this.quillEditor.on('editor-change', (eventName: any, ...args: any) => {
      console.log('editor-change', eventName, args);
    });
    this.subscribeCurrentState();
  }

  subscribeCurrentState() {
    this.quillEditorService.quillUpdateSubject$.subscribe({
      next: (changesDelta) => {
        const contents = this.quillEditor.getContents();
        (this.currentState = {
          contents,
          changes: changesDelta,
        }),
          null,
          2;
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
    icons['insertCustomBlotButton'] = '<i class="fa-solid fa-wand-magic"></i>';
    Quill.register('modules/counter', Counter);
    this.extensionService.register();
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
            insertCustomBlotButton: () => {
              this.quillEditorService.insertRedText(this.quillEditor);
            },
          },
        },
        // 初始化時加入 key binding，可以觀察 instance 的 keyboard.bindings
        keyboard: {
          bindings: {
            custom: {
              key: 'enter',
              empty: true,
              handler: (range: RangeStatic, context: any) => {
                // 空行時插入特殊符號
                this.quillEditor.insertText(range.index, '★');
              },
            },
          },
        },
        counter: {
          container: this.counter.nativeElement,
          unit: 'word',
        },
        jeff: true,
      },
    });

    this.quillEditorService.updateQuillChanges(this.quillEditor);
  }

  getQuillEditorInstance(): Quill {
    return this.quillEditor!;
  }

  deleteText() {
    this.contentService.deleteText(this.quillEditor);
  }

  getContent() {
    this.contentService.getContent(this.quillEditor);
  }

  getContentWithParams() {
    this.contentService.getContentWithParams(this.quillEditor);
  }

  getLength() {
    this.contentService.getLength(this.quillEditor);
  }

  getText() {
    this.contentService.getText(this.quillEditor);
  }

  insertEmbed() {
    this.contentService.insertEmbed(this.quillEditor);
  }

  insertText() {
    this.contentService.insertText(this.quillEditor);
  }

  insertTextWithParams() {
    this.contentService.insertTextWithParams(this.quillEditor);
  }

  setContents() {
    this.contentService.setContents(this.quillEditor);
  }

  setText() {
    this.contentService.setText(this.quillEditor);
  }

  updateContents() {
    this.contentService.updateContents(this.quillEditor);
  }

  // Format
  format() {
    this.formatService.format(this.quillEditor);
  }

  formatLine() {
    this.formatService.formatLine(this.quillEditor);
  }

  formatLineWithSingleFormat() {
    this.formatService.formatLineWithSingleFormat(this.quillEditor);
  }

  formatLineWithMultipleFormats() {
    this.formatService.formatLineWithMultipleFormats(this.quillEditor);
  }

  formatText() {
    this.formatService.formatText(this.quillEditor);
  }

  getFormat() {
    this.formatService.getFormat(this.quillEditor);
  }

  removeFormat() {
    this.formatService.removeFormat(this.quillEditor);
  }

  // Selection
  getBounds() {
    this.quillEditor.on('selection-change', (range) => {
      if (range) {
        if (range.length > 0) {
          // 獲取選擇範圍的界限
          const bounds = this.selectionService.getBounds(
            this.quillEditor,
            range.index
          );

          // 定位和顯示小提示
          const tooltip = this.tooltip.nativeElement;
          tooltip.style.left = bounds.left + 'px';
          tooltip.style.top = bounds.top + bounds.height + 'px';
          tooltip.style.display = 'block';
        } else {
          // 隱藏小提示
          const tooltip = this.tooltip.nativeElement;
          tooltip.style.display = 'none';
        }
      }
    });
  }

  getSelection() {
    this.selectionService.getSelection(this.quillEditor);
  }

  setSelection() {
    this.selectionService.setSelection(this.quillEditor);
  }

  // Editor
  blur() {
    this.editorService.blur(this.quillEditor);
  }

  disable() {
    this.editorService.disable(this.quillEditor);
  }

  enable() {
    this.editorService.enable(this.quillEditor);
  }

  focus() {
    this.editorService.focus(this.quillEditor);
  }

  hasFocus() {
    console.log(this.quillEditor.hasFocus());
  }

  // Model
  find() {
    this.modelService.find(this.quillEditor, this.quillContainer.nativeElement);
  }

  getIndex() {
    this.modelService.getIndex(this.quillEditor);
  }

  getLeaf() {
    this.modelService.getLeaf(this.quillEditor);
  }

  getLine() {
    this.modelService.getLine(this.quillEditor);
  }

  getLines() {
    this.modelService.getLines(this.quillEditor);
  }

  // Extension
  debug() {
    this.extensionService.debug();
  }

  import() {
    this.extensionService.import();
  }

  register() {
    this.extensionService.register();
  }

  addContainer() {
    this.extensionService.addContainer(this.quillEditor);
  }

  addContainerWithNativeElement() {
    this.extensionService.addContainerWithNativeElement(
      this.quillEditor,
      this.custom2.nativeElement
    );
  }

  getModule() {
    this.extensionService.getModule(this.quillEditor);
  }

  // Keyboard
  addBinding() {
    this.keyboardService.addBinding(this.quillEditor);
  }

  addBindingWithMoreContext() {
    this.keyboardService.addBindingWithMoreContext(this.quillEditor);
  }

  addBindingWithEmpty() {
    this.keyboardService.addBindingWithEmpty(this.quillEditor);
  }
}
