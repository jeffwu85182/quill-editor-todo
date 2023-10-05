import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { ToolbarPracticeComponent } from './toolbar-practice/toolbar-practice.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, QuillEditorComponent, ToolbarPracticeComponent],
})
export class AppComponent {
  title = 'quill-editor-todo';
}
