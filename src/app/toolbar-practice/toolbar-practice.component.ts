import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';

@Component({
  selector: 'app-toolbar-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar-practice.component.html',
  styleUrls: ['./toolbar-practice.component.scss'],
})
export class ToolbarPracticeComponent implements AfterViewInit {
  @ViewChild('quillContainer') quillContainer!: ElementRef;
  @ViewChild('myToolbar') myToolbar!: ElementRef;
  quill!: Quill;
  ngAfterViewInit(): void {
    this.initToolbarByContainer();
    // this.initToolbarByOptions();
  }

  initToolbarByContainer() {
    this.quill = new Quill(this.quillContainer.nativeElement, {
      theme: 'snow',
      modules: {
        // toolbar: this.myToolbar.nativeElement,
        toolbar: {
          container: this.myToolbar.nativeElement,
          handlers: {
            bold: (value: boolean) => {
              console.log('value', value);
              this.quill.format('bold', value);
            },
            link: (value: string) => {
              if (value) {
                const href = prompt('Enter the URL');
                this.quill.format('link', href);
              } else {
                this.quill.format('link', false);
              }
            },
          },
        },
      },
    });
  }

  initToolbarByOptions() {
    this.quill = new Quill(this.quillContainer.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // 升冪與降冪
          [{ indent: '-1' }, { indent: '+1' }], // 縮排與減少縮排
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown 從 theme 獲取預設值
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // 移除格式
        ],
      },
    });
  }

  doSomething() {
    console.log('do something...');
  }
}
