import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { firstEventSignal } from './first-event-signal.util';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  template: `
    <div *ngIf="showOverlay()" class="overlay">
      <h2>Welcome!</h2>
      <p>Click or press any key to continue...</p>
    </div>
    <div>
      <p>Main app content goes here.</p>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5); color: #fff; z-index: 10;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
  `]
})
export class WelcomeOverlayComponent implements OnInit, OnDestroy {
  private eventWatcher = firstEventSignal(document, ['click', 'keypress']);
  showOverlay = computed(() => this.eventWatcher.signal() === null);

  ngOnInit() {}
  ngOnDestroy() {
    this.eventWatcher.unsubscribe();
  }
}
