"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";

/**
 * EditionPreview — a browser-framed interface mockup of each edition, so the
 * Work grid shows the actual product instead of only the abstract cover.
 * Pure DOM/SVG with self-contained colors (no raster images), so it renders
 * identically on the cream (light) and graphite (dark) apps.
 */

type Chrome = { bg: string; bar: string; line: string; dot: string; url: string; label: string };

function Frame({ chrome, children }: { chrome: Chrome; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: chrome.bg }}>
      <div
        className="flex shrink-0 items-center gap-1.5 px-3 py-2"
        style={{ background: chrome.bar, borderBottom: `1px solid ${chrome.line}` }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ background: chrome.dot, opacity: 0.4 + i * 0.18 }} />
        ))}
        <span
          className="ml-2 flex-1 truncate rounded-md px-2.5 py-1 text-center font-mono text-[0.5rem] tracking-wider"
          style={{ background: chrome.line, color: chrome.url }}
        >
          {chrome.label}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* Light Edition — warm modular studio: cream ground, pine type, gold spark. */
function LightBody({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-4" style={{ color: "#1f3d34" }}>
      <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em]" style={{ color: "#1f3d34aa" }}>
        <span>UltraSite ®</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c99a3f" }} />
          Booking
        </span>
      </div>
      <div className="overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap font-display text-[clamp(1.5rem,6vw,2.75rem)] font-extrabold"
          animate={on ? { x: ["0%", "-50%"] } : {}}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex items-baseline">
              UltraSite<span style={{ color: "#c99a3f" }}>.</span>
              <span className="mx-3 text-[0.5em]" style={{ color: "#8b93d9" }}>✦</span>
              UltraSite<span style={{ color: "#c99a3f" }}>.</span>
              <span className="mx-3 text-[0.5em]" style={{ color: "#8b93d9" }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full px-3 py-1.5 font-mono text-[0.55rem] font-bold" style={{ background: "#1f3d34", color: "#faf3e9" }}>
          Start a project →
        </div>
        <div className="rounded-full border px-3 py-1.5 font-mono text-[0.55rem]" style={{ borderColor: "#1f3d3433", color: "#1f3d34aa" }}>
          Selected work
        </div>
      </div>
    </div>
  );
}

