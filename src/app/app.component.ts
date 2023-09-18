import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, QuillEditorComponent],
})
export class AppComponent {
  title = 'quill-editor-todo';
}
