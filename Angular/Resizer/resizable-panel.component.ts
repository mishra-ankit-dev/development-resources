import { Component } from '@angular/core';
import { ResizerDirective } from './resizer.directive';

@Component({
  selector: 'app-resizable-panel',
  standalone: true,
  imports: [ResizerDirective],
  template: `
    <div
      resizer
      style="width: 300px; height: 40px; border: 1px solid #ccc; margin: 2rem 0;"
    >
      Drag my edge to resize me!
    </div>
  `
})
export class ResizablePanelComponent {}
