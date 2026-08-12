import { useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Fingerprint, HeartHandshake, Quote, Scale, Users } from "lucide-react";
import Marquee from "@/components/Marquee";
import InstagramFeed from "@/components/InstagramFeed";
import ApproachTimeline from "@/components/ApproachTimeline";
import Seo from "@/components/Seo";
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

const REALITY_CLAIMS = [
  "Sex work is work",
  "Full legal recognition",
  "Safety without trade-offs",
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

  // the last programme gets the full-width feature card under the masonry —
  // four cards in a three-column wall would otherwise strand one on its own row
  const featured = PROJECTS[PROJECTS.length - 1];
  const walled = PROJECTS.slice(0, -1);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <div>
      <Seo title="Trans+ — Safety, Dignity & Rights Along the Kenya-Uganda Border" />
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal variant="left">
            <span className="eyebrow">The Reality</span>

            {/* the thesis, carried on a gradient rule rather than in a box */}
            <div className="relative mt-7 pl-6 sm:pl-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-[calc(100%-0.75rem)] w-[3px] rounded-full bg-gradient-to-b from-pine via-moss to-leaf/0"
              />
              <p className="font-display text-2xl font-medium leading-[1.35] tracking-tight text-ink sm:text-[1.9rem]">
                We believe that <span className="text-pine">sex work is work</span>, that trans and
                queer people deserve{" "}
                <span className="text-pine">full legal recognition and protection</span>, and that no
                one should have to choose between their safety and their livelihood.
              </p>
            </div>

            <ul className="mt-9 flex flex-wrap gap-2.5">
              {REALITY_CLAIMS.map((claim, i) => (
                <li
                  key={claim}
                  className="frost rounded-full px-4 py-2 font-display text-xs font-medium tracking-wide text-ink/70"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {claim}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            as="figure"
            variant="scale"
            delay={0.15}
            className="group relative aspect-[4/5] w-full max-w-sm justify-self-center"
          >
            {/* offset frame behind the photo */}
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.75rem] border border-pine/25 bg-pine/[0.06] transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1"
            />
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border-4 border-white shadow-xl">
              <img
                src="/images/6.jpeg"
                alt="Everyday life along the Kenya-Uganda border"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="frost-photo absolute inset-x-4 bottom-4 rounded-2xl px-4 py-3 font-display text-sm font-medium text-white">
                Everyday life along the border
                <span className="mt-0.5 block text-xs font-normal text-white/65">
                  Busia · Kenya–Uganda corridor
                </span>
              </figcaption>
            </div>
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
        <div className="masonry masonry-3 mt-12">
          {walled.map((p, i) => (
            <Reveal delay={i * 0.08} key={p.slug} className="glow-card frost group flex flex-col overflow-hidden rounded-3xl">
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
              <div className={`flex flex-1 flex-col p-8 ${p.tint}`}>
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

        {/* Wide feature card — the programme that closes the set gets room to breathe */}
        <Reveal delay={0.24} className="group mt-6 block">
          <article className="frost relative overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_38px_84px_-42px_rgba(14,18,15,0.5)]">
            <div className={`pointer-events-none absolute inset-0 ${featured.tint}`} aria-hidden="true" />

            <div className="relative grid lg:grid-cols-[minmax(0,0.85fr)_1.15fr]">
              {/* absolute image so it fills the row instead of dictating its height */}
              <div className="relative h-52 overflow-hidden lg:h-auto lg:min-h-[20rem]">
                <img
                  src={featured.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:900ms] group-hover:scale-105"
                />
                <span
                  className={`absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 ${featured.accent}`}
                >
                  <featured.icon size={22} strokeWidth={1.75} />
                </span>
              </div>

              <div className="relative p-8 sm:p-10 lg:p-12">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 right-6 select-none font-display text-[8rem] font-bold leading-none text-ink/[0.05]"
                >
                  {featured.number}
                </span>

                <span className={`font-display text-xs font-semibold uppercase tracking-[0.22em] ${featured.accent}`}>
                  {featured.number} · Where it's heading
                </span>
                <h3 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/72">{featured.summary}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {featured.approach.map((step) => (
                    <li
                      key={step.title}
                      className="rounded-full border border-ink/[0.08] bg-white/70 px-3.5 py-1.5 font-display text-xs font-medium text-ink/65"
                    >
                      {step.title}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/projects/${featured.slug}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine"
                >
                  Explore this project
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Community Voices */}
      <section className="container-x py-24">
        <Reveal className="max-w-xl">
          <span className="eyebrow">Community Voices</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            In their own words.
          </h2>
        </Reveal>
        <div className="masonry masonry-4 mt-12">
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
          <div className="masonry masonry-2 [column-count:2]">
            {ROLES.map((role, i) => (
              <Reveal delay={i * 0.08} key={role.label} className="frost-dark flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-10 text-center transition-colors">
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

        <div className="masonry masonry-3 masonry-wide mt-12">
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
                className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:900ms] group-hover:scale-105"
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
                <blockquote className="frost-photo rounded-2xl p-6 shadow-lg">
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
              <Reveal delay={i * 0.08} className={`glow-card frost rounded-3xl p-8 sm:p-10 ${i % 2 === 0 ? "" : "frost-fog"}`}>
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

      {/* Instagram feed */}
      <InstagramFeed />

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
