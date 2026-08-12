import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";

const ROLE_TICKER = ["Organizers", "Paralegals", "Peer health educators", "Digital security trainers"];

const VALUES = [
  {
    title: "Sex work is work",
    desc: "We start from the belief that sex work is legitimate labor deserving of legal protection, not moral judgment.",
  },
  {
    title: "Nothing about us, without us",
    desc: "Every program is designed and led by people with lived experience of the realities we're addressing.",
  },
  {
    title: "Safety without surveillance",
    desc: "Our tools are built anonymity-first — protection should never come at the cost of exposure.",
  },
];

export default function About() {
  return (
    <div>
      <Seo
        title="About Us"
        description="Founded by and for queer and transgender sex workers along the Kenya-Uganda border — community-led organizing for safety, dignity, and rights."
      />
      <PageHero
        eyebrow="Who We Are"
        titleLines={["About", "Us"]}
        subcopy="Founded by and for queer and transgender sex workers along the Kenya-Uganda border."
        image="/images/4.jpeg"
        accentImage="/images/logo.jpeg"
      />

      <Marquee items={ROLE_TICKER} />

      <section className="container-x py-24">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <span className="mt-4 block h-px w-16 bg-pine/40" />
          </Reveal>

          <div className="max-w-3xl">
            {/* Lede — oversized, with the thesis carried in colour */}
            <Reveal>
              <p className="font-display text-3xl font-semibold leading-[1.25] tracking-tight text-ink sm:text-[2.6rem]">
                Trans+ took shape when a small group of organizers on both sides of the
                Kenya-Uganda border decided that safety work had to be{" "}
                <span className="text-pine">led by the people living the risk</span>, not designed
                for them from a distance.
              </p>
            </Reveal>

            {/* Supporting paragraphs as offset frosted cards */}
            <div className="masonry masonry-2 masonry-wide mt-12">
              <Reveal
                delay={0.08}
                className="glow-card frost relative overflow-hidden rounded-[1.75rem] p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pine/[0.13] via-transparent to-transparent" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-bold leading-none text-pine/[0.09]"
                >
                  01
                </span>
                <div className="relative">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                    Who builds it
                  </span>
                  <p className="mt-4 text-base leading-[1.75] text-ink/75">
                    Every organizer, paralegal, peer educator, and security trainer on our team is
                    current or formerly a sex worker in this community.{" "}
                    <span className="font-medium text-ink">That isn't incidental</span> — it's why
                    people trust us enough to ask for help in the first place.
                  </p>
                </div>
              </Reveal>

              <Reveal
                delay={0.16}
                className="glow-card frost relative overflow-hidden rounded-[1.75rem] p-8 sm:mt-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-warm/[0.14] via-transparent to-transparent" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-bold leading-none text-warm/[0.13]"
                >
                  02
                </span>
                <div className="relative">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-warm">
                    How it fits together
                  </span>
                  <p className="mt-4 text-base leading-[1.75] text-ink/75">
                    We work across four connected areas — decriminalization advocacy, legal support,
                    SRHR access, and digital safety tools — treating them as{" "}
                    <span className="font-medium text-ink">entry points into the same goal</span>{" "}
                    rather than separate programs.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="masonry masonry-2 mt-12">
          {[
            { src: "/images/8.jpeg", caption: "My body, my business." },
            { src: "/images/3.jpeg", caption: "I own my story — every chapter." },
          ].map((img, i) => (
            <Reveal as="figure" delay={0.1 + i * 0.1} key={img.src} className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-ink/[0.06] shadow-sm">
              <img
                src={img.src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 font-display text-sm font-medium text-white">
                {img.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark-section relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="container-x py-20">
          <Reveal className="max-w-xl">
            <span className="eyebrow text-leaf">What We Believe</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Our values
            </h2>
          </Reveal>
          <div className="masonry masonry-3 mt-12">
            {VALUES.map((v, i) => (
              <Reveal delay={i * 0.08} key={v.title} className="frost-dark rounded-3xl p-8 transition-colors">
                <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
