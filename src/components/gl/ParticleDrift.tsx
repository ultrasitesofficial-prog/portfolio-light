"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleDrift — a shallow 3D field of drifting motes, hand-projected
 * (perspective divide, no library). Blue current with occasional golden
 * signals; the pointer tilts the whole field like a held instrument.
 * Canvas 2D, ~2KB: idles at zero offscreen, single static frame under
 * reduced motion, DPR-capped on phones.
 */
export default function ParticleDrift({
  count = 70,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = coarse ? Math.round(count * 0.6) : count;

    type P = { x: number; y: number; z: number; vx: number; vy: number; vz: number; gold: boolean };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const parts: P[] = Array.from({ length: N }, () => ({
      x: rand(-1, 1),
      y: rand(-1, 1),
      z: rand(0.35, 1),
      vx: rand(-0.02, 0.02),
      vy: rand(-0.014, 0.014),
      vz: rand(-0.008, 0.008),
      gold: Math.random() < 0.12,
    }));

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.35 : 1.75);
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* pointer tilt with inertia */
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!coarse && !reduced) window.addEventListener("pointermove", onMove, { passive: true });

    const BLUE = [169, 198, 242] as const; // periwinkle motes
    const GOLD = [232, 177, 78] as const; // golden signals

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const k = 1 - Math.pow(0.002, dt);
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;

      const F = 0.9; // focal length of the pretend camera
      for (const p of parts) {
        if (!reduced) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.z += p.vz * dt;
          if (p.x < -1.1 || p.x > 1.1) p.vx *= -1;
          if (p.y < -1.1 || p.y > 1.1) p.vy *= -1;
          if (p.z < 0.35 || p.z > 1) p.vz *= -1;
        }
        /* perspective divide + pointer parallax scaled by depth */
        const px = (p.x + cx * 0.12 * (1 - p.z)) / (p.z * F);
        const py = (p.y + cy * 0.12 * (1 - p.z)) / (p.z * F);
        const sx = (px * 0.5 + 0.5) * w;
        const sy = (py * 0.5 + 0.5) * h;
        if (sx < -8 || sx > w + 8 || sy < -8 || sy > h + 8) continue;

        const near = 1 - (p.z - 0.35) / 0.65; // 1 = closest
        const r = (p.gold ? 1.4 : 1.1) * (0.6 + near * 1.5) * dpr;
        const a = 0.12 + near * (p.gold ? 0.75 : 0.5);
        const [cr, cg, cb] = p.gold ? GOLD : BLUE;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.fill();
      }
    };

    let raf = 0, running = false, prev = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      draw(dt);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) draw(0); // one still frame

    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "10%" },
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : visible && start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
    };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
