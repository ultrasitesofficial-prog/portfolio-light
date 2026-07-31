import SectionHead from "@/components/ui/SectionHead";
import { RevealWords, Rise } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Wordmark from "@/components/ui/Wordmark";
import ParticleDrift from "@/components/gl/ParticleDrift";
import { aboutManifesto, facts, principles } from "@/data/content";
import { site } from "@/data/site";

/**
 * Studio — the founders behind the work, back in the ink chapter.
 * The "portrait" is a spec plate until a real photograph exists;
 * swap the aside's contents for an <Image> when ready.
 */
export default function Studio() {
  return (
    <section id="studio" data-chapter="ink" className="relative overflow-hidden py-24 md:py-36">
      {/* night sky behind the operator — drifting motes with pointer tilt */}
      <div className="absolute inset-0" aria-hidden="true">
        <ParticleDrift className="h-full w-full" count={70} />
      </div>
      <div className="container-x relative">
        <SectionHead index="04" label="The studio" meta={site.location} />

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2 className="voice-d2 mb-10 max-w-[18ch]">
              <RevealWords text="Small studio. No telephone game." />
            </h2>
            {aboutManifesto.map((para, i) => (
              <Rise key={i} delay={0.1 + i * 0.08}>
                <p className="voice-body mb-6 max-w-[58ch] text-muted">{para}</p>
              </Rise>
            ))}
          </div>

          {/* spec plate — replace with a portrait when the brand lands */}
          <Rise delay={0.2} className="md:col-span-5">
            <figure
              className="live-border flex h-full flex-col justify-between rounded-3xl bg-panel p-6 md:p-8"
              style={{ border: "1px solid var(--line)" }}
            >
              <div className="flex items-start justify-between">
                <p className="voice-mono text-muted">Fig. 04-A</p>
                <p className="voice-mono text-muted">The founders</p>
              </div>
              <Wordmark className="mx-auto my-12 h-16 text-accent" decorative />
              <figcaption className="sr-only">Specification plate for {site.name}</figcaption>
              <dl className="grid grid-cols-2 gap-x-6">
                {facts.map((f) => (
                  <div key={f.k} className="hairline-t flex items-baseline justify-between py-3">
                    <dt className="voice-mono text-muted">{f.k}</dt>
                    <dd className="voice-mono">
                      <CountUp value={f.v} />
                    </dd>
                  </div>
                ))}
              </dl>
            </figure>
          </Rise>
        </div>

        {/* principles */}
        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-6">
          {principles.map((p, i) => (
            <Rise key={p.title} delay={i * 0.08}>
              <div className="hairline-t pt-5">
                <p className="voice-mono mb-3 text-accent">P.{String(i + 1).padStart(2, "0")}</p>
                <h3 className="voice-d4 mb-3">{p.title}</h3>
                <p className="voice-body text-muted">{p.body}</p>
              </div>
            </Rise>
          ))}
        </div>

      </div>
    </section>
  );
}
