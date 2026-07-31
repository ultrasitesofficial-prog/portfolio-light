/**
 * SectionHead — centered eyebrow that opens every chapter.
 * `index` is kept in the signature for callers but no longer rendered;
 * the label speaks for itself, the meta whispers under it.
 */
export default function SectionHead({
  label,
  meta,
}: {
  index?: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="mb-10 text-center md:mb-14">
      <p className="voice-mono text-accent">{label}</p>
      {meta ? <p className="voice-mono mt-2 text-muted/80">{meta}</p> : null}
    </div>
  );
}
