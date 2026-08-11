import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, ShieldAlert } from "lucide-react";
import SpinningBadge from "@/components/SpinningBadge";
import MapSection from "@/components/MapSection";
import Reveal from "@/components/Reveal";
import { EASE } from "@/lib/motion";

const CHANNELS = [
  {
    icon: Mail,
    label: "General & partnerships",
    value: "info@transplug.org",
    href: "mailto:info@transplug.org",
    note: "Media, partnership, and funding enquiries.",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Busia, Kenya",
    note: "Working across the Kenya-Uganda border corridor.",
  },
];

export default function Contact() {
  return (
    <div>
      <section className="container-x pt-32 pb-16 sm:pt-40">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="eyebrow">Contact / Get Involved</span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Reach out. Stand with <span className="text-gradient animate-gradient-pan">the community.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
              We work across the border corridor. Get in touch about partnership, funding, or
              supporting this work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="hidden sm:block"
          >
            <SpinningBadge text="Get Involved · Contact" icon={ArrowUpRight} />
          </motion.div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1fr_1.1fr]">
          {CHANNELS.map((c, i) => (
            <Reveal delay={i * 0.08} key={c.label} className="glow-card rounded-3xl border border-ink/[0.07] bg-white p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine/10 text-pine">
                <c.icon size={22} strokeWidth={1.75} />
              </span>
              <p className="eyebrow mt-5">{c.label}</p>
              {c.href ? (
                <a
                  href={c.href}
                  className="link-underline mt-2 block font-display text-xl font-semibold text-ink"
                >
                  {c.value}
                </a>
              ) : (
                <p className="mt-2 font-display text-xl font-semibold text-ink">{c.value}</p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.note}</p>
            </Reveal>
          ))}

          <Reveal delay={0.16} className="dark-section rounded-3xl p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm/20 text-warm">
              <ShieldAlert size={22} strokeWidth={1.75} />
            </span>
            <p className="eyebrow mt-5 text-leaf">If it's urgent</p>
            <p className="mt-2 font-display text-xl font-semibold text-white">
              Use a trusted community contact
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              For urgent safety concerns, reach us through a peer educator or paralegal you already
              know rather than email — response times here are not guaranteed to be immediate, and
              email is not a secure channel.
            </p>
          </Reveal>
        </div>
      </section>

      <MapSection />
    </div>
  );
}
