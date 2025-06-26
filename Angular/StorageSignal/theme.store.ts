import { Injectable, computed } from '@angular/core';
import { createStorageSignal } from './storage-signal.store';

/**
 * ThemeStore: manages light/dark mode with persistence and signals
 */
@Injectable({ providedIn: 'root' })
export class ThemeStore {
  // Core signal
  private readonly themeSignal = createStorageSignal<'light' | 'dark'>('app-theme', 'light');

  // Expose readonly signal
  readonly theme = computed(() => this.themeSignal());

  // Toggle theme
  toggle(): void {
    const next = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.themeSignal.set(next);
  }

  // Set theme directly
  set(theme: 'light' | 'dark'): void {
    this.themeSignal.set(theme);
  }
}
