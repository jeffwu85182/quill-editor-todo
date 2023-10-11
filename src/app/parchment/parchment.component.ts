import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
import { Attributor, ClassAttributor, StyleAttributor } from 'parchment';

@Component({
  selector: 'app-parchment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parchment.component.html',
  styleUrls: ['./parchment.component.scss'],
})
export class ParchmentComponent {
  @ViewChild('quillContainer') quillContainer: any;
  quillInstance!: Quill;

  initQuill() {
    this.quillInstance = new Quill(this.quillContainer.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: ['width'],
          handlers: {
            width: () => {
              this.quillInstance.format('align', 'right');
            },
          },
        },
      },
      formats: ['format/width'],
    });
  }

  addAttributor() {
    const width = new Attributor('width', 'width');
    Quill.register(width);

    const imageNode = document.createElement('img');
    width.add(imageNode, '200px');
    console.log(imageNode.outerHTML); // Will print <img width="200px">
    const value = width.value(imageNode); // Will return 200px
    console.log('value', value);
    width.remove(imageNode);
    console.log(imageNode.outerHTML); // Will print <img>
  }

  addClassAttributor() {
    const align = new ClassAttributor('align', 'blot-align');
    Quill.register(align);

    const node = document.createElement('div');
    align.add(node, 'right');
    console.log(node.outerHTML); // Will print <div class="text-align-right"></div>
  }

  addStyleAttributor() {
    const align = new StyleAttributor('align', 'text-align', {
      whitelist: ['right', 'center', 'justify'], // Having no value implies left align
    });
    Quill.register(align);

    const node = document.createElement('div');
    align.add(node, 'right');
    console.log(node.outerHTML); // Will print <div style="text-align: right;"></div>
  }
}
