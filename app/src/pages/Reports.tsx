import { ArrowUpRight, Download, FileText, Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import { REPORTS } from "@/data/reports";
import { TESTIMONIES } from "@/data/testimonies";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";

const MARQUEE_ITEMS = ["ADVOCACY BRIEFINGS", "FIELD RESEARCH", "POLICY ANALYSIS", "COMMUNITY DATA"];

export default function Reports() {
  const [featured, ...rest] = REPORTS;

  return (
    <div>
      <Seo
        title="Reports"
        description="An advocacy briefing series documenting the legal, health, and digital realities queer sex workers face along the Kenya-Uganda border."
      />
      <PageHero
        eyebrow="Reports"
        titleLines={["What we", "learn."]}
        subcopy="An advocacy briefing series documenting the legal, health, and digital realities queer sex workers face along the Kenya-Uganda border."
        image="/images/3.jpeg"
        accentImage="/images/7.jpeg"
      />

      <Marquee items={MARQUEE_ITEMS} />

      <section className="container-x py-24">
        {/* Featured */}
        <Reveal as="article" className="dark-section overflow-hidden rounded-[2rem]">
          <div className="grid lg:grid-cols-[1.3fr_1fr]">
            <div className="p-8 sm:p-12">
              <span className="eyebrow text-leaf">Featured · {featured.series}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-leaf/80">
                {featured.subtitle}
              </p>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60">{featured.summary}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={featured.file}
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3.5 font-display text-sm font-medium text-night transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download PDF
                </a>
                <a
                  href={featured.file}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-display text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Read online
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="text-xs text-white/40">{featured.pages} pages · PDF</span>
              </div>
            </div>
            <div className="relative min-h-[240px] overflow-hidden">
              <img src={featured.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-night via-night/40 to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Rest */}
        <div className="masonry masonry-2 masonry-wide mt-6">
          {rest.map((report, i) => (
            <Reveal as="article" delay={0.1 + i * 0.08} key={report.slug} className="glow-card frost group flex flex-col overflow-hidden rounded-3xl">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={report.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-pine">
                  {report.series}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-xl font-semibold text-ink">{report.title}</h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-pine">{report.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{report.summary}</p>
                <div className="mt-6 space-y-4 border-t border-ink/[0.06] pt-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={report.file}
                      download
                      className="group/dl inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 font-display text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
                    >
                      <Download size={14} className="transition-transform duration-300 group-hover/dl:translate-y-0.5" />
                      Download
                    </a>
                    <a
                      href={report.file}
                      target="_blank"
                      rel="noreferrer"
                      className="group/ro inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:border-pine/40 hover:text-pine"
                    >
                      Read online
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover/ro:translate-x-0.5 group-hover/ro:-translate-y-0.5"
                      />
                    </a>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink/45">
                    <FileText size={13} /> {report.pages} pages · PDF
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community testimony drawn from the briefing series */}
      <section className="dark-section relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="container-x py-20">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-leaf">Community Testimony</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              What the papers document
            </h2>
            <p className="mt-4 text-sm text-white/50">
              Published in the briefing series. Identities withheld for safety.
            </p>
          </Reveal>

          <div className="masonry masonry-3 mt-12">
            {TESTIMONIES.map((t, i) => (
              <Reveal as="figure" delay={i * 0.08} key={t.reportSlug} className="frost-dark group flex flex-col overflow-hidden rounded-3xl transition-colors">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <Quote className="absolute bottom-4 left-6 text-leaf" size={26} strokeWidth={1.5} />
                </div>
                <blockquote className="flex flex-1 flex-col p-7">
                  <p className="text-sm leading-relaxed text-white/85">{t.quote}</p>
                  <figcaption className="mt-5 border-t border-white/10 pt-4 text-xs text-white/45">
                    {t.attribution}
                    <span className="mt-1 block font-medium text-leaf/80">{t.source}</span>
                  </figcaption>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
