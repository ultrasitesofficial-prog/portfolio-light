"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { RevealWords, Rise } from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";
import { EASE } from "@/lib/ease";

/**
 * Process — the one honestly sequential section, so it gets the numbers.
 * Desktop: a sticky rail holds a giant swapping numeral while steps scroll.
 */
export default function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step ?? 0);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" data-chapter="paper" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index="03" label="Process" meta="A typical 8-week engagement" />

        <h2 className="voice-d2 mb-16 max-w-[18ch] md:mb-24">
          <RevealWords text="Measured twice. Built once." />
        </h2>

        {/* mobile: the numeral rail is desktop-only, so a sticky phase strip
            tracks progress as the steps scroll underneath */}
        <div
          className="sticky top-0 z-10 -mx-1 mb-6 px-1 md:hidden"
          style={{ background: "var(--bg)", transition: "background-color 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        >
          <div className="hairline-b flex items-center justify-between py-3.5">
            <p className="voice-mono">
              <span className="text-accent">Phase {processSteps[active].n}</span>
              <span className="text-muted"> — {processSteps[active].title}</span>
            </p>
            <div className="flex gap-1.5" aria-hidden="true">
              {processSteps.map((_, i) => (
                <span
                  key={i}
                  className="h-px w-5 transition-colors duration-500"
                  style={{ background: i <= active ? "var(--accent)" : "var(--line-strong)" }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          {/* sticky numeral rail */}
          <div className="hidden md:col-span-4 md:block">
            <div className="sticky top-28">
              <div className="relative h-[11rem] overflow-hidden" aria-hidden="true">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={active}
                    className="voice-d1 absolute text-accent"
                    style={{ fontSize: "11rem", lineHeight: 1 }}
                    initial={{ y: "60%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-60%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {processSteps[active].n}
                  </motion.p>
                </AnimatePresence>
              </div>
              {/* progress ticks */}
              <div className="mt-8 flex gap-2" aria-hidden="true">
                {processSteps.map((_, i) => (
                  <span
                    key={i}
                    className="h-px flex-1 transition-colors duration-500"
                    style={{ background: i <= active ? "var(--accent)" : "var(--line)" }}
                  />
                ))}
              </div>
              <p className="voice-mono mt-4 text-muted">
                Phase {processSteps[active].n} / {processSteps[processSteps.length - 1].n}
              </p>
            </div>
          </div>

          {/* steps */}
          <ol className="md:col-span-8">
            {processSteps.map((step, i) => (
              <li
                key={step.n}
                data-step={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="hairline-t py-10 transition-opacity duration-500 md:py-14"
                style={{ opacity: active === i ? 1 : 0.45 }}
              >
                <Rise delay={0.05}>
                  <div className="mb-3 flex items-baseline gap-4">
                    <p className="voice-mono text-accent md:hidden">{step.n}</p>
                    <h3 className="voice-d3">{step.title}</h3>
                    <p className="voice-mono ml-auto text-muted">{step.duration}</p>
                  </div>
                  <p className="voice-body mb-5 max-w-[52ch] text-muted">{step.body}</p>
                  <p className="voice-mono text-muted">
                    <span className="text-accent">Deliverable</span> — {step.artifact}
                  </p>
                </Rise>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
