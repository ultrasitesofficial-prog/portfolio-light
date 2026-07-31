/**
 * Section content — services, process, stack, principles, about.
 * Client letters and the FAQ live in voices.ts.
 * PLACEHOLDER where marked; structured for painless replacement.
 */

export const services = [
  {
    index: "S.01",
    title: "Web design",
    blurb:
      "Art direction and interface design that gives a brand its own physics — type systems, layout grammar, and a look that survives grayscale.",
    deliverables: ["Art direction", "Design systems", "High-fidelity prototypes", "Design-to-dev specs"],
  },
  {
    index: "S.02",
    title: "Web development",
    blurb:
      "Production builds on Next.js and TypeScript — fast, accessible, maintainable, and boring in all the ways that matter under the hood.",
    deliverables: ["Next.js / React builds", "Headless CMS & commerce", "Performance budgets", "CI & deployment"],
  },
  {
    index: "S.03",
    title: "Creative development",
    blurb:
      "The layer most shops can't do: WebGL, shaders, scroll choreography and motion systems that run at 60fps and mean something.",
    deliverables: ["WebGL & GLSL", "Motion systems", "Scroll interaction", "3D product stages"],
  },
  {
    index: "S.04",
    title: "Continuing care",
    blurb:
      "Sites drift. We keep them sharp — monitoring performance, shipping iterations, and evolving the design as the business moves.",
    deliverables: ["Performance monitoring", "A/B iteration", "SEO upkeep", "Priority support"],
  },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    duration: "Week 0–1",
    body: "Interviews, analytics, and competitor teardown. We define what the site must do to a visitor — in one sentence — before a single pixel exists.",
    artifact: "Strategy brief · success metrics",
  },
  {
    n: "02",
    title: "Direct",
    duration: "Week 1–2",
    body: "Two or three sharply different art directions, argued with real content. You choose a direction, not a decoration.",
    artifact: "Direction boards · type & motion tests",
  },
  {
    n: "03",
    title: "Design",
    duration: "Week 2–4",
    body: "The chosen direction becomes a full system — every state, every breakpoint, every empty screen. Prototypes you can feel, not flat pictures.",
    artifact: "Design system · interactive prototype",
  },
  {
    n: "04",
    title: "Build",
    duration: "Week 4–7",
    body: "Design and code are the same discipline here, so nothing is lost in translation. Weekly staging links; performance measured from the first commit.",
    artifact: "Staging site · Lighthouse reports",
  },
  {
    n: "05",
    title: "Ship & sharpen",
    duration: "Week 8 →",
    body: "Launch is the midpoint. We watch real users, tighten what wobbles, and keep the site improving after the confetti settles.",
    artifact: "Launch · analytics review · care plan",
  },
] as const;

export const stack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "WebGL / GLSL",
  "Three.js", "Node.js", "Sanity", "Shopify", "PostgreSQL", "Vercel", "Figma", "Blender",
] as const;

export const principles = [
  {
    title: "Performance is design",
    body: "A beautiful site that stutters is a broken promise. Every effect ships with a frame budget.",
  },
  {
    title: "Grayscale first",
    body: "If a layout only works because of its colors, it doesn't work. Structure carries the design; color is the reward.",
  },
  {
    title: "Details are the product",
    body: "Easing curves, focus rings, empty states — the parts nobody lists are the parts everybody feels.",
  },
] as const;

export const aboutManifesto = [
  "UltraSite is a two-founder studio — Mohamad Masri and Khalil Badawi — a developer who designs and a designer who ships. We build websites end-to-end: strategy, art direction, interface, code and motion, with nothing lost in handoff because there is no handoff.",
  "We're new, and we say so. The studio has no client roster yet — what it has is proof: three complete portfolio editions, designed and engineered in-house, filed under Selected work. That's the standard every engagement will be held to.",
] as const;

export const facts = [
  { k: "Founded", v: "2026" },
  { k: "Founders", v: "2" },
  { k: "In-house builds", v: "3" },
  { k: "Avg. Lighthouse", v: "97" },
] as const;
