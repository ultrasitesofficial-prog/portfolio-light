"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * SiteFrame — mounts once in the layout.
 * 1. Lenis momentum scroll (skipped for reduced motion / coarse pointers keep native feel too)
 * 2. Chapter observer: sections declare data-chapter="ink|paper";
 *    the crossing section sets the document theme so the whole page
 *    (nav included) morphs material.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SiteFrame() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.115,
      wheelMultiplier: 1,
      anchors: { offset: -1 },
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    return () => {
      lenisRef.current?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  /* chapter → theme; re-wired per route since sections change */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "paper");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-chapter") ?? "ink";
            document.documentElement.setAttribute("data-theme", theme);
          }
        }
      },
      /* a thin band across the viewport's middle decides the chapter */
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
