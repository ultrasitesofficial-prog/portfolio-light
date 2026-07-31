"use client";

import { site } from "@/data/site";
import LocalTime from "@/components/ui/LocalTime";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="hairline-t bg-bg-deep" data-chapter="ink">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4 md:gap-6">
        <div>
          <p className="voice-mono mb-3 text-muted">© {year} {site.name}</p>
          <p className="voice-mono text-muted/70">
            Designed & built by hand.
            <br />
            No templates were harmed.
          </p>
        </div>

        <div>
          <p className="voice-mono mb-3 text-accent">Index</p>
          <ul className="space-y-1.5">
            {[
              ["Work", "/#work"],
              ["Services", "/#services"],
              ["Process", "/#process"],
              ["Studio", "/#studio"],
              ["FAQ", "/#faq"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <a className="voice-mono u-link inline-block py-1 text-muted hover:text-fg" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="voice-mono mb-3 text-accent">Elsewhere</p>
          <ul className="space-y-1.5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  className="voice-mono u-link inline-block py-1 text-muted hover:text-fg"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label} <span className="text-muted/50">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:items-end">
          <div className="text-left md:text-right">
            <p className="voice-mono mb-1 text-muted">
              {site.location} — <LocalTime className="tabular-nums" />
            </p>
            <p className="voice-mono text-muted/70">{site.coords}</p>
          </div>
          <Magnetic strength={0.3}>
            <button type="button" onClick={toTop} className="plate-btn voice-mono" aria-label="Back to top">
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </Magnetic>
        </div>
      </div>
      <div
        className="container-x hairline-t flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <p className="voice-mono text-muted/60">Portfolio — v2.0</p>
        <p className="voice-mono text-muted/60">Set in Plus Jakarta Sans & Hanken Grotesk</p>
      </div>
    </footer>
  );
}
