"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { markReady } from "@/lib/ready";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { EASE_IO } from "@/lib/ease";
import { site } from "@/data/site";

const SEEN_KEY = "ultrasite:seen";

/**
 * Preloader — a 1.2s "calibration" pass, shown once per session.
 * The counter eases to 100 while a hairline draws across; the curtain
 * then lifts in two layers and hands off to the hero entrance.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"idle" | "counting" | "done">("idle");
  const raf = useRef(0);

  useEffect(() => {
    /* decide inside the first frame — keeps state writes out of the effect body */
    raf.current = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {}

      if (seen || reduced) {
        setPhase("done");
        markReady();
        return;
      }

      setPhase("counting");
      lockScroll();

      const T = 1150;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / T, 1);
        const eased = 1 - Math.pow(2, -10 * t); // expo-out
        setPct(Math.round(eased * 100));
        if (t < 1) {
          raf.current = requestAnimationFrame(tick);
        } else {
          setPct(100);
          window.setTimeout(() => {
            try {
              sessionStorage.setItem(SEEN_KEY, "1");
            } catch {}
            unlockScroll();
            setPhase("done");
            markReady();
          }, 180);
        }
      };
      raf.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf.current);
      unlockScroll();
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="preloader fixed inset-0 z-[200]"
          aria-hidden="true"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE_IO } }}
        >
          {/* lagging under-curtain — a wash of periwinkle as the site opens */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, var(--peri-deep), var(--peri))", opacity: 0.3 }}
            exit={{ y: "-12%", transition: { duration: 0.9, ease: EASE_IO } }}
          />
          <div className="absolute inset-0 bg-ink text-bone">
            <div className="flex h-full flex-col justify-between p-6 md:p-10">
              <div className="flex items-baseline justify-between">
                <p className="voice-mono">{site.name}</p>
                <p className="voice-mono opacity-50">Portfolio — {new Date().getFullYear()}</p>
              </div>
              <div>
                <div className="mb-6 flex items-end justify-between">
                  <p className="voice-mono opacity-50">Calibrating experience</p>
                  <p
                    className="font-mono tabular-nums leading-none"
                    style={{ fontSize: "clamp(3rem, 9vw, 7rem)", letterSpacing: "-0.03em" }}
                  >
                    {pct.toString().padStart(3, "0")}
                  </p>
                </div>
                <div className="h-px w-full bg-bone/15">
                  <div
                    className="h-[2px] origin-left"
                    style={{
                      transform: `scaleX(${pct / 100})`,
                      transition: "transform 90ms linear",
                      background: "linear-gradient(90deg, var(--peri-deep), var(--gold))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
