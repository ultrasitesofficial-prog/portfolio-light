"use client";

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import EditionPreview from "@/components/ui/EditionPreview";
import { useMediaQuery } from "@/lib/hooks";
import { EASE } from "@/lib/ease";
import type { Project } from "@/data/projects";

/* small geometric marks for the service pills — the modular alphabet */
const MARKS = ["✦", "✳", "●", "◆"] as const;

/**
 * WorkCard — one case-study row.
 * Desktop: hover activates (cover scale, accent title, arrow nudge) and the
 * cover tilts toward the cursor like a plate being examined.
 * Touch: crossing the viewport's center band activates the same choreography —
 * scrolling IS the hover — and the press compresses the card slightly.
 */
export default function WorkCard({ project: p, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const coarse = useMediaQuery("(pointer: coarse)");
  const inCenter = useInView(ref, { margin: "-38% 0px -38% 0px" });
  const [hovered, setHovered] = useState(false);
  const active = coarse ? inCenter : hovered;

  /* pointer-tracked tilt, sprung so it settles like a held object */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 24 });

  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (coarse) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => {
        setHovered(false);
        resetTilt();
      }}
      whileTap={{ scale: 0.988 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Link
        href={`/work/${p.slug}`}
        className="grid items-end gap-6 md:grid-cols-12 md:gap-10"
        aria-label={`${p.name} — ${p.tagline}`}
      >
        {/* cover — a soft plate that tilts under the cursor */}
        <div
          className={flip ? "md:order-2 md:col-span-7" : "md:col-span-7"}
          style={{ perspective: 1100 }}
          onPointerMove={onTilt}
        >
          <motion.div
            data-cursor="view"
            className="relative overflow-hidden rounded-3xl bg-panel"
            style={{
              rotateX: coarse ? 0 : rotateX,
              rotateY: coarse ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              boxShadow: active
                ? "0 36px 80px -28px rgba(143, 178, 239, 0.65), 0 8px 24px -12px rgba(23, 53, 43, 0.18)"
                : "0 10px 30px -18px rgba(23, 53, 43, 0.14)",
            }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.div
              className="aspect-[4/5] w-full sm:aspect-[4/3] md:aspect-[4/5] lg:aspect-[16/11]"
              animate={{ scale: active ? 1.04 : 1 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <EditionPreview project={p} active={active} className="h-full w-full" />
            </motion.div>
            {/* floating plates */}
            <div
              className="absolute left-5 top-5 flex items-center gap-3"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="chip voice-mono text-muted">Ref {p.index}</span>
            </div>
            <div className="absolute bottom-5 right-5" style={{ transform: "translateZ(30px)" }}>
              <span className="chip voice-mono text-muted">{p.year}</span>
            </div>
          </motion.div>
        </div>

        {/* text */}
        <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <p className="voice-mono mb-4 text-muted">{p.sector}</p>
          <h3
            className="voice-d2 mb-5 transition-colors duration-500"
            style={{ color: active ? "var(--accent)" : undefined }}
          >
            {p.name}
          </h3>
          <p className="voice-body mb-6 max-w-[38ch] text-muted">{p.tagline}</p>

          {/* what this engagement was, as modular pills */}
          <ul className="mb-8 flex flex-wrap gap-2">
            {p.scope.slice(0, 3).map((s, i) => (
              <li key={s} className="chip voice-mono text-muted">
                <span aria-hidden="true" className={i % 2 ? "text-accent-2" : "text-accent"} style={{ fontSize: "0.7rem" }}>
                  {MARKS[i % MARKS.length]}
                </span>
                {s}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <p className="voice-mono text-muted">
              <span className="text-accent-2">{p.outcomes[0].stat}</span> {p.outcomes[0].label}
            </p>
            <span className="voice-mono u-link">
              Case study{" "}
              <motion.span
                aria-hidden="true"
                className="inline-block"
                animate={{ x: active ? 6 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
