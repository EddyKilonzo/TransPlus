import { Link, Navigate, useParams } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Download, FileText } from "lucide-react";
import Marquee from "@/components/Marquee";
import { PROJECTS } from "@/data/projects";
import { REPORTS } from "@/data/reports";
import { TESTIMONIES } from "@/data/testimonies";
import Reveal from "@/components/Reveal";
import { EASE } from "@/lib/motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  if (!project) return <Navigate to="/projects" replace />;

  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const report = REPORTS.find((r) => r.slug === project.reportSlug);
  const testimony = TESTIMONIES.find((t) => t.reportSlug === project.reportSlug);

  return (
    <div>
      {/* Hero — full-bleed image with the programme number oversized behind it */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={project.image} alt="" className="h-full w-full scale-110 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/55" />
        </motion.div>

        <div className="container-x relative flex min-h-[68vh] flex-col justify-end pb-16 pt-40">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.09 }}
            transition={{ duration: 1, ease: EASE }}
            className="pointer-events-none absolute right-4 top-24 select-none font-display text-[22rem] font-bold leading-none text-white sm:right-10"
            aria-hidden="true"
          >
            {project.number}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative max-w-3xl"
          >
            <Link
              to="/projects"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
            >
              <ArrowLeft size={14} /> All projects
            </Link>

            <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-leaf backdrop-blur">
              <project.icon size={26} strokeWidth={1.75} />
            </span>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{project.summary}</p>
          </motion.div>
        </div>
      </section>

      <Marquee items={[project.title, "Community-led", "Kenya–Uganda border"]} />

      {/* Context */}
      <section className="container-x py-24">
        <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
          <Reveal as="span" className="eyebrow">
            The Context
          </Reveal>
          <Reveal delay={0.05} className="max-w-3xl">
            <p className="text-2xl font-medium leading-snug text-ink sm:text-3xl">{project.context}</p>
            <p className="mt-8 border-l-2 border-pine/30 pl-6 text-base leading-relaxed text-ink/72">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* Gallery */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal delay={0.1 + i * 0.08} key={src} className="group aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-ink/[0.06]">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="dark-section relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="container-x py-20">
          <Reveal className="max-w-xl">
            <span className="eyebrow text-leaf">How It Works</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Our approach
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {project.approach.map((step, i) => (
              <Reveal delay={i * 0.08} key={step.title} className="group rounded-3xl border border-white/10 bg-white/[0.06] p-8 transition-colors hover:bg-white/[0.11]">
                <span className="font-display text-xs font-semibold text-leaf">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{step.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimony */}
      {testimony && (
        <section className="container-x py-24">
          <Reveal as="figure" className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div className="aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.75rem] border-4 border-white shadow-xl">
              <img src={testimony.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <blockquote>
              <span className="eyebrow">Community Testimony</span>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                “{testimony.quote}”
              </p>
              <figcaption className="mt-6 text-sm text-ink/55">
                {testimony.attribution}
                <span className="mt-1 block font-semibold text-pine">
                  From {testimony.source} · identity withheld for safety
                </span>
              </figcaption>
            </blockquote>
          </Reveal>
        </section>
      )}

      {/* What we ask */}
      <section className="container-x pb-24">
        <Reveal className="max-w-xl">
          <span className="eyebrow">What We Ask</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Recommendations
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {project.asks.map((ask, i) => (
            <Reveal delay={i * 0.08} key={ask.audience} className={`glow-card rounded-3xl border border-ink/[0.07] p-8 ${project.tint}`}>
              <p className={`font-display text-sm font-semibold ${project.accent}`}>{ask.audience}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{ask.ask}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related report */}
      {report && (
        <section className="container-x pb-24">
          <Reveal as="article" className="glow-card grid gap-8 overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white sm:grid-cols-[1fr_240px] sm:items-center">
            <div className="p-8 sm:p-10">
              <span className="eyebrow">Read the paper · {report.series}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{report.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">{report.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={report.file}
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-pine px-5 py-3 font-display text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
                >
                  <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download
                </a>
                <a
                  href={report.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-3 font-display text-sm font-medium text-ink transition-colors hover:border-pine/40 hover:text-pine"
                >
                  Read online
                </a>
                <span className="inline-flex items-center gap-1.5 text-xs text-ink/45">
                  <FileText size={13} /> {report.pages} pages
                </span>
              </div>
            </div>
            <div className="h-48 overflow-hidden sm:h-full sm:min-h-[220px]">
              <img src={report.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </section>
      )}

      {/* Next */}
      <section className="container-x pb-24">
        <Reveal className="dark-section overflow-hidden rounded-[2.5rem]">
          <Link to={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6 p-8 sm:p-12">
            <div>
              <span className="eyebrow text-leaf">Next project · {next.number}</span>
              <p className="mt-3 font-display text-3xl font-semibold text-white transition-colors group-hover:text-leaf sm:text-4xl">
                {next.title}
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:bg-leaf group-hover:text-night">
              <ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
