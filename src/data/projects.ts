/**
 * Case studies — UltraSite's in-house experience. The studio is new and has
 * no client engagements yet, so the case files are the three portfolio
 * editions the founders designed and engineered end-to-end. Replace and
 * extend with real client work as it ships.
 *
 * `tint` is a vibrant hue used by the generative cover art and case
 * study accents — keep every tint inside the blue/gold brand family.
 */

export type Project = {
  slug: string;
  index: string;
  name: string;
  client: string;
  sector: string;
  year: string;
  tagline: string;
  scope: string[];
  stack: string[];
  tint: string; // hsl accent, kept desaturated
  seed: number; // drives the generative cover composition
  cover: "arcs" | "columns" | "terrain" | "orbits";
  overview: string[];
  challenge: string;
  approach: string[];
  outcomes: { stat: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "light-edition",
    index: "01",
    name: "Light Edition",
    client: "UltraSite — in-house",
    sector: "Studio portfolio",
    year: "2026",
    tagline: "The modular studio site you are reading right now.",
    scope: ["Art direction", "Design system", "Next.js build", "Custom WebGL"],
    stack: ["Next.js 16", "Tailwind CSS v4", "Motion", "Lenis", "GLSL"],
    tint: "40 78% 52%",
    seed: 7,
    cover: "arcs",
    overview: [
      "UltraSite launched with no client list, so the first brief was our own: build the site that sells the standard. The Light Edition is a warm modular studio language — cream paper, deep pine type, periwinkle geometry, one gold spark — and it is the site you are on.",
      "Everything on screen is drawn, not photographed: the hero's interactive contour field is a hand-rolled WebGL shader with zero dependencies, and every case cover is a generative SVG plate seeded per project.",
    ],
    challenge:
      "Proving a new studio's craft with no client work to point at. The site itself had to be the case study — fast, accessible, and detailed enough to survive a technical buyer's inspection.",
    approach: [
      "A two-chapter material system — paper and ink — that flips the whole document's theme as sections cross mid-viewport, driven by design tokens so the brand is a one-file change.",
      "A ~6KB custom WebGL contour renderer instead of a 3D engine, with pointer pressure on desktop and drag + scroll-velocity response on touch, idling at zero when offscreen.",
      "No raster images anywhere: generative SVG covers, variable subset fonts, and a frame budget on every effect — measured, not promised.",
    ],
    outcomes: [
      { stat: "97", label: "average Lighthouse, every page" },
      { stat: "0", label: "raster images shipped" },
      { stat: "~6KB", label: "WebGL layer, zero dependencies" },
    ],
    liveUrl: "#",
  },
  {
    slug: "dark-edition",
    index: "02",
    name: "Dark Edition",
    client: "UltraSite — in-house",
    sector: "Studio portfolio",
    year: "2026",
    tagline: "The same architecture, re-cut as an engineer's dossier.",
    scope: ["Design tokens", "Theming system", "Typography", "Parallel deploy"],
    stack: ["Next.js 16", "Tailwind CSS v4", "Motion", "Lenis", "GLSL"],
    tint: "18 72% 58%",
    seed: 41,
    cover: "terrain",
    overview: [
      "One question drove the second build: how much of a brand can live in tokens alone? The Dark Edition answers it — graphite ground, bone text, aged bronze accent — an engineer's dossier cut from the exact same cloth as the Light Edition.",
      "The two sites share a byte-for-byte identical file tree. Only the token sheet, typography and component styling differ, so every behaviour fix lands in both editions at once.",
    ],
    challenge:
      "Designing a system rigorous enough that two opposite visual languages — warm modular studio and graphite dossier — could run on one codebase without a single structural fork.",
    approach: [
      "Semantic design tokens as the only styling contract: components read --bg, --fg, --accent and friends, never a colour, so the whole personality lives in globals.css.",
      "A shared easing vocabulary and chapter system, proving motion and structure are brand-independent.",
      "Deployed as its own project on its own port — two complete portfolios maintained for the price of one architecture.",
    ],
    outcomes: [
      { stat: "1:1", label: "file-tree parity with Light" },
      { stat: "2", label: "complete brands, one codebase" },
      { stat: "1 file", label: "holds the entire visual identity" },
    ],
    liveUrl: "#",
  },
  {
    slug: "storytelling-edition",
    index: "03",
    name: "Storytelling Edition",
    client: "UltraSite — in-house",
    sector: "Interactive narrative",
    year: "2025",
    tagline: "A portfolio narrated by five original animated characters.",
    scope: ["Narrative design", "Character animation", "3D scene", "Procedural audio"],
    stack: ["Next.js 15", "Three.js / R3F", "GSAP", "Zustand", "Tailwind CSS v4"],
    tint: "222 78% 68%",
    seed: 21,
    cover: "orbits",
    overview: [
      "The third build asks what a portfolio could be if it behaved like a story. Visitors choose one of five original characters — a sardonic dev, a serene AI, a retro game sprite, a craft-obsessed artist, a literal-minded robot — and their guide narrates the site chapter by chapter.",
      "Under the hood it is a full narrative engine: a scripted dialogue system per character, a shared life rig for gaze and blinking, a Three.js hero scene, and voices synthesised in WebAudio — no audio files at all.",
    ],
    challenge:
      "Making a gimmick-proof guide: five distinct personalities, timed to scroll, that stay charming on the tenth visit, respect reduced motion, and never block the content they narrate.",
    approach: [
      "A chaptered scroll spine — prologue to epilogue — where every guide line is data, not markup: one dialogue file scripts all five characters across nine chapters.",
      "A shared 'life rig' hook gives every character gaze-tracking, blinks and idle fidgets from one implementation, so personality lives in the art, not duplicated code.",
      "Procedural WebAudio voices, muted until opted in, plus easter eggs — a Konami code, a five-tap monogram — that reward the curious without taxing the rest.",
    ],
    outcomes: [
      { stat: "5", label: "original animated guides" },
      { stat: "9", label: "narrated chapters" },
      { stat: "0", label: "audio files — voices are procedural" },
    ],
    liveUrl: "#",
  },
  {
    slug: "editorial-edition",
    index: "04",
    name: "Editorial Edition",
    client: "UltraSite — in-house",
    sector: "Studio portfolio",
    year: "2026",
    tagline: "The suite re-set as a broadsheet — beyond ordinary websites.",
    scope: ["Editorial art direction", "Type system", "Next.js build", "Motion"],
    stack: ["Next.js 16", "Tailwind CSS v4", "Motion", "Archivo", "Fraunces"],
    tint: "222 70% 62%",
    seed: 12,
    cover: "columns",
    overview: [
      "The fourth edition re-cuts the studio site as a print broadsheet. Where the other editions lead with material or narrative, this one leads with the page: Archivo for the masthead, Fraunces for the display serif, Fragment Mono for the captions and rules — the layout does the talking.",
      "It is the same UltraSite content re-argued in an editorial grammar — manifesto, services, work, process, testimonials — laid on a strict column grid with hairline rules and a marquee that reads like a paper's strapline: strategy, design, motion, code, identity, craft, commerce, speed.",
    ],
    challenge:
      "Proving the studio's range: that the same voice can carry a warm modular site, an engineer's dossier, and now a disciplined editorial broadsheet without repeating a single layout.",
    approach: [
      "A column-first grid with Archivo / Fraunces / Fragment Mono doing the heavy lifting, so hierarchy reads before a single accent colour is spent.",
      "A velocity-reactive strapline marquee and section reveals tuned to feel like a paper turning, not a web page scrolling.",
      "Shared content contract with the rest of the suite — one set of words, four completely different typographic arguments.",
    ],
    outcomes: [
      { stat: "3", label: "typefaces carry the entire identity" },
      { stat: "4th", label: "edition on the shared content spine" },
      { stat: "0", label: "stock imagery — type is the art" },
    ],
    liveUrl: "#",
  },
  {
    slug: "specimen-edition",
    index: "05",
    name: "Specimen Edition",
    client: "UltraSite — in-house",
    sector: "Studio portfolio",
    year: "2026",
    tagline: "A type-specimen portfolio built entirely from one variable typeface.",
    scope: ["Type-specimen design", "Variable-font motion", "Next.js build", "Design tokens"],
    stack: ["Next.js 15", "Tailwind CSS v4", "Motion", "Lenis", "Mona Sans"],
    tint: "236 64% 60%",
    seed: 33,
    cover: "arcs",
    overview: [
      "The fifth edition is a type specimen that happens to be a portfolio. Deep indigo fields, off-white type, lavender body copy, a periwinkle accent and one gold spark — flat poster colour, hairline rules, and Mona Sans's own weight and width axes doing all the animation work.",
      "Self-hosted Mona Sans variable (weight + width) under the SIL Open Font License drives every transition: headlines stretch and thicken on scroll instead of relying on a motion library to fake it.",
    ],
    challenge:
      "Building a whole design language out of a single variable typeface — no illustration, no photography, no second family — that still feels like a distinct edition beside the others.",
    approach: [
      "Variable-axis motion as the core idiom: weight and width interpolate on scroll and hover, so the typeface itself is the interaction layer.",
      "A flat poster palette and hairline rules keep everything on one visual plane, letting the type carry all the hierarchy.",
      "Same section architecture and content as the suite, self-hosted fonts via Fontsource for zero external requests.",
    ],
    outcomes: [
      { stat: "1", label: "variable typeface, two live axes" },
      { stat: "SIL OFL", label: "self-hosted, no external font calls" },
      { stat: "5th", label: "edition, one shared codebase family" },
    ],
    liveUrl: "#",
  },
  {
    slug: "copperline-coffee",
    index: "06",
    name: "Coffee Shop",
    client: "Atelier templates",
    sector: "Copperline · café template",
    year: "2026",
    tagline: "An editorial artisan-roaster template with live ordering over WhatsApp.",
    scope: ["Template product design", "Config-driven build", "Order builder", "Owner dashboard"],
    stack: ["Next.js 16", "Tailwind CSS v4", "Motion", "Fraunces", "IBM Plex Mono"],
    tint: "28 62% 52%",
    seed: 61,
    cover: "columns",
    overview: [
      "Copperline is the café entry in the Atelier template line: a dark-roast editorial storefront on a Fraunces / Karla / IBM Plex Mono type system, with a live order builder, table booking, and an owner dashboard.",
      "It is a rebrand-in-15-minutes product — every piece of business data lives in three config files (site, menu, content); search the repo for the demo name and every hit is inside src/config or the README.",
    ],
    challenge:
      "Giving small roasters an editorial, high-craft storefront and real ordering without a backend, a POS integration, or a fortnight of setup.",
    approach: [
      "A cart → customer details → formatted message → wa.me checkout flow, so orders land in the owner's WhatsApp with zero server.",
      "Config-only content: name, palette, hours, delivery zones, menu, offers and reviews all edited in src/config, fonts swapped in one file.",
      "Built on the shared @atelier/core package so fixes and primitives are common across the whole template line.",
    ],
    outcomes: [
      { stat: "~15 min", label: "to rebrand for a new client" },
      { stat: "3", label: "config files hold all business data" },
      { stat: "0", label: "backend — checkout rides WhatsApp" },
    ],
    liveUrl: "#",
  },
  {
    slug: "basalt-restaurant",
    index: "07",
    name: "Restaurant",
    client: "Atelier templates",
    sector: "Basalt · fine-dining template",
    year: "2026",
    tagline: "An ember-fired fine-dining template built around a tasting-menu journey.",
    scope: ["Template product design", "Scroll journey", "Reservation wizard", "Owner dashboard"],
    stack: ["Next.js 16", "Tailwind CSS v4", "Motion", "Cormorant", "Outfit"],
    tint: "16 68% 54%",
    seed: 74,
    cover: "terrain",
    overview: [
      "Basalt is the fine-dining template: a stone-and-ember storefront on a Cormorant / Outfit type system, anchored by a seven-course tasting-menu journey that scrubs an ember line down the page as you scroll.",
      "It pairs the tasting narrative with a three-step reservation wizard, à la carte takeaway over WhatsApp, and an owner dashboard that includes a live 86 list.",
    ],
    challenge:
      "Translating the ceremony of a tasting menu into a web experience while still handling the unglamorous jobs — bookings, takeaway orders, and sold-out items.",
    approach: [
      "A signature scroll-driven tasting journey: courses as an ordered sequence with an ember burn-line tracking progress.",
      "A three-step reservation wizard with seatings defined in one component, plus WhatsApp checkout for à la carte takeaway.",
      "Config-driven like the whole line — courses, pricing, accolades, reviews and copy edited in src/config, fonts swapped in one file.",
    ],
    outcomes: [
      { stat: "7", label: "course tasting journey, scroll-scored" },
      { stat: "3", label: "step reservation wizard" },
      { stat: "86", label: "list built into the owner dashboard" },
    ],
    liveUrl: "#",
  },
  {
    slug: "stackhouse-fast-food",
    index: "08",
    name: "Fast Food",
    client: "Atelier templates",
    sector: "Stackhouse · quick-service template",
    year: "2026",
    tagline: "A loud poster-board smash-burger template with a scroll-built blueprint.",
    scope: ["Template product design", "GSAP scroll sequence", "WebGL shader", "Combo builder"],
    stack: ["Next.js 16", "Tailwind CSS v4", "GSAP", "Lenis", "WebGL"],
    tint: "44 82% 54%",
    seed: 88,
    cover: "arcs",
    overview: [
      "Stackhouse is the counter-service template: a mustard-wall, marker-black, ketchup-shout poster built for burger joints, shawarma stands, chicken shops and snack counters that live on WhatsApp orders.",
      "Its centrepiece is a pinned, scroll-scrubbed GSAP sequence where the signature burger assembles layer by layer — squash-and-stretch landings, a cheese-melt path morph, a sesame pop, a price-stamp payoff — over a hand-written WebGL griddle-heat shader.",
    ],
    challenge:
      "Making a fast-food site feel as loud and appetising as the food while keeping ordering frictionless and honouring reduced-motion visitors.",
    approach: [
      "A pinned GSAP blueprint sequence and a WebGL fragment shader for griddle heat, with Lenis smooth scroll synced to ScrollTrigger.",
      "A combo builder with variants, extras and spice levels feeding a WhatsApp checkout — no backend required.",
      "A full reduced-motion path (static burger diagram, no pin, no shader loop) and a first-visit-only boot curtain that repeat visits skip before first paint.",
    ],
    outcomes: [
      { stat: "1", label: "scroll-scrubbed burger build sequence" },
      { stat: "100%", label: "reduced-motion fallback coverage" },
      { stat: "0", label: "backend — combos check out on WhatsApp" },
    ],
    liveUrl: "#",
  },
  {
    slug: "noor-gift-shop",
    index: "09",
    name: "Gift Shop",
    client: "Atelier templates",
    sector: "Noor · concept-retail template",
    year: "2026",
    tagline: "A luminous gift-studio template with a real-time 3D scroll-unwrap.",
    scope: ["Template product design", "React Three Fiber hero", "Holographic UI", "Gifting concierge"],
    stack: ["Next.js 16", "React Three Fiber", "drei", "GSAP", "Lenis"],
    tint: "268 60% 64%",
    seed: 96,
    cover: "orbits",
    overview: [
      "Noor is the concept-gift template: a deep space-violet room lit by three beams — violet, mint, holo pink — around a real-time 3D gift box that unwraps as you scroll. Built for gift shops, concept stores and florists whose product is the moment it arrives.",
      "The pinned React Three Fiber hero uses a procedural box (no model files): ribbons slide off, the lid lifts, and a column of light and sparks pours out in sync with scroll, with holographic product cards and breathing aurora fields around it.",
    ],
    challenge:
      "Delivering a genuine 3D unwrap moment that stays fast, accessible and SSR-safe — and still leaves a shop with real ordering.",
    approach: [
      "A DPR-capped, client-only R3F canvas with an SSR poster fallback that sleeps when offscreen; reduced motion renders the box opened and glowing as a static scene.",
      "Holographic spring-tilt product cards and aurora gradient fields for the luminous concept-store feel.",
      "A WhatsApp gifting concierge and config-driven content, consistent with the rest of the Atelier line.",
    ],
    outcomes: [
      { stat: "3D", label: "procedural gift box, zero model files" },
      { stat: "SSR", label: "safe — poster fallback, DPR-capped canvas" },
      { stat: "0", label: "backend — gifting runs over WhatsApp" },
    ],
    liveUrl: "#",
  },
  {
    slug: "monolith-construction",
    index: "10",
    name: "Construction",
    client: "Atelier templates",
    sector: "Monolith · construction template",
    year: "2026",
    tagline: "A cinematic construction-group template with a scroll-built 3D tower.",
    scope: ["Template product design", "WebGL scroll cinema", "Interactive 3D district", "Drawing-set motion"],
    stack: ["Next.js 16", "React Three Fiber", "drei", "GSAP", "Lenis"],
    tint: "210 66% 56%",
    seed: 103,
    cover: "terrain",
    overview: [
      "Monolith is the construction/engineering template: a dark site that reads like a set of construction documents coming to life — DIN-condensed headlines, mono spec readouts, and colour that encodes state (blueprint blue for the unbuilt, safety orange for work in progress, warm light for the delivered).",
      "Its signature is a procedural WebGL tower that erects itself across a 500vh scroll — blueprint ghost to structural steel to slip-form core to curtain-wall glass, delivered at dusk with windows waking floor by floor — plus an interactive city-model portfolio you can orbit and enter.",
    ],
    challenge:
      "Conveying the scale and rigour of a construction group on the web without stock site photos, while keeping a heavy 3D experience performant and reduced-motion friendly.",
    approach: [
      "A crane-dolly WebGL build sequence over 500vh and an interactive district — drag to orbit, toggle day/night, enter any building for its dossier — every canvas sleeping when offscreen.",
      "A drawing-set motion language: state-encoded colour, a pinned cross-section that draws itself through eight delivery phases, and velocity-reactive discipline marquees.",
      "Config-driven content and the shared @atelier/core foundation, with reduced-motion and offscreen-sleep budgets on every effect.",
    ],
    outcomes: [
      { stat: "500vh", label: "scroll erects the tower, dawn to dusk" },
      { stat: "0", label: "3D model files — every mesh is procedural" },
      { stat: "8", label: "delivery phases in the method section" },
    ],
    liveUrl: "#",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
