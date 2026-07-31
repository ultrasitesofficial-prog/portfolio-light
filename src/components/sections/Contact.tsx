"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { RevealWords, Rise } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/data/site";

const ContourField = dynamic(() => import("@/components/gl/ContourField"), { ssr: false });

/** Contact — the contour field returns, calmer, as a closing bookend. */
export default function Contact() {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const emailRef = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(site.email);
      ok = true;
    } catch {
      /* clipboard blocked — degrade below */
    }
    if (ok) {
      setState("copied");
      window.setTimeout(() => setState("idle"), 2200);
    } else if (emailRef.current) {
      /* select the address so ⌘/Ctrl+C still lands */
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setState("manual");
      window.setTimeout(() => setState("idle"), 3500);
    }
  };

  return (
    <section id="contact" data-chapter="ink" className="relative overflow-hidden py-28 md:py-44">
      <div className="absolute inset-0" aria-hidden="true">
        <ContourField
          className="h-full w-full"
          density={13}
          alpha={0.55}
          speed={0.7}
          fade={[0.12, 0.12, 0.04, 0.04]}
        />
      </div>

      <div className="container-x relative">
        <SectionHead index="06" label="Contact" meta="Replies within 24 hours" />

        <h2 className="voice-d2 mx-auto max-w-[17ch] text-center">
          <RevealWords text="Got a project worth building properly?" />
        </h2>

        <Rise delay={0.25} className="mt-14 text-center md:mt-20">
          <p className="voice-mono mb-4 text-muted" aria-live="polite">
            {state === "copied" ? (
              <span className="text-accent">Copied to clipboard ✓</span>
            ) : state === "manual" ? (
              <span className="text-accent">Selected — press Ctrl/⌘ + C</span>
            ) : (
              "Click to copy"
            )}
          </p>
          <button
            type="button"
            onClick={copy}
            data-cursor="link"
            className="group mx-auto block text-center"
            aria-label={`Copy email address ${site.email}`}
          >
            <span
              ref={emailRef}
              className="voice-d3 underline decoration-[var(--line-strong)] decoration-1 underline-offset-8 transition-colors duration-300 group-hover:decoration-[var(--accent)]"
              style={{ fontSize: "clamp(1rem, 5.1vw, 2.75rem)", letterSpacing: "-0.01em", overflowWrap: "anywhere" }}
            >
              {site.email}
            </span>
          </button>
        </Rise>

        <Rise delay={0.4}>
          <div className="mt-14 flex flex-col items-stretch gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:mt-20">
            <Magnetic strength={0.3} className="w-full sm:w-auto">
              <a
                className="plate-btn voice-mono w-full justify-center sm:w-auto"
                href={`mailto:${site.email}?subject=Project inquiry`}
              >
                Write the first brief <span aria-hidden="true" className="text-accent-2">→</span>
              </a>
            </Magnetic>
            <p className="voice-mono flex items-center gap-2 text-muted">
              <span className="pulse-dot" aria-hidden="true" />
              {site.availability}
            </p>
          </div>
        </Rise>

        <Rise delay={0.5}>
          <ul className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-2 md:mt-24">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  className="voice-mono u-link inline-block py-1.5 text-muted hover:text-fg"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Rise>
      </div>
    </section>
  );
}
