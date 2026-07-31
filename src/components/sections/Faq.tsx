"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { RevealWords, Rise } from "@/components/ui/Reveal";
import { faqs } from "@/data/voices";
import { scrollToHash } from "@/lib/hooks";
import { EASE } from "@/lib/ease";

/**
 * FAQ — the questions file, still on paper.
 * A quiet interrogation sheet: sticky brief on the left, Q-numbered rows
 * on the right. Bracketed toggles echo the section indices; answers carry
 * mono spec chips where a number settles the question faster than prose.
 */
export default function Faq() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" data-chapter="paper" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index="05" label="Questions, answered" meta="Read before the first call" />

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* the brief — stays put while the file scrolls */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 className="voice-d3 max-w-[14ch]">
                <RevealWords text="Asked before every project." />
              </h2>
              <Rise delay={0.15}>
                {/* single expression: this Next build trims leading spaces on
                    continuation lines of JSX text, eating the gap after {expr} */}
                <p className="voice-body mt-6 max-w-[34ch] text-muted">
                  {`The ${String(faqs.length).padStart(2, "0")} questions clients raise first — answered the way we'd answer them on a call, numbers included.`}
                </p>
                <p className="voice-mono mt-8">
                  <a
                    href="#contact"
                    className="u-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash("#contact");
                    }}
                  >
                    Ask yours <span aria-hidden="true" className="text-accent">→</span>
                  </a>
                </p>
              </Rise>
            </div>
          </div>

          {/* the questions file */}
          <div className="md:col-span-8" role="list">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Rise key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                  <div className="hairline-t" role="listitem">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="group grid w-full grid-cols-[3.4rem_1fr_auto] items-baseline gap-3 py-5 text-left md:gap-4 md:py-6"
                    >
                      <span className="voice-mono text-accent">Q.{String(i + 1).padStart(2, "0")}</span>
                      <span className="voice-d4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-active:translate-x-1.5">
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center self-center rounded-full text-base transition-all duration-300"
                        style={{
                          background: isOpen ? "var(--fg)" : "var(--peri)",
                          color: isOpen ? "var(--bg)" : "var(--pine)",
                        }}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-[3.4rem_1fr] md:gap-4">
                            <span className="hidden md:block" aria-hidden="true" />
                            <div>
                              <p className="voice-body max-w-[56ch] text-muted">{f.a}</p>
                              {f.spec && (
                                <ul className="mt-5 flex flex-wrap gap-2">
                                  {f.spec.map((s) => (
                                    <li key={s} className="chip voice-mono text-muted">
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
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
        </div>
      </div>
    </section>
  );
}
