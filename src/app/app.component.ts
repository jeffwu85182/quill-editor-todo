import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { ToolbarPracticeComponent } from './toolbar-practice/toolbar-practice.component';
import { ParchmentComponent } from './parchment/parchment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    QuillEditorComponent,
    ToolbarPracticeComponent,
    ParchmentComponent,
  ],
})
export class AppComponent {
  title = 'quill-editor-todo';
}
