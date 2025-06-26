import {
  Directive,
  AfterViewInit,
  ElementRef,
  NgZone,
  inject,
  DestroyRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  tap,
  switchMap,
  takeUntil,
  throttleTime,
  pairwise,
  filter,
  finalize,
} from 'rxjs/operators';

/**
 * Usage:
 * <div resizer style="width: 300px;">Resizable content</div>
 */
@Directive({
  selector: '[resizer]',
  standalone: true,
})
export class ResizerDirective implements AfterViewInit {
  private readonly zone = inject(NgZone);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  // RxJS event streams for mouse interaction
  private readonly mouseup$ = fromEvent<MouseEvent>(document, 'mouseup', { passive: true });
  private readonly mousemove$ = fromEvent<MouseEvent>(document, 'mousemove', { passive: true });
  private readonly mousedown$ = fromEvent<MouseEvent>(this.el.nativeElement, 'mousedown', { passive: true });

  // Track the starting position and width
  private startX = 0;
  private startWidth = 0;

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.mousedown$
        .pipe(
          tap((event: MouseEvent) => this.beginResizing(event)),
          switchMap(() =>
            this.mousemove$.pipe(
              takeUntil(this.mouseup$),
              throttleTime(16), // ~60fps, smooth
              pairwise(),
              filter(([prev, curr]) => this.isSignificantChange(prev, curr)),
              tap(([_, curr]) => this.handleMouseMove(curr)),
              finalize(() => this.completeResizing())
            )
          )
        )
        .subscribe();
    });
  }

  /**
   * Initiates the resizing process.
   * @param event Mouse down event
   */
  private beginResizing(event: MouseEvent): void {
    this.startX = event.clientX;
    this.startWidth = this.el.nativeElement.offsetWidth;
    this.el.nativeElement.style.userSelect = 'none'; // Prevents text selection
  }

  /**
   * Checks if the mouse movement is significant (>1px change).
   */
  private isSignificantChange(prev: MouseEvent, curr: MouseEvent): boolean {
    return Math.abs(curr.clientX - prev.clientX) > 1;
  }

  /**
   * Adjusts the width of the element as the mouse moves.
   */
  private handleMouseMove(event: MouseEvent): void {
    const deltaX = event.clientX - this.startX;
    const newWidth = Math.max(this.startWidth + deltaX, 50); // Prevent <50px width
    this.el.nativeElement.style.width = `${newWidth}px`;
  }

  /**
   * Cleans up styles after resizing is finished.
   */
  private completeResizing(): void {
    this.el.nativeElement.style.userSelect = '';
  }
}
