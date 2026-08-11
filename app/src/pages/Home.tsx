import { useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Fingerprint, HeartHandshake, Quote, Scale, Users } from "lucide-react";
import Marquee from "@/components/Marquee";
import ApproachTimeline from "@/components/ApproachTimeline";
import { PROJECTS } from "@/data/projects";
import { COMMUNITY_VOICES } from "@/data/voices";
import { TESTIMONIES } from "@/data/testimonies";
import Reveal from "@/components/Reveal";

const MARQUEE_ITEMS = [
  "SAFETY IS A RIGHT",
  "DIGNITY IS A RIGHT",
  "SEX WORK IS WORK",
  "COMMUNITY-LED",
  "LEGAL RECOGNITION",
  "DIGITAL SAFETY",
  "FREEDOM OF MOVEMENT",
];

const ROLES = [
  { icon: Users, label: "Organizers" },
  { icon: Scale, label: "Paralegals" },
  { icon: HeartHandshake, label: "Peer educators" },
  { icon: Fingerprint, label: "Security trainers" },
];

const COMMUNITY_CAPTIONS = [
  { caption: "Community-led, always", image: "/images/2.jpeg" },
  { caption: "Organizers set the agenda", image: "/images/4.jpeg" },
  { caption: "Tools built with the community", image: "/images/5.jpeg" },
  { caption: "Peer-led outreach", image: "/images/7.jpeg" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function HeroVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 30]);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-md">
      <motion.div
        style={{ y: yBack }}
        initial={{ opacity: 0, scale: 0.94, rotate: reduced ? 0 : 2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="absolute inset-0 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl"
      >
        <img src="/images/4.jpeg" alt="A Trans+ community member" className="h-full w-full object-cover" />
      </motion.div>

      <motion.div
        style={{ y: yFront }}
        initial={{ opacity: 0, y: reduced ? 0 : 34, rotate: reduced ? 0 : -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        className="glow-card absolute -bottom-8 -left-8 h-2/5 w-2/5 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-2xl"
      >
        <img src="/images/8.jpeg" alt="" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <div>
      {/* Hero — sized so the marquee lands at the fold */}
      <div className="flex min-h-[100svh] flex-col justify-between">
      <section className="container-x relative flex flex-1 items-center pt-28 pb-10 sm:pt-32">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.span
              variants={item}
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-pine/20 bg-pine/10 px-4 py-2"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pine" />
              Community-led · Kenya–Uganda border
            </motion.span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {["Safety is a right.", "Dignity is a right."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span variants={item} className="block">
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <motion.span variants={item} className="text-gradient animate-gradient-pan block">
                  So is freedom.
                </motion.span>
              </span>
            </h1>

            <motion.p variants={item} className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
              Along the Kenya-Uganda border, queer sex workers navigate a daily reality shaped by
              criminalization, stigma, and exclusion from the systems meant to protect everyone.
            </motion.p>
            <motion.p variants={item} className="mt-4 max-w-lg text-lg leading-relaxed text-ink/75">
              Trans+ exists to change that reality — through legal advocacy, direct support, and
              tools built by and for the community we serve.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/work"
                className="rounded-full bg-pine px-6 py-3.5 font-display text-sm font-medium text-white shadow-lg shadow-pine/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss hover:shadow-xl hover:shadow-pine/25"
              >
                Explore Our Work
              </Link>
              <Link
                to="/support"
                className="rounded-full border border-ink/15 bg-white px-6 py-3.5 font-display text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25"
              >
                Support Trans+
              </Link>
              <Link
                to="/about"
                className="link-underline group inline-flex items-center gap-2 font-display text-sm font-medium text-pine"
              >
                Learn About Trans+
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <HeroVisual />
        </div>
      </section>

        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* The Reality */}
      <section className="container-x py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal >
            <span className="eyebrow">The Reality</span>
            <p className="mt-6 text-2xl font-medium leading-snug text-ink sm:text-3xl">
              We believe that <span className="text-pine">sex work is work</span>, that trans and
              queer people deserve <span className="text-pine">full legal recognition and
              protection</span>, and that no one should have to choose between their safety and
              their livelihood.
            </p>
          </Reveal>
          <Reveal as="figure" delay={0.15} className="group relative aspect-[4/5] w-full max-w-sm justify-self-center overflow-hidden rounded-[1.75rem] border-4 border-white shadow-xl">
            <img
              src="/images/6.jpeg"
              alt="Everyday life along the Kenya-Uganda border"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 font-display text-sm font-medium text-white">
              Everyday life along the border
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* What We Do */}
      <section className="container-x py-8">
        <Reveal className="max-w-xl">
          <span className="eyebrow">What We Do</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Four connected areas. One goal.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal delay={i * 0.08} key={p.slug} className={`glow-card group flex flex-col overflow-hidden rounded-3xl border border-ink/[0.07] ${p.tint}`}>
              <div className="relative h-40 overflow-hidden">
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
                <span className="absolute right-4 top-4 font-display text-xs font-semibold text-white/90">
                  {p.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-white/70 p-8">
                <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/72">{p.summary}</p>
                <Link
                  to={`/projects/${p.slug}`}
                  className={`link-underline mt-auto inline-flex w-fit items-center gap-1.5 pt-5 font-display text-sm font-semibold ${p.accent}`}
                >
                  Explore
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community Voices */}
      <section className="container-x py-24">
        <Reveal className="max-w-xl">
          <span className="eyebrow">Community Voices</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            In their own words.
          </h2>
        </Reveal>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-4 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {COMMUNITY_VOICES.map((voice, i) => (
            <Reveal as="figure" delay={(i % 4) * 0.08} key={voice.image} className="glow-card relative overflow-hidden rounded-3xl">
              <img src={voice.image} alt="" className="w-full object-cover" loading="lazy" />
              <figcaption className="sr-only">{voice.quote}</figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community-led */}
      <section className="dark-section relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-2">
          <Reveal >
            <span className="eyebrow text-leaf">Community-led</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Led by the community we serve
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Trans+ is led by members of the community we serve. We don't speak for queer sex
              workers along the border — we work alongside them, building the infrastructure of
              safety, dignity, and rights that they have identified as most urgent.
            </p>
            <Link to="/about" className="link-underline mt-6 inline-flex items-center gap-2 font-display text-sm font-medium text-leaf">
              More about who we are <ArrowRight size={14} />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {ROLES.map((role, i) => (
              <Reveal delay={i * 0.08} key={role.label} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-10 text-center transition-colors hover:bg-white/[0.12]">
                <role.icon className="text-leaf" size={28} strokeWidth={1.5} />
                <span className="font-display text-sm font-medium">{role.label}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="container-x grid grid-cols-2 gap-4 pb-20 lg:grid-cols-4">
          {COMMUNITY_CAPTIONS.map((tile, i) => (
            <Reveal as="figure" delay={i * 0.08} key={tile.caption} className="glow-card group relative aspect-square overflow-hidden rounded-2xl">
              <img
                src={tile.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/60 to-transparent p-4 font-display text-sm font-medium leading-tight text-white">
                {tile.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimony from the briefing series */}
      <section className="container-x py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="eyebrow">Community Testimony</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              What we document
            </h2>
          </div>
          <Link
            to="/reports"
            className="link-underline group inline-flex items-center gap-1.5 font-display text-sm font-medium text-pine"
          >
            Read the briefing series
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIES.map((t, i) => (
            <Reveal
              as="figure"
              delay={i * 0.1}
              key={t.reportSlug}
              className={`group relative overflow-hidden rounded-[1.75rem] ${
                i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-20" : ""
              }`}
            >
              {/* photo sits behind the frosted panel */}
              <img
                src={t.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/45 to-ink/70" />

              <div className="relative flex min-h-[26rem] flex-col justify-end p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-3 select-none font-display text-[7rem] font-bold leading-none text-white/15"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* frosted card keeps the quote legible over any photo */}
                <blockquote className="rounded-2xl border border-white/25 bg-white/15 p-6 shadow-lg backdrop-blur-md">
                  <Quote className="text-leaf" size={22} strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white drop-shadow-sm">
                    {t.quote}
                  </p>
                  <figcaption className="mt-5 border-t border-white/25 pt-4 text-xs text-white/75">
                    {t.attribution}
                    <span className="mt-1 block font-semibold text-leaf">{t.source}</span>
                  </figcaption>
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="container-x pb-24">
        <Reveal className="text-center">
          <span className="eyebrow">Our Approach</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            How change moves
          </h2>
        </Reveal>
        <ApproachTimeline />
      </section>

      {/* Projects */}
      <section className="container-x py-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Projects</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Where the work lives
            </h2>
          </div>
          <Link
            to="/projects"
            className="link-underline inline-flex items-center gap-1.5 font-display text-sm font-medium text-pine"
          >
            Explore Projects <ArrowRight size={14} />
          </Link>
        </Reveal>

        <div className="mt-12 flex flex-col gap-24 sm:gap-16">
          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="sticky" style={{ top: `${96 + i * 20}px` }}>
              <Reveal delay={i * 0.08} className={`glow-card rounded-3xl p-8 shadow-[0_30px_60px_-30px_rgba(14,18,15,0.25)] sm:p-10 ${ i % 2 === 0 ? "border border-ink/[0.06] bg-white" : "bg-fog" }`}>
                <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <span className="font-display text-4xl font-semibold text-ink/15">{p.number}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70">{p.summary}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:justify-self-end">
                    <div className="hidden h-20 w-32 overflow-hidden rounded-2xl sm:block">
                      <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-pine hover:text-white"
                      aria-label={`Read more about ${p.title}`}
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-x pb-24">
        <Reveal className="panel-line rounded-[2.5rem] border bg-fog px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Explore our projects below, or reach out if you'd like to support this work.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/support"
              className="rounded-full bg-pine px-6 py-3.5 font-display text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-moss"
            >
              Support Trans+
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-ink/15 px-6 py-3.5 font-display text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Get Involved
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
