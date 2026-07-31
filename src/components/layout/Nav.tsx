"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { EASE, EASE_IO } from "@/lib/ease";
import { scrollToHash } from "@/lib/hooks";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { site } from "@/data/site";
import LocalTime from "@/components/ui/LocalTime";
import Wordmark from "@/components/ui/Wordmark";

const LINKS = [
  { n: "01", label: "Work", hash: "#work" },
  { n: "02", label: "Services", hash: "#services" },
  { n: "03", label: "Process", hash: "#process" },
  { n: "04", label: "Studio", hash: "#studio" },
  { n: "05", label: "FAQ", hash: "#faq" },
  { n: "06", label: "Contact", hash: "#contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 24);
  });

  /* smooth-scroll to section when already home; navigate otherwise */
  const go = useCallback(
    (hash: string) => (e: React.MouseEvent) => {
      setOpen(false);
      if (pathname === "/") {
        e.preventDefault();
        scrollToHash(hash);
      }
    },
    [pathname],
  );

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    return unlockScroll;
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[120]"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* scrim keeps mono labels legible over content without a glass panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -bottom-8 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
            opacity: scrolled ? 0.92 : 0,
          }}
        />
        <nav className="container-x relative flex items-center justify-between py-5 md:py-6" aria-label="Primary">
          <Link href="/" className="u-link inline-flex items-center" onClick={go("#top")} aria-label={site.name}>
            <Wordmark className="h-5 text-fg" decorative />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a key={l.hash} href={`/${l.hash}`} onClick={go(l.hash)} className="voice-mono u-link text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <p className="voice-mono hidden items-center gap-2 text-muted md:flex">
              <span className="pulse-dot" aria-hidden="true" />
              {site.availability}
            </p>
            <button
              type="button"
              className="pill-btn voice-mono lg:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[110] bg-ink text-bone lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_IO }}
          >
            <div
              className="flex h-full flex-col justify-between px-6"
              style={{
                paddingTop: "max(7rem, calc(env(safe-area-inset-top) + 6rem))",
                paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
              }}
            >
              <nav aria-label="Menu">
                <ul className="space-y-2">
                  {LINKS.map((l, i) => (
                    <motion.li
                      key={l.hash}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <a href={`/${l.hash}`} onClick={go(l.hash)} className="voice-d2 flex items-baseline gap-4">
                        <span aria-hidden="true" className="voice-mono text-accent-2">✦</span>
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div
                className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <div>
                  <p className="voice-mono mb-1 text-bone/50">New business</p>
                  <a href={`mailto:${site.email}`} className="voice-mono u-link -my-2 inline-block py-2">
                    {site.email}
                  </a>
                </div>
                <p className="voice-mono text-bone/50">
                  {site.location.split(",")[0]} — <LocalTime className="tabular-nums" />
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
