"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny global "site ready" store — flips true when the preloader finishes
 * so the hero can hold its entrance until the curtain lifts.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (ready) return;
  ready = true;
  document.documentElement.setAttribute("data-ready", "true");
  listeners.forEach((l) => l());
}

export function useSiteReady() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => ready,
    () => false,
  );
}
