"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { letters } from "@/data/voices";
import { EASE } from "@/lib/ease";

const HOLD = 7.5; // seconds a letter stays on top before the file advances

/**
 * Voices — client correspondence, filed between chapters.
 * Deliberately unnumbered: testimonials aren't a chapter of the dossier,
 * they're letters clipped into it. A physical stack of sheets on the paper
 * theme; leaf through with the arrows, a drag, or let the timer file them.
 * W3C carousel manners: rotation pauses on hover/focus/drag and offscreen,
 * stops entirely under reduced motion; no live region while auto-rotating.
 */
export default function Voices() {
  const N = letters.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const deckRef = useRef<HTMLDivElement>(null);
  const inView = useInView(deckRef, { amount: 0.35 });

  const playing = inView && !paused && !reduced;

  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + N) % N), [N]);

  /* depth 0 is the readable sheet; 1–2 peek from beneath; the rest wait unseen */
  const sheetAt = (depth: number) =>
    [
      { y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 },
      { y: 18, x: 7, rotate: 1.1, scale: 0.985, opacity: 1 },
      { y: 34, x: -5, rotate: -0.8, scale: 0.97, opacity: 1 },
      { y: 34, x: 0, rotate: 0, scale: 0.96, opacity: 0 },
    ][Math.min(depth, 3)];

  return (
    <section id="voices" data-chapter="paper" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          label="The correspondence file"
          meta={`Founders' letters · ${String(N).padStart(2, "0")} sheets`}
        />

        <div
          className="mx-auto max-w-3xl"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* the stack — every sheet shares one grid cell */}
          <div ref={deckRef} className="grid pb-9" role="group" aria-label="Letters from the founders">
            {letters.map((l, i) => {
              const depth = (i - index + N) % N;
              const front = depth === 0;
              return (
                <motion.div
                  key={l.from}
                  className="will-change-transform [grid-area:1/1]"
                  style={{ zIndex: N - depth }}
                  initial={false}
                  animate={sheetAt(depth)}
                  transition={{ duration: reduced ? 0 : 0.85, ease: EASE }}
                  drag={front && !reduced ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.28}
                  whileDrag={{ rotate: 1.6, scale: 1.015 }}
                  onDragStart={() => setPaused(true)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70 || info.velocity.x < -400) step(1);
                    else if (info.offset.x > 70 || info.velocity.x > 400) step(-1);
                  }}
                  aria-hidden={!front}
                >
                  <blockquote
                    className={`flex h-full flex-col rounded-3xl p-6 md:p-10 ${front ? "cursor-grab active:cursor-grabbing" : ""}`}
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--line)",
                      boxShadow: "0 24px 60px -32px rgba(23, 53, 43, 0.25)",
                    }}
                  >
                    {/* sheets beneath show their edges, not their words */}
                    <motion.div
                      className="flex h-full flex-col"
                      initial={false}
                      animate={{ opacity: front ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                    >
                      <div className="grid gap-1.5">
                        <div className="grid grid-cols-[3.5rem_1fr] gap-3">
                          <span className="voice-mono text-muted/70">From</span>
                          <span className="voice-mono">{l.from}</span>
                        </div>
                        <div className="grid grid-cols-[3.5rem_1fr_auto] gap-3">
                          <span className="voice-mono text-muted/70">Re:</span>
                          <span className="voice-mono text-muted">{l.re}</span>
                          <span className="voice-mono hidden text-muted/70 sm:block">{l.date}</span>
                        </div>
                      </div>

                      <div className="hairline-b my-6" aria-hidden="true" />

                      <p className="voice-d4 mb-10 max-w-[46ch]" style={{ textWrap: "balance" }}>
                        “{l.text}”
                      </p>

                      <footer className="mt-auto flex items-baseline justify-between gap-4">
                        <span className="voice-mono text-muted">{l.signed}</span>
                        <span className="voice-mono flex items-center gap-2 text-accent-2" aria-hidden="true">
                          <span style={{ fontSize: "0.5rem" }}>◆</span> on file
                        </span>
                      </footer>
                    </motion.div>
                  </blockquote>
                </motion.div>
              );
            })}
          </div>

          {/* file controls: leaf back, leaf forward, and the hold timer */}
          <div className="mt-8 flex items-center gap-5 md:gap-6">
            <div className="flex gap-2">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => step(dir)}
                  aria-label={dir === 1 ? "Next letter" : "Previous letter"}
                  className="pill-btn h-11 w-11 !p-0"
                >
                  <span aria-hidden="true">{dir === 1 ? "→" : "←"}</span>
                </button>
              ))}
            </div>
            <p className="voice-mono tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </p>
            <div className="relative h-px flex-1 overflow-hidden bg-line" aria-hidden="true">
              {playing && (
                <motion.div
                  key={index}
                  className="absolute inset-0 origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: HOLD, ease: "linear" }}
                  onAnimationComplete={() => step(1)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
