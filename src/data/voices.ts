/**
 * The correspondence file (letters) and the questions file (FAQ).
 * Deliberately separate from content.ts: this file is the one that grows
 * as real client letters and real questions arrive, without touching the
 * rest of the site's copy.
 *
 * UltraSite is a new studio with no client engagements yet, so the letters
 * are signed by the founders — honestly — with a sheet reserved for the
 * first real client. Replace and extend as real correspondence arrives.
 */

export type Letter = {
  /** Sender's role and organisation — the FROM line. */
  from: string;
  /** What the engagement was — the RE: line. */
  re: string;
  /** Filing date shown in the letter head. */
  date: string;
  /** The quote itself. */
  text: string;
  /** Signature line. */
  signed: string;
};

export const letters: readonly Letter[] = [
  {
    from: "Mohamad Masri, Co-founder — UltraSite",
    re: "Why the studio exists",
    date: "Jul 2026",
    text:
      "UltraSite opened with zero clients and three finished builds. We would rather show you the standard before the first invoice exists — everything on this site was designed and engineered end-to-end by the two of us.",
    signed: "Mohamad Masri",
  },
  {
    from: "Khalil Badawi, Co-founder — UltraSite",
    re: "The standard we hold",
    date: "Jul 2026",
    text:
      "New studio, old-fashioned discipline: performance budgets, accessibility, and the details nobody lists but everybody feels. The three editions in Selected work are our proof of work — judge us on them.",
    signed: "Khalil Badawi",
  },
  {
    from: "Reserved — your organisation",
    re: "The first client engagement",
    date: "—",
    text:
      "No client letters yet, and we won't invent them. This sheet is reserved for UltraSite's first client — the builds above show the standard the letter will be written about. It could be yours.",
    signed: "The founders",
  },
];

export type Faq = {
  q: string;
  a: string;
  /** Optional mono spec chips rendered under the answer. */
  spec?: readonly string[];
};

/* PLACEHOLDER pricing & figures — set real numbers before launch. */
export const faqs: readonly Faq[] = [
  {
    q: "What does a website like this cost?",
    a: "Most engagements land between $8,000 and $40,000. A focused marketing site sits at the lower end; a full design-and-build program with custom interaction work at the upper. You get a fixed quote after one call and a short brief — no meter running, no surprise invoices.",
    spec: ["Typical range $8k–$40k", "Fixed quote, never hourly"],
  },
  {
    q: "How long will it take?",
    a: "Eight weeks is the honest median for a full design-and-build — the Process section above is a real calendar, not a diagram. Smaller scopes ship in four to six. You see a staging link every week from the first one.",
    spec: ["Median 8 weeks", "Weekly staging links"],
  },
  {
    q: "You're a brand-new studio. Isn't that a risk?",
    a: "UltraSite is new; the work isn't hypothetical. Every build on this site — including the three portfolio editions under Selected work — was designed and engineered end-to-end by the founders. The practical risks are covered the boring way: everything lives in version control, staging is always current, and you own the repository from day one.",
  },
  {
    q: "Can you work with our existing site or brand?",
    a: "Yes — redesigns start with a teardown of what you have: analytics, content, what's earning its keep and what isn't. Anything that works survives. Anything that doesn't gets rebuilt with a reason attached.",
  },
  {
    q: "Who owns the work when we're done?",
    a: "You do — code, design files, accounts, domain, all of it. The repository transfers with the final invoice, documented well enough that any competent team could pick it up. Nothing about your site is hostage to our calendar.",
  },
  {
    q: "What do you need from us to start?",
    a: "Three things: someone empowered to make decisions, access to whatever content and analytics exist, and one sentence describing what the site must do to a visitor. If the content isn't written yet, we write it together during Discover — that's what week zero is for.",
  },
  {
    q: "What happens after launch?",
    a: "Launch is the midpoint, not the finish. Every build includes a post-launch review of real user behaviour, and clients can stay on a care plan — performance monitoring, iterations, and the founders on call as the business moves.",
  },
  {
    q: "Our budget is smaller than your range. Should we still write?",
    a: "Yes. Worst case, we'll tell you plainly what we'd cut to make the number work — or point you to someone right-sized for the job. A scope conversation costs nothing and we'd rather you ask.",
  },
];
