import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";

const APPROACH = [
  {
    n: "01",
    label: "Community",
    desc: "Organizing led by the people directly affected.",
    detail: "Every programme is designed by organizers with lived experience of the risk.",
  },
  {
    n: "02",
    label: "Safety",
    desc: "Tools and training that reduce harm in real time.",
    detail: "Screening, alerts, and security training that work at a checkpoint, not just on paper.",
  },
  {
    n: "03",
    label: "Rights",
    desc: "Legal aid and advocacy that shift what's possible.",
    detail: "Rapid response at the point of arrest, and the longer fight to change the law itself.",
  },
  {
    n: "04",
    label: "Technology",
    desc: "Secure platforms built for anonymity by design.",
    detail: "Anonymity treated as a hard requirement, evaluated against a real threat model.",
  },
];

type ApproachTimelineProps = { tone?: "light" | "dark" };

function Step({ step, tone }: { step: (typeof APPROACH)[number]; tone: "light" | "dark" }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  const y = useTransform(p, [0, 1], reduced ? [0, 0] : [40, 0]);
  const scale = useTransform(p, [0, 1], reduced ? [1, 1] : [0.96, 1]);

  const dark = tone === "dark";

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={`rounded-[1.75rem] border p-7 backdrop-blur-md sm:p-8 ${
        dark
          ? "border-white/15 bg-white/[0.08] shadow-[0_-14px_44px_-26px_rgba(0,0,0,0.75)]"
          : "border-ink/[0.08] bg-white/80 shadow-[0_-14px_44px_-28px_rgba(14,18,15,0.45)]"
      }`}
    >
      <div className="flex items-start gap-5 sm:gap-6">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-semibold ${
            dark ? "bg-leaf/15 text-leaf" : "bg-pine/10 text-pine"
          }`}
        >
          {step.n}
        </span>
        <div className="text-left">
          <h3 className={`font-display text-2xl font-semibold ${dark ? "text-white" : "text-ink"}`}>
            {step.label}
          </h3>
          <p className={`mt-2 text-base ${dark ? "text-white/70" : "text-ink/70"}`}>{step.desc}</p>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/45" : "text-ink/50"}`}>
            {step.detail}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`ml-auto hidden select-none font-display text-6xl font-bold leading-none sm:block ${
            dark ? "text-white/[0.07]" : "text-ink/[0.06]"
          }`}
        >
          {step.n}
        </span>
      </div>
    </motion.div>
  );
}

export default function ApproachTimeline({ tone = "light" }: ApproachTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.65"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const dark = tone === "dark";

  return (
    <div ref={ref} className="relative mt-14">
      {/* progress rail — draws down as the steps stack */}
      <div
        className={`absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px sm:block ${
          dark ? "bg-white/10" : "bg-ink/10"
        }`}
      />
      <motion.div
        style={{ scaleY }}
        className={`absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px origin-top sm:block ${
          dark ? "bg-leaf" : "bg-pine"
        }`}
      />

      <div className="flex flex-col gap-6 sm:pl-16">
        {APPROACH.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.05} className="sticky" style={{ top: `${112 + i * 18}px` }}>
            <Step step={step} tone={tone} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
