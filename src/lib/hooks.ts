"use client";

import { useSyncExternalStore } from "react";

/** Media query as an external store — SSR-safe, no setState-in-effect. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Smooth-scroll to an in-page anchor, through Lenis when present. */
export function scrollToHash(hash: string, duration = 1.4) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(hash, { duration });
  else el.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", hash);
}
