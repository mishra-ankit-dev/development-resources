# First Event Utilities for Angular

Detect and respond to the **first occurrence** of any event (e.g., `'click'`, `'keypress'`, etc.) on any DOM target, using either RxJS **Observables** or Angular **Signals**.  
Perfect for onboarding overlays, one-off modals, lazy initialization, analytics, and more.

---

## ✨ Features

- Listen for first event(s) of any kind on any element(s)
- Use as an **Observable** (RxJS) or a **Signal** (Angular)
- Works with all DOM event types and targets (`document`, `window`, elements)
- Minimal, type-safe, and memory-leak free

---

## 1️⃣ Signal-based Approach

This approach gives you a reactive **signal** that you can use in templates, computed values, or any signal-driven state logic.

[Stackblitz demo URL](https://stackblitz.com/edit/stackblitz-starters-dmgajsru)

### **API**

```ts
import { firstEventSignal } from './first-event-signal.util';

const { signal: eventSignal, unsubscribe } = firstEventSignal(document, ['click', 'keypress']);
```

- eventSignal() is null until the event fires, then contains the event object.
-	Call unsubscribe() (e.g., in ngOnDestroy) for cleanup.

Usage Example

```ts
import { Component, OnInit, OnDestroy, computed } from '@angular/core';
import { firstEventSignal } from './first-event-signal.util';

@Component({
  selector: 'app-welcome-overlay',
  template: `
    <div *ngIf="showOverlay()" class="overlay">
      <h2>Welcome!</h2>
      <p>Click or press any key to continue...</p>
    </div>
    <div>
      <p>Main app content goes here.</p>
    </div>
  `
})
export class WelcomeOverlayComponent implements OnInit, OnDestroy {
  private eventWatcher = firstEventSignal(document, ['click', 'keypress']);
  showOverlay = computed(() => this.eventWatcher.signal() === null);

  ngOnInit() {}
  ngOnDestroy() {
    this.eventWatcher.unsubscribe();
  }
}
```

---

## 2️⃣ Observable-based Approach

This is a classic RxJS pattern: emits and completes on the first event (from any you specify).

API

```ts
import { firstEvent } from './first-event.util';

const sub = firstEvent(document, ['click', 'keypress']).subscribe(event => {
  // Do something on first interaction
});
```

-	The returned Observable emits the first event and then completes.
-	Unsubscribe only if you need to manually clean up before the event fires.

Usage Example

```ts
import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { Subscription } from 'rxjs';
import { firstEvent } from './first-event.util';

@Component({
  selector: 'app-welcome-overlay',
  template: `
    <div *ngIf="showOverlay()" class="overlay">
      <h2>Welcome!</h2>
      <p>Click or press any key to continue...</p>
    </div>
    <div>
      <p>Main app content goes here.</p>
    </div>
  `
})
export class WelcomeOverlayComponent implements OnInit, OnDestroy {
  private userInteracted = signal(false);
  showOverlay = computed(() => !this.userInteracted());

  private sub?: Subscription;

  ngOnInit() {
    this.sub = firstEvent(document, ['click', 'keypress']).subscribe(() => {
      this.userInteracted.set(true);
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
```

---

## ⚡ When to Use Which?
-	Signal-based:
-	Best for direct reactivity in templates and state computations (especially in modern Angular apps).
-	Use if your UI or signals need to react when the event occurs.
-	Observable-based:
-	Best for imperative flows, RxJS logic, or when you want to use RxJS operators.
-	Use if you want one-off effects, or to combine with other event streams.

---

## 🙋 FAQ

Q: Can I listen for multiple events or on multiple elements?

A: Yes! Both utilities accept arrays of event types and targets.

Q: Is cleanup automatic?

A: Both approaches auto-complete after the first event, but you should call unsubscribe() on the Signal-based utility in ngOnDestroy for safety.

Q: Can I extend for touch/mobile events?

A: Absolutely—just add 'touchstart' or any other event name to your array.

---
