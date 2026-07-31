"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

type CursorState = "default" | "link" | "view" | "drag";

/**
 * Cursor — a machined dot that replaces the native pointer on fine-pointer
 * devices. Grows over interactive elements; shows a verb over project media
 * (set via data-cursor="view" on any ancestor). Blend-difference keeps it
 * legible across both chapters.
 */
export default function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [state, setState] = useState<CursorState>("default");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 55, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 900, damping: 55, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.setAttribute("data-cursor", "on");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setState((tagged.dataset.cursor as CursorState) || "link");
      } else if (el?.closest("a, button, [role='button'], summary")) {
        setState("link");
      } else {
        setState("default");
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveDoc = () => x.set(-100);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);

    return () => {
      document.documentElement.removeAttribute("data-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state === "view" ? 84 : state === "link" ? 44 : 10;
  const label = state === "view" ? "View" : state === "drag" ? "Drag" : null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: label ? "normal" : "difference",
        background: label ? "var(--gold)" : "#eaf0fb",
      }}
      animate={{
        width: size,
        height: size,
        scale: pressed ? 0.82 : 1,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
    >
      {label ? (
        <span className="voice-mono select-none" style={{ color: "#04070d" }}>
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}
