import { Component } from '@angular/core';
import { ResizerDirective } from './shared/resizer.directive';

@Component({
  selector: 'app-resizable-sidebar',
  standalone: true,
  imports: [ResizerDirective],
  template: `
    <div style="display: flex; height: 300px;">
      <div
        resizer
        style="
          width: 220px;
          min-width: 100px;
          max-width: 500px;
          background: #f0f0f0;
          border-right: 2px solid #ccc;
          padding: 16px 8px;
          resize: none;
        "
      >
        <b>Sidebar</b>
        <br />
        You can resize this sidebar horizontally!
      </div>
      <div style="flex: 1; padding: 1rem;">Main content here.</div>
    </div>
  `
})
export class ResizableSidebarComponent {}
