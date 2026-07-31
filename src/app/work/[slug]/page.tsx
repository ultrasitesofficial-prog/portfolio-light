import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import EditionPreview from "@/components/ui/EditionPreview";
import { RevealWords, Rise, Rule } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — case study`,
    description: project.tagline,
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* title block */}
      <header data-chapter="paper" className="container-x pb-16 pt-36 md:pb-24 md:pt-44">
        <Rise y={12}>
          <Link href="/#work" className="voice-mono u-link text-muted hover:text-fg">
            <span aria-hidden="true">←</span> Index / all work
          </Link>
        </Rise>

        <h1 className="voice-d1 mt-10">
          <RevealWords text={project.name} active />
        </h1>
        <p className="voice-d4 mt-6 max-w-[34ch] text-muted">
          <RevealWords text={project.tagline} active delay={0.25} stagger={0.02} />
        </p>

        {/* spec table */}
        <Rise delay={0.4}>
          <dl className="mt-14 grid grid-cols-2 gap-x-6 md:grid-cols-4">
            {[
              ["Client", project.client],
              ["Sector", project.sector],
              ["Year", project.year],
              ["Reference", `No. ${project.index}`],
            ].map(([k, v]) => (
              <div key={k} className="hairline-t py-4">
                <dt className="voice-mono mb-2 text-muted">{k}</dt>
                <dd className="voice-mono">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="hairline-t grid gap-6 py-4 md:grid-cols-2">
            <div>
              <p className="voice-mono mb-3 text-muted">Scope</p>
              <ul className="flex flex-wrap gap-2">
                {project.scope.map((s) => (
                  <li key={s} className="chip voice-mono">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="voice-mono mb-3 text-muted">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip voice-mono text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Rise>
      </header>

      {/* cover */}
      <div data-chapter="paper" className="container-x">
        <Rise>
          <div
            className="relative overflow-hidden rounded-3xl bg-panel"
            style={{ boxShadow: "0 24px 60px -32px rgba(23, 53, 43, 0.25)" }}
          >
            <div className="aspect-[4/5] w-full sm:aspect-[16/10]">
              <EditionPreview project={project} className="h-full w-full" />
            </div>
            <p className="voice-mono absolute left-4 top-4 text-muted">
              Ref {project.index} — interface preview
            </p>
          </div>
        </Rise>
      </div>

      {/* overview */}
      <section data-chapter="paper" className="container-x py-20 md:py-28">
        <Rule />
        <div className="grid gap-8 pt-4 md:grid-cols-12">
          <p className="voice-mono text-muted md:col-span-3">Overview</p>
          <div className="md:col-span-8 md:col-start-5">
            {project.overview.map((para, i) => (
              <Rise key={i} delay={i * 0.08}>
                <p className={`${i === 0 ? "voice-d4" : "voice-body text-muted"} mb-6 max-w-[58ch]`}>{para}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* challenge + approach — paper chapter */}
      <section data-chapter="paper" className="py-20 md:py-28">
        <div className="container-x">
          <Rule />
          <div className="grid gap-8 pt-4 md:grid-cols-12">
            <p className="voice-mono text-muted md:col-span-3">The challenge</p>
            <div className="md:col-span-8 md:col-start-5">
              <h2 className="voice-d3 max-w-[30ch]">
                <RevealWords text={project.challenge} stagger={0.015} />
              </h2>
            </div>
          </div>

          <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
            <p className="voice-mono text-muted md:col-span-3">The approach</p>
            <ol className="md:col-span-8 md:col-start-5">
              {project.approach.map((step, i) => (
                <Rise key={i} delay={i * 0.07}>
                  <li className="hairline-t flex gap-6 py-6">
                    <span className="voice-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="voice-body max-w-[52ch]">{step}</p>
                  </li>
                </Rise>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* outcomes */}
      <section data-chapter="paper" className="container-x py-20 md:py-28">
        <Rule />
        <p className="voice-mono pt-4 text-muted">Outcomes</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
          {project.outcomes.map((o, i) => (
            <Rise key={o.label} delay={i * 0.08}>
              <div className="hairline-t pt-5">
                <p className="voice-d2 mb-2" style={{ color: `hsl(${project.tint})` }}>
                  {o.stat}
                </p>
                <p className="voice-mono text-muted">{o.label}</p>
              </div>
            </Rise>
          ))}
        </div>

        {project.quote ? (
          <Rise delay={0.15}>
            <blockquote className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
              <p className="voice-d3" style={{ textWrap: "balance" }}>
                “{project.quote.text}”
              </p>
              <footer className="voice-mono mt-6 text-muted">
                {project.quote.author} <span className="text-accent">·</span> {project.quote.role}
              </footer>
            </blockquote>
          </Rise>
        ) : null}
      </section>

      {/* next case */}
      <section data-chapter="ink" className="hairline-t">
        <Link href={`/work/${next.slug}`} className="group block" data-cursor="view">
          <div className="container-x flex flex-col gap-4 py-16 md:py-24">
            <p className="voice-mono text-muted">Next case — Ref {next.index}</p>
            <div className="flex items-baseline justify-between gap-6">
              <p className="voice-d1 transition-colors duration-300 group-hover:text-accent group-active:text-accent">{next.name}</p>
              <span aria-hidden="true" className="voice-d2 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-active:translate-x-3">
                →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
