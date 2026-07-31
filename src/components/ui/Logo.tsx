/**
 * UltraSite icon mark — the compact, square form of the [[Wordmark]]: the
 * signature "U" cup with "site" nested inside (the "ltra" is dropped so it
 * fits tight, square/circular slots like a favicon or an avatar badge).
 * Pure SVG in `currentColor`, so it adapts to the surrounding site theme.
 */
export default function Logo({
  className,
  title = "UltraSite",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": title } as const);
  return (
    <svg viewBox="0 0 62 58" className={className} fill="none" {...a11y}>
      {/* the U cup — the signature shape shared with the wordmark */}
      <path
        d="M11 6 L11 31 A20 20 0 0 0 51 31 L51 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "site" nested inside the cup */}
      <text
        x="31"
        y="23"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        letterSpacing="-0.3"
        fill="currentColor"
        style={{ fontFamily: "inherit" }}
      >
        site
      </text>
    </svg>
  );
}
