# Angular SignalStore with Persistent Storage

A minimal, modern SignalStore pattern for Angular 17+. Combine Angular Signals and persistent storage (`localStorage`/`sessionStorage`) for fully reactive, cross-tab-synced app state.

## 🚀 Features

- ⚡ Reactive Angular Signals (`signal`, `computed`)
- 💾 State persistence in `localStorage` or `sessionStorage`
- 🔄 Optional cross-tab synchronization
- 🧩 No external dependencies
- 🏗️ Scalable: Create as many stores as you need

## 📦 Quick Start

### 1. Add the Store Utility

Your project should already have something like:

```ts
// storage-signal.store.ts
import { WritableSignal, signal, effect } from '@angular/core';

export interface StorageSignalOptions<T> {
  storage?: Storage;
  serializer?: (value: T) => string;
  deserializer?: (raw: string) => T;
  crossTabSync?: boolean;
}

export function createStorageSignal<T>(
  key: string,
  defaultValue: T,
  options: StorageSignalOptions<T> = {}
): WritableSignal<T> {
  // ...implementation in your file
}
```

### 2. Create a Typed Store

Example: src/app/shared/theme.store.ts

```ts
// src/app/shared/theme.store.ts
import { Injectable, computed } from '@angular/core';
import { createStorageSignal } from './storage-signal.store';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly themeSignal = createStorageSignal<'light' | 'dark'>('app-theme', 'light');
  readonly theme = computed(() => this.themeSignal());

  toggle(): void {
    this.themeSignal.set(this.themeSignal() === 'light' ? 'dark' : 'light');
  }
  set(theme: 'light' | 'dark'): void {
    this.themeSignal.set(theme);
  }
}
```

## 3. Use the Store in Your Component

```ts
import { Component, inject } from '@angular/core';
import { ThemeStore } from '../shared/theme.store';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button (click)="themeStore.toggle()">
      Theme: {{ themeStore.theme() }}
    </button>
  `
})
export class ThemeToggleComponent {
  themeStore = inject(ThemeStore);
}
```

## ⚙️ Advanced Options
-	Use sessionStorage or a custom storage engine by passing { storage: sessionStorage } to createStorageSignal.
-	Serialize data for security or compression:

```ts
const user = createStorageSignal('user', {}, {
  serializer: v => btoa(JSON.stringify(v)),
  deserializer: s => JSON.parse(atob(s))
});
```

## 🧪 Testing
-	Mock localStorage in unit tests for deterministic results.
-	All stores are plain Angular services—no test-specific configuration needed.

## 🙋 FAQ

Q: Can I use this for arrays or objects?

A: Yes—use `signal<T[]>`, `signal<{...}>`, etc.

Q: Is this a replacement for NgRx/Akita?

A: For small/medium feature state, yes! For large, highly complex state, consider NgRx.

Q: Angular version?

A: Requires Angular 16+ (Signals API). 17+ recommended.
