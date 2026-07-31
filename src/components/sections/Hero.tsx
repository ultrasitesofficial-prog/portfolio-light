"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Rise } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { useSiteReady } from "@/lib/ready";
import { scrollToHash } from "@/lib/hooks";
import { site } from "@/data/site";

const ContourField = dynamic(() => import("@/components/gl/ContourField"), { ssr: false });

/** Rotating circular badge — the scroll invitation. */
function SpinBadge() {
  return (
    <button
      type="button"
      onClick={() => scrollToHash("#work")}
      aria-label="Scroll to selected work"
      className="group relative block h-28 w-28"
    >
      <svg viewBox="0 0 112 112" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-ring" d="M 56,56 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <text className="voice-mono" fill="var(--fg)" style={{ fontSize: "10.5px", letterSpacing: "0.22em" }}>
          <textPath href="#badge-ring">selected work · selected work ·</textPath>
        </text>
      </svg>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg transition-transform duration-500 group-hover:translate-y-[calc(-50%+4px)]"
        style={{ background: "var(--fg)", color: "var(--bg)" }}
      >
        ↓
      </span>
    </button>
  );
}

export default function Hero() {
  const ready = useSiteReady();
  const reduced = useReducedMotion();
  const plate = site.name;

  return (
    <section id="top" data-chapter="paper" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* soft modular geometry */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
      >
        <motion.div
          className="blob"
          style={{
            width: "min(46vw, 34rem)",
            height: "min(46vw, 34rem)",
            left: "-10vw",
            top: "34%",
            borderRadius: "50%",
            opacity: 0.85,
          }}
          animate={reduced ? undefined : { y: [0, -18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="blob"
          style={{
            width: "min(38vw, 30rem)",
            height: "min(38vw, 30rem)",
            right: "-6vw",
            top: "8%",
            borderRadius: "0 0 0 100%",
            opacity: 0.75,
          }}
          animate={reduced ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        {/* the interactive survey layer, whisper-quiet on cream */}
        <ContourField className="h-full w-full" density={15} alpha={0.4} fade={[0.2, 0.16, 0.04, 0.04]} />
      </motion.div>

      <div className="relative flex flex-1 flex-col justify-center pb-8 pt-28 md:pt-32">
        {/* eyebrow */}
        <Rise active={ready} delay={0.15} y={16} className="container-x mb-8 text-center md:mb-12">
          <p className="voice-mono text-muted">
            {site.role} <span className="text-accent-2">·</span> est. {site.established}
          </p>
        </Rise>

        {/* the wordmark rolls past like a title card */}
        <h1 className="sr-only">
          {plate} — {site.role}
        </h1>
        <Rise active={ready} delay={0.3} y={26}>
          <div className="marquee overflow-hidden" aria-hidden="true">
            <div className="marquee-track items-baseline" style={{ animationDuration: "26s" }}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`voice-d1 whitespace-nowrap ${i > 0 ? "marquee-dup" : ""}`}>
                  {plate}
                  <span className="text-accent-2">.</span>
                  <span className="mx-[0.45em] align-middle text-accent" style={{ fontSize: "0.22em" }}>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Rise>

        {/* thesis */}
        <Rise active={ready} delay={0.5} className="container-x mt-10 md:mt-14">
          <p
            className="voice-d4 mx-auto max-w-[36ch] text-center"
            style={{ fontWeight: 520, textWrap: "balance" }}
          >
            We design and build custom digital experiences end-to-end — strategy, interface, motion
            and code — for brands that outgrew their templates.
          </p>
        </Rise>

        {/* actions */}
        <Rise
          active={ready}
          delay={0.68}
          className="container-x mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:mt-12"
        >
          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <Link
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#contact");
              }}
              className="plate-btn voice-mono w-full sm:w-auto"
            >
              Start a project
              <span aria-hidden="true" className="text-accent-2">→</span>
            </Link>
          </Magnetic>
          <p className="voice-mono flex items-center gap-2 text-muted">
            <span className="pulse-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </Rise>

        {/* the invitation */}
        <Rise active={ready} delay={0.85} className="mt-12 flex justify-center md:mt-16">
          <SpinBadge />
        </Rise>
      </div>

      {/* base meta strip */}
      <Rise active={ready} delay={1} y={12} className="container-x relative">
        <div className="hairline-t flex items-center justify-between pb-6 pt-4">
          <p className="voice-mono text-muted">
            {site.location.split(",")[0]}
            <span className="hidden sm:inline"> — {site.region.toLowerCase()}</span>
          </p>
          <p className="voice-mono hidden text-muted sm:block">Founded by Mohamad Masri &amp; Khalil Badawi</p>
          <p className="voice-mono text-muted">
            Avg. Lighthouse <span className="text-accent-2">97</span>
          </p>
        </div>
      </Rise>
    </section>
  );
}