/* Dark Edition — engineer's dossier: graphite ground, bone text, bronze. */
function DarkBody({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-4" style={{ color: "#e7e1d5" }}>
      <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em]" style={{ color: "#e7e1d580" }}>
        <span>UltraSite</span>
        <span>Est. 2026</span>
      </div>
      <svg viewBox="0 0 200 34" className="h-7 w-full" preserveAspectRatio="none" aria-hidden>
        {[9, 18, 27].map((y, i) => (
          <motion.path
            key={y}
            d={`M0 ${y} Q50 ${y - 6} 100 ${y} T200 ${y}`}
            fill="none"
            stroke="#a58a5b"
            strokeOpacity={0.28 + i * 0.12}
            strokeWidth="1"
            strokeDasharray="220"
            animate={on ? { strokeDashoffset: [220, 0] } : {}}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.4, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <div className="font-display text-[clamp(1.4rem,5.5vw,2.6rem)] font-extrabold uppercase leading-[0.9]">
        Ultra<br />
        Site<span style={{ color: "#a58a5b" }}>.</span>
      </div>
      <div className="grid grid-cols-3 gap-2 font-mono text-[0.5rem] uppercase tracking-[0.14em]">
        {[
          ["Founders", "2"],
          ["Builds", "3"],
          ["Lighthouse", "97"],
        ].map(([k, v]) => (
          <div key={k} className="border-t pt-1.5" style={{ borderColor: "#e7e1d51f" }}>
            <div style={{ color: "#e7e1d566" }}>{k}</div>
            <div style={{ color: "#a58a5b" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Storytelling Edition — a character guide narrating with a speech bubble. */
function StoryBody({ on }: { on: boolean }) {
  return (
    <div className="relative flex h-full items-end gap-3 p-4" style={{ background: "#0b0b12" }}>
      <div className="absolute left-4 top-3 font-mono text-[0.5rem] uppercase tracking-[0.2em]" style={{ color: "#8a8aa0" }}>
        CH.03 — CASE FILES
      </div>
      <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full" style={{ border: "1px solid rgba(56,189,248,0.35)", background: "radial-gradient(circle at 40% 35%, rgba(30,64,255,0.5), rgba(56,189,248,0.15))" }}>
        <div className="flex gap-2">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="block h-2.5 w-2.5 rounded-full bg-white"
              animate={on ? { scaleY: [1, 1, 0.1, 1] } : {}}
              transition={{ duration: 3.2, repeat: Infinity, delay: 0.4 + i * 0.05, times: [0, 0.9, 0.95, 1] }}
            />
          ))}
        </div>
        <motion.span
          className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full font-mono text-[0.5rem] font-bold"
          style={{ background: "#ffd400", color: "#0b0b12" }}
          animate={on ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          {"</>"}
        </motion.span>
      </div>
      <motion.div
        className="mb-1 flex-1 rounded-2xl rounded-bl-sm p-3"
        style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
        animate={on ? { opacity: [0.5, 1], y: [8, 0] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3.4, repeatType: "reverse" }}
      >
        <div className="space-y-1.5">
          <div className="h-1.5 w-4/5 rounded" style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="h-1.5 w-3/5 rounded" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>
        <div className="mt-2 flex gap-1">
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="h-1 w-1 rounded-full"
              style={{ background: "#38bdf8" }}
              animate={on ? { y: [0, -2.5, 0] } : {}}
              transition={{ duration: 0.55, repeat: Infinity, delay: d * 0.12 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* Editorial Edition — a broadsheet: masthead rule, column grid, serif display. */
function EditorialBody({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col p-4" style={{ color: "#111111" }}>
      <div className="flex items-baseline justify-between border-b pb-1.5" style={{ borderColor: "#11111133" }}>
        <span className="font-display text-[0.7rem] font-extrabold uppercase tracking-[0.2em]">UltraSite</span>
        <span className="font-mono text-[0.45rem] uppercase tracking-[0.16em]" style={{ color: "#11111199" }}>
          No. 04 · 2026
        </span>
      </div>
      {/* strapline marquee — the paper's rolling strapline */}
      <div className="overflow-hidden border-b py-1" style={{ borderColor: "#11111120" }}>
        <motion.div
          className="flex whitespace-nowrap font-mono text-[0.45rem] uppercase tracking-[0.22em]"
          style={{ color: "#6b8fd9" }}
          animate={on ? { x: ["0%", "-50%"] } : {}}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <span key={k}>Strategy · Design · Motion · Code · Identity · Craft · Commerce · Speed ·&nbsp;</span>
          ))}
        </motion.div>
      </div>
      <div className="mt-2 leading-[0.86]">
        <span className="font-display text-[clamp(1.1rem,4.4vw,2rem)] font-extrabold uppercase">Beyond</span>{" "}
        <span className="text-[clamp(1.1rem,4.4vw,2rem)] italic" style={{ fontFamily: "Georgia, serif", color: "#6b8fd9" }}>
          ordinary
        </span>
        <div className="font-display text-[clamp(1.1rem,4.4vw,2rem)] font-extrabold uppercase">websites</div>
      </div>
      {/* Three-column body set. The rules are a repeating gradient rather than
          fixed rows so the columns fill whatever height the card gives them —
          this preview runs from a small grid tile up to a full case-study plate. */}
      <div className="mt-2 grid flex-1 grid-cols-3 gap-2 border-t pt-2" style={{ borderColor: "#11111133" }}>
        {[0, 1, 2].map((c) => (
          <div
            key={c}
            style={{
              backgroundImage: "repeating-linear-gradient(#11111126 0 2px, transparent 2px 5px)",
              // last line of each column stops short, like a real paragraph
              maskImage: "linear-gradient(#000 calc(100% - 5px), transparent 0)",
            }}
          />
        ))}
      </div>
      <div className="flex items-baseline justify-between border-t pt-1 font-mono text-[0.4rem] uppercase tracking-[0.16em]" style={{ borderColor: "#11111133", color: "#11111180" }}>
        <span>ultrasite.dev</span>
        <span>2026</span>
      </div>
    </div>
  );
}

/* Specimen Edition — one variable typeface; weight & width are the animation. */
function SpecimenBody({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-4" style={{ color: "#f2f0ff" }}>
      <div className="flex items-center justify-between font-mono text-[0.45rem] uppercase tracking-[0.2em]" style={{ color: "#b9b4e899" }}>
        <span>Mona Sans Variable</span>
        <span style={{ color: "#e8b64c" }}>wght 200→900</span>
      </div>
      {/* The specimen glyph breathing across both axes — it is the subject
          here, so it gets the whole middle of the plate. */}
      <div className="flex flex-1 items-center">
        <motion.div
          className="text-[clamp(2.75rem,13vw,7rem)] leading-[0.8]"
          style={{ fontStretch: "125%" }}
          animate={on ? { fontWeight: [250, 900, 250], fontStretch: ["75%", "125%", "75%"] } : {}}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Aa
        </motion.div>
      </div>
      <div className="space-y-1.5">
        <div className="flex gap-1">
          {[200, 400, 600, 800, 900].map((w, i) => (
            <motion.span
              key={w}
              className="h-1 flex-1 rounded-full"
              style={{ background: i === 4 ? "#e8b64c" : "#7d7ae8" }}
              animate={on ? { opacity: [0.25, 1, 0.25] } : {}}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="font-mono text-[0.45rem] uppercase tracking-[0.18em]" style={{ color: "#b9b4e880" }}>
          One family · two live axes
        </div>
      </div>
    </div>
  );
}

/* Coffee Shop (Copperline) — the roast ticket from the hero: a batch card
   straight off the roasting logbook. It rests tilted like a card dropped on
   the counter and squares up when the row activates. */
function CopperlineBody({ on }: { on: boolean }) {
  const rows: [string, string, boolean?][] = [
    ["Roasted", "Fri · Jun 20", true],
    ["Origin", "Ethiopia"],
    ["Process", "Washed"],
    ["Roast", "Medium"],
  ];
  return (
    <div className="relative grid h-full place-items-center p-4">
      {/* warm glow behind the ticket, like the hero's radial bloom */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, #c67a3e, transparent 65%)" }}
      />
      <motion.div
        className="relative w-[74%] max-w-[300px] rounded-xl border p-4"
        style={{
          color: "#f0e6d8",
          borderColor: "#f0e6d81f",
          background: "#241a15",
          boxShadow: "0 20px 44px -20px rgba(0,0,0,0.65)",
        }}
        animate={{ rotate: on ? 0 : -2.6, y: on ? -3 : 0, scale: on ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className="flex items-baseline justify-between border-b border-dashed pb-2" style={{ borderColor: "#f0e6d826" }}>
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em]" style={{ color: "#f0e6d866" }}>
            Today&apos;s roast
          </span>
          <span className="font-mono text-[0.5rem]" style={{ color: "#c67a3e" }}>
            CL-204
          </span>
        </div>

        <dl className="mt-2.5 space-y-1.5 font-mono text-[0.5rem]">
          {rows.map(([label, value, hi]) => (
            <div key={label} className="flex items-baseline justify-between gap-3">
              <dt className="uppercase" style={{ color: "#f0e6d866" }}>{label}</dt>
              <dd style={{ color: hi ? "#c67a3e" : "#f0e6d8" }}>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-2.5 border-t border-dashed pt-2.5" style={{ borderColor: "#f0e6d826" }}>
          <p className="mb-1.5 font-mono text-[0.45rem] uppercase tracking-[0.2em]" style={{ color: "#f0e6d866" }}>
            Cup notes
          </p>
          <div className="flex flex-wrap gap-1">
            {["Blueberry", "Cocoa", "Jasmine"].map((note) => (
              <span
                key={note}
                className="rounded-full px-1.5 py-0.5 font-mono text-[0.42rem]"
                style={{ background: "#8fae6a26", color: "#a6c586" }}
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Basalt — fine dining: the tasting menu with its ember burn-line. */
function BasaltBody({ on }: { on: boolean }) {
  const courses = ["Oyster · seawater ice", "Charred leek · bone", "Aged duck · ember"];
  return (
    <div className="flex h-full flex-col justify-between p-4" style={{ color: "#ebe3d8" }}>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.95rem] tracking-[0.08em]" style={{ fontFamily: "Georgia, serif" }}>
          BASALT
        </span>
        <span className="font-mono text-[0.45rem] uppercase tracking-[0.16em]" style={{ color: "#ebe3d866" }}>
          VII courses
        </span>
      </div>
      <div className="relative flex-1 py-2 pl-4">
        {/* ember line burning down the courses */}
        <div className="absolute bottom-2 left-1 top-2 w-px" style={{ background: "#ebe3d81f" }} />
        <motion.div
          className="absolute left-1 top-2 w-px"
          style={{ background: "linear-gradient(#e2603a, #f0a35e)", boxShadow: "0 0 6px #e2603a" }}
          animate={on ? { height: ["0%", "88%"] } : { height: "88%" }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <div className="flex h-full flex-col justify-around">
          {courses.map((c, i) => (
            <div key={c} className="flex items-center gap-2">
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ background: i === 0 ? "#e2603a" : "#ebe3d840" }}
              />
              <span className="truncate text-[0.5rem]" style={{ fontFamily: "Georgia, serif", color: "#ebe3d8bb" }}>
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-sm border px-2.5 py-1 text-center font-mono text-[0.45rem] uppercase tracking-[0.16em]" style={{ borderColor: "#e2603a66", color: "#e2603a" }}>
        Reserve a table
      </div>
    </div>
  );
}

/* Fast Food (Stackhouse) — the signature burger assembles on hover: each
   layer flies in from above and lands with an overshoot, bottom bun first,
   sesame crown last. At rest it sits fully stacked, so the non-hover and
   reduced-motion states read as a finished burger rather than loose parts. */
function StackhouseBody({ on }: { on: boolean }) {
  // Bottom-of-stack first so draw order == land order (later = drawn on top).
  const layers = [
    // heel bun
    <g key="heel">
      <rect x="47" y="83" width="66" height="10" rx="5" fill="#c97e26" />
      <rect x="47" y="83" width="66" height="4.5" rx="2.5" fill="#e0a24a" />
    </g>,
    // patty
    <rect key="patty" x="44" y="76" width="72" height="8" rx="3.5" fill="#4a2716" />,
    // cheese slice with drips
    <path
      key="cheese"
      d="M45 71 h70 v3.6 l-6 5 -5.5 -5 -6 5 -5.5 -5 -6 5 -5.5 -5 -6 5 -5.5 -5 -6 5 -5.5 -5 -5 0 z"
      fill="#f5c518"
    />,
    // lettuce ruffle — peeks a touch beyond the patty on both sides
    <path
      key="lettuce"
      d="M45 63 h70 v3 c-2.5 3 -7.5 3 -10 0 c-2.5 3 -7.5 3 -10 0 c-2.5 3 -7.5 3 -10 0 c-2.5 3 -7.5 3 -10 0 c-2.5 3 -7.5 3 -10 0 c-2.5 3 -7.5 3 -10 0 c-2.5 3 -7.5 3 -10 0 z"
      fill="#86c14e"
    />,
    // tomato
    <rect key="tomato" x="48" y="62" width="64" height="6" rx="3" fill="#d63a26" />,
    // sesame crown
    <g key="crown">
      <path d="M46 63 Q46 41 80 41 Q114 41 114 63 Z" fill="#e2a34a" />
      <ellipse cx="70" cy="54" rx="1.6" ry="1" fill="#fce8c0" transform="rotate(-18 70 54)" />
      <ellipse cx="82" cy="50" rx="1.6" ry="1" fill="#fce8c0" transform="rotate(12 82 50)" />
      <ellipse cx="92" cy="56" rx="1.6" ry="1" fill="#fce8c0" transform="rotate(-8 92 56)" />
      <ellipse cx="60" cy="58" rx="1.6" ry="1" fill="#fce8c0" transform="rotate(20 60 58)" />
    </g>,
  ];

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-4" style={{ color: "#f2b705" }}>
      {/* mustard bloom so the burger sits in warm light */}
      <div
        className="pointer-events-none absolute left-1/2 top-[54%] h-32 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-2xl"
        style={{ background: "radial-gradient(circle, #f2b705, transparent 68%)" }}
      />
      <div className="relative flex items-center justify-between font-mono text-[0.45rem] font-black uppercase tracking-[0.18em]">
        <span>Stackhouse</span>
        <span style={{ color: "#d92d0f" }}>{on ? "Building…" : "Hover to build"}</span>
      </div>

      <svg viewBox="0 0 160 104" className="relative my-1 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {layers.map((layer, i) => (
          <motion.g
            key={i}
            animate={on ? { y: [-54, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: on ? i * 0.09 : 0, ease: [0.34, 1.35, 0.64, 1] }}
          >
            {layer}
          </motion.g>
        ))}
      </svg>

      <div className="relative flex items-center justify-between">
        <span className="font-display text-[0.8rem] font-black uppercase leading-none">The OG Stack</span>
        <span
          className="rounded-sm px-2 py-0.5 font-mono text-[0.55rem] font-black"
          style={{ background: "#d92d0f", color: "#f2b705", transform: "rotate(-3deg)" }}
        >
          $9.50
        </span>
      </div>
    </div>
  );
}

/* Noor — concept gifts: three beams around a box that keeps unwrapping. */
function NoorBody({ on }: { on: boolean }) {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      {/* beams */}
      {[
        { c: "#a855f7", x: "22%" },
        { c: "#5eead4", x: "50%" },
        { c: "#f0abfc", x: "78%" },
      ].map((b, i) => (
        <motion.div
          key={b.c}
          className="absolute top-0 h-full w-16 -translate-x-1/2"
          style={{ left: b.x, background: `linear-gradient(${b.c}55, transparent 70%)`, filter: "blur(8px)" }}
          animate={on ? { opacity: [0.35, 0.85, 0.35] } : {}}
          transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute left-4 top-3 font-mono text-[0.45rem] uppercase tracking-[0.2em]" style={{ color: "#c4b5fd" }}>
        Noor · gifting
      </div>
      {/* The box: lid lifts, light pours out. Sized in vw-clamps like the rest
          of the suite's bodies so it holds up from a grid tile to a full plate. */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="absolute rounded-sm"
          style={{
            width: "clamp(2rem,5vw,4rem)",
            height: "clamp(1.5rem,4vw,3rem)",
            background: "linear-gradient(#f0abfc, #a855f7)",
            filter: "blur(7px)",
          }}
          animate={on ? { opacity: [0, 0.9, 0], y: ["0%", "-90%", "-130%"] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="relative rounded-[2px]"
          style={{ width: "clamp(2.9rem,7.4vw,5.6rem)", height: "clamp(0.6rem,1.6vw,1.25rem)", background: "#e9d5ff" }}
          animate={on ? { y: ["0%", "-95%", "0%"] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="mt-[1px] overflow-hidden rounded-[2px]"
          style={{
            width: "clamp(2.5rem,6.4vw,4.9rem)",
            height: "clamp(2rem,5.2vw,4rem)",
            background: "linear-gradient(#7c3aed, #4c1d95)",
          }}
        >
          <div className="mx-auto h-full" style={{ width: "14%", background: "#5eead4" }} />
        </div>
      </div>
    </div>
  );
}

/* Monolith — construction: the tower erects itself over survey grid + HUD.
   The scene is one viewBox'd SVG so it scales from the small Work card up to
   the full-bleed case-study plate; only the type stays in DOM. */
function MonolithBody({ on }: { on: boolean }) {
  const FLOORS = 7;
  const floors = Array.from({ length: FLOORS });
  return (
    <div className="relative h-full overflow-hidden" style={{ color: "#edeeef" }}>
      {/* survey grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#5b8dff14 1px, transparent 1px), linear-gradient(90deg, #5b8dff14 1px, transparent 1px)",
          backgroundSize: "7% 11%",
        }}
      />

      <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {/* ground line */}
        <line x1="6" y1="88" x2="154" y2="88" stroke="#edeeef" strokeOpacity="0.35" strokeWidth="0.6" />

        {/* blueprint ghost the tower fills into */}
        <rect x="64" y="34" width="32" height="54" fill="none" stroke="#5b8dff" strokeOpacity="0.5" strokeWidth="0.6" strokeDasharray="2 2" />

        {/* The tower: floors rise bottom-up, then windows wake before the reset.
            Each floor keeps its stagger *inside* the keyframe timeline — a
            `delay` only offsets the first pass, so on loop two the whole stack
            would pop at once instead of reading as floor-by-floor. */}
        {floors.map((_, i) => {
          const y = 88 - (i + 1) * 7;
          const rise = 0.06 + (i / FLOORS) * 0.46; // this floor's turn
          const lit = 0.68 + (i / FLOORS) * 0.13; // its lights come on
          return (
            <motion.g
              key={i}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
              animate={on ? { scaleY: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] } : { scaleY: 1, opacity: 1 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut", times: [0, rise, rise + 0.07, 0.9, 1] }}
            >
              <rect x="66" y={y} width="28" height="6" fill="#2b3037" />
              <rect x="66" y={y} width="28" height="1" fill="#ff5a1f" />
              <motion.rect
                x="88"
                y={y + 2.4}
                width="2.4"
                height="2.4"
                fill="#ffb466"
                animate={on ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
                transition={{ duration: 6, repeat: Infinity, times: [0, lit, lit + 0.04, 0.9, 1] }}
              />
            </motion.g>
          );
        })}

        {/* crane: mast, counter-jib and a jib that patrols the site */}
        <rect x="35.2" y="20" width="1.6" height="68" fill="#c94f16" />
        {/* view-box origin pins the pivot to the mast head; a fill-box origin
            would pivot on the group's bounding edge and swing the whole rig. */}
        <motion.g
          style={{ transformBox: "view-box", transformOrigin: "36px 23.9px" }}
          animate={on ? { rotate: [0, 9, 0, -6, 0] } : {}}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="36" y="23.2" width="30" height="1.4" fill="#c94f16" />
          <rect x="24" y="23.2" width="12" height="1.4" fill="#c94f16" opacity="0.75" />
          <rect x="58" y="24.6" width="0.5" height="7" fill="#c94f16" opacity="0.6" />
          <rect x="55.5" y="31.6" width="5.5" height="1.6" fill="#3a3f47" />
        </motion.g>
      </svg>

      <div className="absolute left-4 top-3 font-mono text-[0.45rem] uppercase tracking-[0.2em]" style={{ color: "#edeeef80" }}>
        S.01 — The build
      </div>
      <div className="absolute bottom-3 right-3 text-right font-mono">
        <div className="text-[0.4rem] uppercase tracking-[0.16em]" style={{ color: "#edeeef66" }}>
          Hook elev
        </div>
        <div className="text-[0.6rem] font-bold tabular-nums" style={{ color: "#ff5a1f" }}>
          +96.4 M
        </div>
      </div>
    </div>
  );
}

const EDITIONS: Record<string, { chrome: Chrome; Body: (p: { on: boolean }) => React.ReactNode }> = {
  "light-edition": {
    chrome: { bg: "#faf3e9", bar: "#f2e8d8", line: "#1f3d3320", dot: "#1f3d34", url: "#1f3d3499", label: "ultrasite.dev" },
    Body: LightBody,
  },
  "dark-edition": {
    chrome: { bg: "#141311", bar: "#1c1a17", line: "#e7e1d520", dot: "#a58a5b", url: "#e7e1d580", label: "ultrasite.dev — dark" },
    Body: DarkBody,
  },
  "storytelling-edition": {
    chrome: { bg: "#0b0b12", bar: "#131320", line: "#ffffff1a", dot: "#38bdf8", url: "#8a8aa0", label: "ultrasite.dev/story" },
    Body: StoryBody,
  },
  "editorial-edition": {
    chrome: { bg: "#f7f5f0", bar: "#eeebe4", line: "#11111120", dot: "#111111", url: "#11111199", label: "ultrasite.dev/editorial" },
    Body: EditorialBody,
  },
  "specimen-edition": {
    chrome: { bg: "#191934", bar: "#20204a", line: "#f2f0ff1f", dot: "#7d7ae8", url: "#b9b4e899", label: "ultrasite.dev/specimen" },
    Body: SpecimenBody,
  },
  "copperline-coffee": {
    chrome: { bg: "#1a1310", bar: "#241a15", line: "#f0e6d81f", dot: "#c67a3e", url: "#f0e6d880", label: "copperline.coffee" },
    Body: CopperlineBody,
  },
  "basalt-restaurant": {
    chrome: { bg: "#14100e", bar: "#1e1815", line: "#ebe3d81a", dot: "#e2603a", url: "#ebe3d880", label: "basalt.restaurant" },
    Body: BasaltBody,
  },
  "stackhouse-fast-food": {
    chrome: { bg: "#17130c", bar: "#221b10", line: "#f2b70522", dot: "#d92d0f", url: "#f2b70599", label: "stackhouse.rest" },
    Body: StackhouseBody,
  },
  "noor-gift-shop": {
    chrome: { bg: "#120a26", bar: "#1b0f36", line: "#ffffff1a", dot: "#a855f7", url: "#c4b5fd99", label: "noor.gift" },
    Body: NoorBody,
  },
  "monolith-construction": {
    chrome: { bg: "#0c0d0f", bar: "#15171a", line: "#edeeef1a", dot: "#ff5a1f", url: "#edeeef80", label: "monolith.build" },
    Body: MonolithBody,
  },
};

export default function EditionPreview({
  project,
  active = true,
  className,
}: {
  project: Pick<Project, "slug" | "name">;
  active?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const on = active && !reduced;
  const edition = EDITIONS[project.slug] ?? EDITIONS["light-edition"];
  const { chrome, Body } = edition;
  return (
    <div className={className} role="img" aria-label={`Interface preview of ${project.name}`}>
      <Frame chrome={chrome}>
        <Body on={on} />
      </Frame>
    </div>
  );
}
