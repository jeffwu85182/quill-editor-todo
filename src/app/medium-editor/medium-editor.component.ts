import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';

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

  ngAfterViewInit(): void {
    this.quillInstance = new Quill(this.editorContainer.nativeElement);
  }
  formatBold() {
    alert('click!');
  }
}
