/**
 * UltraSite wordmark — the big "U" doubles as the U in "Ultra" (with "ltra"
 * trailing) while "site" is nested inside the cup, so the mark spells
 * "Ultrasite" in one clever lockup. Pure SVG in `currentColor`, so it adapts
 * to whatever color the surrounding site theme provides.
 */
export default function Wordmark({
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
    <svg viewBox="0 0 132 58" className={className} fill="none" {...a11y}>
      {/* the U — the shared letter of "Ultra" and the cup that holds "site" */}
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
      {/* "ltra" completing the word to the right of the U */}
      <text
        x="56"
        y="51"
        fontSize="43"
        fontWeight="800"
        letterSpacing="-1.5"
        fill="currentColor"
        style={{ fontFamily: "inherit" }}
      >
        ltra
      </text>
    </svg>
  );
}
