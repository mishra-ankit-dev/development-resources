import { signal } from '@angular/core';
import { fromEvent, race, Subscription } from 'rxjs';

/**
 * Returns a signal that becomes set to the first event of the given types on the given targets.
 * 
 * @param targets - Single element or array of elements (e.g. document, window, HTMLElement, etc)
 * @param eventTypes - Array of event names, e.g. ['click', 'keypress']
 * @returns { signal: () => T | null, unsubscribe: () => void }
 */
export function firstEventSignal<T extends Event = Event>(
  targets: EventTarget | EventTarget[],
  eventTypes: string[]
): { signal: () => T | null; unsubscribe: () => void } {
  const eventSignal = signal<T | null>(null);
  const allTargets = Array.isArray(targets) ? targets : [targets];
  const streams = allTargets.flatMap(target =>
    eventTypes.map(eventType => fromEvent<T>(target, eventType))
  );
  const sub: Subscription = race(...streams).subscribe(event => eventSignal.set(event));
  return {
    signal: eventSignal,
    unsubscribe: () => sub.unsubscribe()
  };
}
