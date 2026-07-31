"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * ScrollBeam — the page's progress as a blue→gold current along the top edge.
 * Sits under the nav; purely decorative (the scrollbar remains the a11y truth).
 */
export default function ScrollBeam() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--peri-deep), var(--peri) 55%, var(--gold))",
        boxShadow: "0 0 12px var(--glow)",
      }}
    />
  );
}
