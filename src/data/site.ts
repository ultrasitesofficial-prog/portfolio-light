/**
 * Single source of truth for identity & contact.
 * Swap values here when the final brand lands — nothing else needs touching.
 */
export const site = {
  name: "UltraSite",
  founders: ["Mohamad Masri", "Khalil Badawi"],
  /** Two-line display split for stacked wordmark treatments. */
  wordmark: ["Ultra", "Site"],
  monogram: "U", // visible mark is <Logo/>; kept as a text fallback

  role: "Web design & development studio",
  tagline: "Precision-built websites for brands that can't afford to look ordinary.",
  email: "mohamadmasri085@gmail.com",
  location: "Beirut, Lebanon",
  region: "Working worldwide",
  coords: "33.8938° N — 35.5018° E",
  timezone: "Asia/Beirut",
  availability: "Booking founding clients",
  established: 2026,
  url: "https://ultrasite.dev", // placeholder — replace with final domain
  socials: [
    { label: "GitHub", handle: "@ultrasite", href: "https://github.com/" },
    { label: "LinkedIn", handle: "company/ultrasite", href: "https://linkedin.com/" },
    { label: "X / Twitter", handle: "@ultrasite_hq", href: "https://x.com/" },
  ],
  meta: {
    title: "UltraSite — Web design & development studio",
    description:
      "UltraSite is the studio of founders Mohamad Masri & Khalil Badawi — precision digital experiences built end-to-end: design, engineering, motion and WebGL.",
  },
} as const;
