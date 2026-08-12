import { useState } from "react";
import { LOCATIONS, MAP_BOUNDS, type Location } from "@/data/locations";
import Reveal from "@/components/Reveal";

const W = 800;
const H = 620;

function project(lon: number, lat: number) {
  const { minLon, maxLon, minLat, maxLat } = MAP_BOUNDS;
  return {
    x: ((lon - minLon) / (maxLon - minLon)) * W,
    y: ((maxLat - lat) / (maxLat - minLat)) * H,
  };
}

/** Approximate Kenya–Uganda border, traced south→north through the crossings. */
const BORDER: [number, number][] = [
  [33.9, -1.0],
  [33.95, -0.3],
  [34.05, 0.2],
  [34.11, 0.46],
  [34.28, 0.63],
  [34.42, 0.9],
  [34.72, 1.16],
  [34.85, 1.9],
  [34.6, 2.6],
  [34.5, 3.5],
  [34.4, 4.2],
];

const KIND_STYLE: Record<Location["kind"], { fill: string; label: string }> = {
  hub: { fill: "#1F7A4D", label: "Base of operations" },
  crossing: { fill: "#3FA66B", label: "Border crossing" },
  camp: { fill: "#C97C2E", label: "Refugee camp" },
  city: { fill: "#8A9188", label: "Transit / destination city" },
};

export default function MapSection() {
  const [active, setActive] = useState<Location | null>(null);
  const borderPath = BORDER.map(([lon, lat], i) => {
    const { x, y } = project(lon, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <section className="container-x py-24">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">Where We Work</span>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Along the corridor
        </h2>
        <p className="mt-4 text-ink/75">
          Trans+ is based at Busia and works across the crossings, transit towns, and camp settings
          named in our briefing series. Intensity reflects where our outreach and legal response are
          most concentrated.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="frost mt-12 grid gap-6 overflow-hidden rounded-[2rem] lg:grid-cols-[1.5fr_1fr]">
        {/* Map */}
        <div className="relative bg-fog/60 p-4 sm:p-6">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Map of the Kenya-Uganda border corridor showing where Trans+ works"
          >
            <defs>
              <radialGradient id="heat">
                <stop offset="0%" stopColor="#1F7A4D" stopOpacity="0.42" />
                <stop offset="55%" stopColor="#3FA66B" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#3FA66B" stopOpacity="0" />
              </radialGradient>
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="#0E120F" strokeOpacity="0.05" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width={W} height={H} fill="url(#map-grid)" />

            {/* country wash */}
            <rect x="0" y="0" width={W * 0.42} height={H} fill="#1F7A4D" opacity="0.04" />
            <text x="70" y="470" className="fill-ink/25 font-display text-[19px] font-semibold uppercase tracking-widest">
              Uganda
            </text>
            <text x="560" y="470" className="fill-ink/25 font-display text-[19px] font-semibold uppercase tracking-widest">
              Kenya
            </text>

            {/* heat blooms */}
            {LOCATIONS.map((loc) => {
              const { x, y } = project(loc.lon, loc.lat);
              return <circle key={`heat-${loc.name}`} cx={x} cy={y} r={30 + loc.intensity * 85} fill="url(#heat)" />;
            })}

            {/* border */}
            <path
              d={borderPath}
              fill="none"
              stroke="#0E120F"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="7 6"
              strokeLinecap="round"
            />

            {/* pins */}
            {LOCATIONS.map((loc, i) => {
              const { x, y } = project(loc.lon, loc.lat);
              const style = KIND_STYLE[loc.kind];
              const isActive = active?.name === loc.name;
              const r = loc.kind === "hub" ? 9 : 6.5;
              return (
                <g
                  key={loc.name}
                  transform={`translate(${x} ${y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(loc)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(loc)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${loc.name}, ${loc.country}: ${loc.note}`}
                >
                  {loc.kind === "hub" && (
                    <circle r={r + 7} fill="none" stroke={style.fill} strokeWidth="2" opacity="0.45">
                      <animate attributeName="r" values={`${r + 4};${r + 18}`} dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle r={isActive ? r + 3 : r} fill={style.fill} stroke="#fff" strokeWidth="2.5" />
                  <text
                    x={x > W * 0.75 ? -14 : 14}
                    y="5"
                    textAnchor={x > W * 0.75 ? "end" : "start"}
                    className="fill-ink font-display text-[15px] font-semibold"
                    style={{ opacity: isActive || loc.kind === "hub" ? 1 : 0.65 }}
                  >
                    {loc.name}
                  </text>
                  <animate
                    attributeName="opacity"
                    from="0"
                    to="1"
                    dur="0.5s"
                    begin={`${i * 0.09}s`}
                    fill="freeze"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend + detail */}
        <div className="flex flex-col justify-between gap-8 p-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Legend</h3>
            <ul className="mt-4 space-y-3">
              {(Object.keys(KIND_STYLE) as Location["kind"][]).map((kind) => (
                <li key={kind} className="flex items-center gap-3 text-sm text-ink/65">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: KIND_STYLE[kind].fill }}
                  />
                  {KIND_STYLE[kind].label}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-fog p-6">
            {active ? (
              <>
                <span className="eyebrow">{active.country}</span>
                <p className="mt-2 font-display text-xl font-semibold text-ink">{active.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/72">{active.note}</p>
              </>
            ) : (
              <>
                <span className="eyebrow">Based in</span>
                <p className="mt-2 font-display text-xl font-semibold text-ink">Busia, Kenya</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/72">
                  Hover or focus a pin to see what happens there.
                </p>
              </>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
