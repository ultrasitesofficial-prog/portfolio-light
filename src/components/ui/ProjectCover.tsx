import type { Project } from "@/data/projects";

/**
 * ProjectCover — deterministic generative artwork per case study.
 * Pure SVG drawn from the project's seed: zero image weight, always crisp,
 * and honest — these are drawings, not fake screenshots. Swap for real
 * project imagery by replacing this component's usage per project.
 */

function rng(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 800;
const H = 1000;

function Arcs({ seed, tint }: { seed: number; tint: string }) {
  const r = rng(seed);
  const cx = 400, cy = 480;
  const rings = Array.from({ length: 7 }, (_, i) => 96 + i * 38 + r() * 10);
  const hand = r() * 360;
  return (
    <g>
      {rings.map((rad, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={rad}
          fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke"
          strokeOpacity={i % 3 === 0 ? 0.32 : 0.16}
          strokeDasharray={i % 2 === 1 ? "2 9" : undefined}
        />
      ))}
      {/* minute-tick ring */}
      <circle
        cx={cx} cy={cy} r={352} fill="none" stroke="currentColor"
        strokeOpacity={0.4} strokeWidth={10} vectorEffect="none"
        strokeDasharray={`1.5 ${(2 * Math.PI * 352) / 60 - 1.5}`}
      />
      {/* bronze sweep */}
      <circle
        cx={cx} cy={cy} r={210} fill="none" stroke={`hsl(${tint})`}
        strokeWidth={2} vectorEffect="none" strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 210 * 0.22} ${2 * Math.PI * 210}`}
        transform={`rotate(${hand} ${cx} ${cy})`}
      />
      <line
        x1={cx} y1={cy} x2={cx + 300 * Math.cos((hand * Math.PI) / 180)} y2={cy + 300 * Math.sin((hand * Math.PI) / 180)}
        stroke="currentColor" strokeOpacity={0.5} vectorEffect="non-scaling-stroke"
      />
      <circle cx={cx} cy={cy} r={4} fill={`hsl(${tint})`} />
      <line x1={cx - 380} y1={cy} x2={cx - 320} y2={cy} stroke="currentColor" strokeOpacity={0.4} vectorEffect="non-scaling-stroke" />
      <line x1={cx + 320} y1={cy} x2={cx + 380} y2={cy} stroke="currentColor" strokeOpacity={0.4} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function Columns({ seed, tint }: { seed: number; tint: string }) {
  const r = rng(seed);
  const base = 830;
  const n = 13;
  const bars = Array.from({ length: n }, (_, i) => {
    const x = 90 + (i * 620) / (n - 1) + (r() - 0.5) * 14;
    const h = 140 + r() * 460;
    const w = 16 + r() * 26;
    return { x, h, w, solid: r() > 0.82 };
  });
  return (
    <g>
      <line x1={60} y1={base} x2={740} y2={base} stroke="currentColor" strokeOpacity={0.5} vectorEffect="non-scaling-stroke" />
      {[0.35, 0.55, 0.75].map((f, i) => (
        <line key={i} x1={60} y1={base - 560 * f} x2={740} y2={base - 560 * f}
          stroke="currentColor" strokeOpacity={0.1} vectorEffect="non-scaling-stroke" />
      ))}
      {bars.map((b, i) =>
        b.solid ? (
          <rect key={i} x={b.x - b.w / 2} y={base - b.h} width={b.w} height={b.h} fill={`hsl(${tint} / 0.35)`} stroke={`hsl(${tint})`} strokeOpacity={0.9} vectorEffect="non-scaling-stroke" />
        ) : (
          <rect key={i} x={b.x - b.w / 2} y={base - b.h} width={b.w} height={b.h} fill="none" stroke="currentColor" strokeOpacity={0.38} vectorEffect="non-scaling-stroke" />
        ),
      )}
      {/* dimension line */}
      <g stroke="currentColor" strokeOpacity={0.45} vectorEffect="non-scaling-stroke">
        <line x1={90} y1={190} x2={710} y2={190} vectorEffect="non-scaling-stroke" />
        <line x1={90} y1={182} x2={90} y2={198} vectorEffect="non-scaling-stroke" />
        <line x1={710} y1={182} x2={710} y2={198} vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
}

function Terrain({ seed, tint }: { seed: number; tint: string }) {
  const r = rng(seed);
  const rows = 9;
  const paths = Array.from({ length: rows }, (_, i) => {
    const yBase = 250 + (i * 560) / (rows - 1);
    const a1 = 8 + r() * 14 + i * 2.4;
    const a2 = 4 + r() * 10;
    const p1 = r() * Math.PI * 2;
    const p2 = r() * Math.PI * 2;
    const pts = Array.from({ length: 33 }, (_, j) => {
      const x = 60 + (j * 680) / 32;
      const y = yBase + Math.sin(j * 0.34 + p1) * a1 + Math.sin(j * 0.81 + p2) * a2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return { d: `M${pts.join(" L")}`, main: i === 5 };
  });
  return (
    <g>
      <circle cx={620} cy={160} r={46} fill="none" stroke="currentColor" strokeOpacity={0.45} vectorEffect="non-scaling-stroke" />
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill="none"
          stroke={p.main ? `hsl(${tint})` : "currentColor"}
          strokeOpacity={p.main ? 0.95 : 0.26}
          strokeWidth={p.main ? 1.5 : 1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <line x1={230} y1={230} x2={230} y2={850} stroke="currentColor" strokeOpacity={0.3} strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
      <circle cx={230} cy={250 + rng(seed + 4)() * 400} r={5} fill="none" stroke={`hsl(${tint})`} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function Orbits({ seed, tint }: { seed: number; tint: string }) {
  const r = rng(seed);
  const cx = 400, cy = 430;
  const orbits = Array.from({ length: 4 }, (_, i) => ({
    rx: 180 + i * 55 + r() * 20,
    ry: 70 + i * 26 + r() * 12,
    rot: -24 + r() * 48,
  }));
  const nodes = orbits.flatMap((o, i) => {
    const t = r() * Math.PI * 2;
    const x = o.rx * Math.cos(t), y = o.ry * Math.sin(t);
    const rad = (o.rot * Math.PI) / 180;
    return [{ x: cx + x * Math.cos(rad) - y * Math.sin(rad), y: cy + x * Math.sin(rad) + y * Math.cos(rad), hot: i === 2 }];
  });
  const line = Array.from({ length: 14 }, (_, j) => {
    const x = 100 + (j * 600) / 13;
    const y = 860 - j * (6 + r() * 16);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <g>
      {orbits.map((o, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={o.rx} ry={o.ry}
          transform={`rotate(${o.rot} ${cx} ${cy})`}
          fill="none" stroke="currentColor" strokeOpacity={0.28} vectorEffect="non-scaling-stroke" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.hot ? 5 : 3}
          fill={n.hot ? `hsl(${tint})` : "none"}
          stroke={n.hot ? "none" : "currentColor"} strokeOpacity={0.7} vectorEffect="non-scaling-stroke" />
      ))}
      <circle cx={cx} cy={cy} r={3} fill="currentColor" fillOpacity={0.7} />
      <path d={`M${line.join(" L")}`} fill="none" stroke={`hsl(${tint})`} strokeOpacity={0.9} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      {line.filter((_, i) => i % 4 === 0).map((pt, i) => {
        const [x, y] = pt.split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r={2.5} fill={`hsl(${tint})`} />;
      })}
    </g>
  );
}

const VARIANTS = { arcs: Arcs, columns: Columns, terrain: Terrain, orbits: Orbits };

export default function ProjectCover({
  project,
  className,
}: {
  project: Pick<Project, "cover" | "seed" | "tint" | "name">;
  className?: string;
}) {
  const Variant = VARIANTS[project.cover];
  const gridId = `g-${project.seed}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={`Generative cover artwork for ${project.name}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.14" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${gridId})`} />
      {/* registration marks */}
      <g stroke="currentColor" strokeOpacity={0.4}>
        <path d="M40 56 V40 H56" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M744 40 H760 V56" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M760 944 V960 H744" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M56 960 H40 V944" fill="none" vectorEffect="non-scaling-stroke" />
      </g>
      <Variant seed={project.seed} tint={project.tint} />
    </svg>
  );
}
