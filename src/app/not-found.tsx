import Link from "next/link";

export default function NotFound() {
  return (
    <section data-chapter="ink" className="container-x flex min-h-svh flex-col justify-center">
      <p className="voice-mono mb-6 text-muted">
        <span className="text-accent">[404]</span> — Reference not found
      </p>
      <h1 className="voice-d2 max-w-[18ch]">This page isn&apos;t in the dossier.</h1>
      <p className="voice-body mt-6 max-w-[44ch] text-muted">
        The address may have moved, or it never existed. Everything worth seeing is on the index.
      </p>
      <div className="mt-10">
        <Link href="/" className="plate-btn voice-mono">
          Back to index <span aria-hidden="true" className="text-accent">→</span>
        </Link>
      </div>
    </section>
  );
}
