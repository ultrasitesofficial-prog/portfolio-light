"use client";

/**
 * iOS-proof scroll lock. `overflow: hidden` on <html> does nothing for
 * touch scrolling in Safari — the body-fixed technique is the one that works.
 * Used by the menu overlay and the preloader.
 */
let savedY = 0;
let locked = false;

export function lockScroll() {
  if (locked) return;
  locked = true;
  savedY = window.scrollY;
  window.__lenis?.stop();
  const b = document.body.style;
  b.position = "fixed";
  b.top = `-${savedY}px`;
  b.left = "0";
  b.right = "0";
  b.width = "100%";
}

export function unlockScroll() {
  if (!locked) return;
  locked = false;
  const b = document.body.style;
  b.position = "";
  b.top = "";
  b.left = "";
  b.right = "";
  b.width = "";
  /* while the body was fixed the page height collapsed, so Lenis's cached
     limit is 0 and any scrollTo gets clamped — recompute before restoring */
  window.__lenis?.resize();
  if (window.__lenis) window.__lenis.scrollTo(savedY, { immediate: true, force: true });
  window.__lenis?.start();
  window.scrollTo(0, savedY);
}
