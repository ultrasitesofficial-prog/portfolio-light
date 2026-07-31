"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { RevealWords, Rise } from "@/components/ui/Reveal";
import { services, stack } from "@/data/content";
import { EASE } from "@/lib/ease";

/**
 * Services — the paper chapter opens here.
 * Expanding ledger rows; one open at a time, first open by default.
 */
export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" data-chapter="paper" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index="02" label="Services" meta="Design + build, founder-led" />

        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
          <h2 className="voice-d2 max-w-[16ch] md:col-span-8">
            <RevealWords text="Everything between the idea and the URL." />
          </h2>
          <Rise delay={0.2} className="md:col-span-4 md:self-end">
            <p className="voice-body text-muted">
              No handoffs, no telephone game. The founders who design your site are the ones
              who ship it — which is why the details survive.
            </p>
          </Rise>
        </div>

        <div role="list">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <Rise key={s.index} delay={i * 0.06}>
                <div className="hairline-t" role="listitem">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${i}`}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 text-left md:grid-cols-[8rem_1fr_auto] md:py-8"
                  >
                    <span className="voice-mono text-accent">{s.index}</span>
                    <span className="voice-d3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-active:translate-x-2">
                      {s.title}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="voice-d3 text-muted"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-10 md:grid-cols-[8rem_1fr_auto] md:gap-4">
                          <span aria-hidden="true" />
                          <p className="voice-body max-w-[52ch] text-muted">{s.blurb}</p>
                          <ul className="flex max-w-xs flex-wrap content-start gap-2 md:justify-end">
                            {s.deliverables.map((d) => (
                              <li key={d} className="chip voice-mono text-muted">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Rise>
            );
          })}
          <div className="hairline-t" />
        </div>

        {/* instrument rack */}
        <div className="marquee mt-16 overflow-hidden md:mt-24" aria-label="Technology stack">
          <div className="marquee-track items-center gap-10 pr-10">
            {[...stack, ...stack].map((t, i) => (
              <span key={i} className="voice-mono-lg flex items-center gap-10 whitespace-nowrap text-muted">
                {t}
                <span
                  aria-hidden="true"
                  className={i % 2 ? "text-accent-2" : "text-accent"}
                  style={{ fontSize: "0.5rem" }}
                >
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
