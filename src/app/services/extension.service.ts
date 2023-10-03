import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {
  constructor() {}

  debug() {
    Quill.debug('info');
  }

  import() {
    Quill.import('modules/toolbar');
  }

  register() {
    console.log('register');
    const Module = Quill.import('core/module');
    class Jeff extends Module {}
    Quill.register('modules/jeff', Jeff);
  }

  addContainer(quill: Quill) {
    console.log('addContainer');
    quill.addContainer('ql-custom');
  }

  addContainerWithNativeElement(quill: Quill, nativeElement: HTMLElement) {
    const toolEditor = document.querySelector('.ql-editor');
    console.log('addContainerWithNativeElement');
    quill.addContainer(nativeElement, toolEditor!);
  }

  getModule(quill: Quill) {
    const counter = quill.getModule('jeff');
    console.log('getModule', counter);
  }
}
