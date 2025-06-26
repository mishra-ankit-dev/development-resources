import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { firstEvent } from './first-event.util';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  template: `
    @if ((showOverlay$ | async)) {
      <div class="overlay">
        <h2>Welcome!</h2>
        <p>Click or press any key to continue...</p>
      </div>
    }
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
  private showOverlaySubject = new BehaviorSubject(true);
  showOverlay$ = this.showOverlaySubject.asObservable();

  private sub?: Subscription;

  ngOnInit() {
    this.sub = firstEvent(document, ['click', 'keypress']).subscribe(() => {
      this.showOverlaySubject.next(false);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
