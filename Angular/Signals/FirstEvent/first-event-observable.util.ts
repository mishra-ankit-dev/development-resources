import { fromEvent, race, Observable } from 'rxjs';

/**
 * Creates an Observable that emits the first occurrence of any of the given events on the given targets.
 *
 * @param targets - A single EventTarget (like `document`/`window`/element) or an array of EventTargets.
 * @param eventTypes - Array of event type strings (e.g. ['click', 'keypress', 'mousedown'])
 * @returns Observable<T> - emits the first matching event and completes.
 *
 * Example:
 *   firstEvent(document, ['click', 'keypress']).subscribe(ev => { ... });
 */
export function firstEvent<T extends Event = Event>(
  targets: EventTarget | EventTarget[],
  eventTypes: string[]
): Observable<T> {
  const allTargets = Array.isArray(targets) ? targets : [targets];
  const streams = allTargets.flatMap(target =>
    eventTypes.map(eventType => fromEvent<T>(target, eventType))
  );
  return race(...streams);
}
