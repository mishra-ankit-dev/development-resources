import { WritableSignal, signal, effect, computed } from '@angular/core';

export interface StorageSignalOptions<T> {
  storage?: Storage;
  serializer?: (value: T) => string;
  deserializer?: (raw: string) => T;
  crossTabSync?: boolean;
}

/**
 * Creates a persistent signal that syncs with storage and optionally across tabs.
 */
export function createStorageSignal<T>(
  key: string,
  defaultValue: T,
  options: StorageSignalOptions<T> = {}
): WritableSignal<T> {
  const {
    storage = localStorage,
    serializer = JSON.stringify as (v: T) => string,
    deserializer = JSON.parse as (raw: string) => T,
    crossTabSync = true,
  } = options;

  let initial = defaultValue;
  try {
    const raw = storage.getItem(key);
    if (raw !== null) initial = deserializer(raw);
  } catch {}

  const state = signal<T>(initial);

  effect(() => {
    try {
      storage.setItem(key, serializer(state()));
    } catch (err) {
      console.error(`[storageSignal] Persist failed for "${key}"`, err);
    }
  });

  if (crossTabSync && typeof window !== 'undefined') {
    window.addEventListener('storage', (ev: StorageEvent) => {
      if (ev.key !== key || ev.storageArea !== storage) return;
      if (ev.newValue === null) return;
      try {
        state.set(deserializer(ev.newValue));
      } catch {}
    });
  }

  return state;
}
