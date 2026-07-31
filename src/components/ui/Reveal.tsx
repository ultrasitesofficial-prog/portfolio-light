"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/ease";
import type { JSX, ReactNode } from "react";

/**
 * RevealWords — masked word-by-word rise, the site's standard text entrance.
 * Words animate inside overflow-hidden slots so lines appear to be printed.
 * Pass `active` to drive it manually (hero waits for the preloader);
 * omit it to trigger on scroll into view.
 */
export function RevealWords({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
  duration = 1.1,
  active,
  once = true,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  active?: boolean;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag as "span"];

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const drive =
    active === undefined
      ? { whileInView: "show" as const, viewport: { once, margin: "-12% 0px" } }
      : { animate: active ? ("show" as const) : ("hide" as const) };

  return (
    <MotionTag className={className} aria-label={text} initial="hide" {...drive}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ marginBottom: "-0.12em", paddingBottom: "0.12em" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hide: { y: "110%", rotate: 2.5 },
              show: {
                y: "0%",
                rotate: 0,
                transition: { duration, ease: EASE, delay: delay + i * stagger },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}

/** Rise — quiet fade-and-rise for blocks. */
export function Rise({
  children,
  className,
  delay = 0,
  y = 28,
  active,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  active?: boolean;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const drive =
    active === undefined
      ? { whileInView: { opacity: 1, y: 0 }, viewport: { once, margin: "-10% 0px" } }
      : { animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y } };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...drive}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Rule — a hairline that draws itself in on view. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left bg-line ${className ?? ""}`}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}
