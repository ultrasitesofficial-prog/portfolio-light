import SectionHead from "@/components/ui/SectionHead";
import WorkCard from "@/components/ui/WorkCard";
import { RevealWords, Rise } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

/**
 * Selected work — editorial case-study index.
 * Rows alternate weight left/right; covers are live generative drawings.
 * Row interactions live in WorkCard (hover on desktop, center-band on touch).
 */
export default function Work() {
  return (
    <section id="work" data-chapter="paper" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHead index="01" label="Selected work" meta={`In-house builds · ${String(projects.length).padStart(2, "0")} case studies`} />

        <h2 className="voice-d2 mx-auto mb-16 max-w-[18ch] text-center md:mb-24">
          <RevealWords text="Case studies, not screenshots." />
        </h2>

        <ul className="space-y-24 md:space-y-36">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Rise delay={0.05}>
                <WorkCard project={p} flip={i % 2 === 1} />
              </Rise>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
