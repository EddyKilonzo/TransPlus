import { Link } from "react-router";
import { ArrowUpRight, HandCoins, Handshake, Megaphone, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SpinningBadge from "@/components/SpinningBadge";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";

const MARQUEE_ITEMS = ["DONATE", "VOLUNTEER", "PARTNER", "SPREAD THE WORD"];

const WAYS = [
  {
    icon: HandCoins,
    title: "Donate",
    desc: "Fund legal aid, emergency response, and the digital tools that keep the community safe.",
  },
  {
    icon: Users,
    title: "Volunteer",
    desc: "Offer legal, medical, design, or engineering skills directly to community-led programs.",
  },
  {
    icon: Handshake,
    title: "Partner",
    desc: "Organizations and coalitions working on rights, health, or safety along the border.",
  },
  {
    icon: Megaphone,
    title: "Spread the word",
    desc: "Share our work and reporting to widen the base of support for decriminalization.",
  },
];

export default function Support() {
  return (
    <div>
      <Seo
        title="Support"
        description="Donate, volunteer, partner, or spread the word — every contribution goes directly toward community-led safety, legal recognition, and health access."
      />
      <PageHero
        eyebrow="Support Trans+"
        titleLines={["Stand with", "the community."]}
        subcopy="Every contribution — money, time, skills, or reach — goes directly toward community-led safety, legal recognition, and health access."
        image="/images/2.jpeg"
        accentImage="/images/4.jpeg"
      />

      <Marquee items={MARQUEE_ITEMS} />

      <section className="container-x py-24">
        <div className="masonry masonry-2">
          {WAYS.map((way, i) => (
            <Reveal delay={i * 0.08} key={way.title} className="glow-card frost rounded-3xl p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine/10 text-pine">
                <way.icon size={22} strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-ink">{way.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{way.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark-section relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="container-x flex flex-col items-center justify-between gap-10 py-20 sm:flex-row sm:text-left">
          <Reveal className="max-w-xl text-center sm:text-left">
            <span className="eyebrow text-leaf">Get Involved</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Ready to stand with us?
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-full bg-leaf px-6 py-3.5 font-display text-sm font-medium text-night transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contact / Get Involved
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <Link to="/contact" aria-label="Contact / Get Involved">
              <SpinningBadge text="Support · Get Involved" icon={ArrowUpRight} tone="leaf" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
