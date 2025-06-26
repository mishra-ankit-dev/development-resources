import { Component, inject } from '@angular/core';
import { ThemeStore } from '../stores/theme.store';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button (click)="themeStore.toggle()">
      Current Theme: {{ themeStore.theme() }}
    </button>
  `
})
export class ThemeToggleComponent {
  themeStore = inject(ThemeStore);
}
