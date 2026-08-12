import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import ApproachTimeline from "@/components/ApproachTimeline";
import { PROJECTS } from "@/data/projects";
import { DOCUMENTED_PATTERNS } from "@/data/testimonies";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";

const MARQUEE_ITEMS = ["DECRIMINALIZATION", "LEGAL AID", "SRHR ACCESS", "DIGITAL SAFETY"];

export default function Work() {
  return (
    <div>
      <Seo
        title="Our Work"
        description="Legal advocacy, direct support, SRHR access, and digital safety tools — four areas that reinforce each other along the Kenya-Uganda border."
      />
      <PageHero
        eyebrow="Our Work"
        titleLines={["Four areas.", "One goal."]}
        subcopy="Legal advocacy, direct support, SRHR access, and digital safety tools — each area reinforces the others, built around what the community has identified as most urgent."
        image="/images/5.jpeg"
        accentImage="/images/2.jpeg"
      />

      <Marquee items={MARQUEE_ITEMS} />

      {/* Each card pins, then the next slides up and covers it */}
      <section className="container-x flex flex-col gap-8 py-24">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.05}
            className="sticky"
            style={{ top: `${104 + i * 20}px` }}
          >
            <div className="frost group grid overflow-hidden rounded-3xl sm:grid-cols-[240px_1fr_auto] sm:items-center">
              <div className="relative h-44 overflow-hidden sm:h-full sm:min-h-[220px]">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 ${p.accent}`}
                >
                  <p.icon size={18} strokeWidth={1.75} />
                </span>
              </div>

              <div className={`px-8 pb-8 pt-6 sm:h-full sm:py-8 ${p.tint}`}>
                <span className={`font-display text-xs font-semibold ${p.accent}`}>{p.number}</span>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{p.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70">{p.description}</p>
              </div>

              <Link
                to={`/projects/${p.slug}`}
                className="mb-8 ml-8 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-all duration-300 hover:bg-pine hover:text-white group-hover:border-pine/30 sm:mb-0 sm:ml-0 sm:mr-10"
                aria-label={`Read more about ${p.title}`}
              >
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </section>

      {/* What the case files show */}
      <section className="container-x pb-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Why This Work</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What the case files show
          </h2>
          <p className="mt-4 max-w-lg text-ink/75">
            Patterns that recur consistently enough across our legal support and outreach work to be
            treated as systemic rather than incidental.
          </p>
        </Reveal>

        <div className="masonry masonry-2 mt-12">
          {DOCUMENTED_PATTERNS.map((pattern, i) => (
            <Reveal
              delay={i * 0.08}
              key={pattern.label}
              className="glow-card frost relative overflow-hidden rounded-3xl p-8"
            >
              {/* warm wash under the frost — keeps these readable over the hex field */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-warm/[0.14] via-transparent to-pine/[0.06]" />
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-warm/15 font-display text-xs font-bold text-warm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{pattern.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{pattern.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark-section relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="container-x py-20">
          <Reveal className="text-center">
            <span className="eyebrow text-leaf">Our Approach</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              How change moves
            </h2>
          </Reveal>
          <ApproachTimeline tone="dark" />
        </div>
      </section>
    </div>
  );
}
