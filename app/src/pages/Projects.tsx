import { useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { PROJECTS, type Project } from "@/data/projects";

const MARQUEE_ITEMS = ["01 DECRIMINALIZATION", "02 LEGAL SUPPORT", "03 SRHR ACCESS", "04 DIGITAL PLATFORMS"];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // gentle counter-parallax so the image drifts against the text as the row passes
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);
  const numY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, -26]);

  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="frost group relative overflow-hidden rounded-[2rem]"
    >
      {/* opaque base + tint wash — keeps stacked cards from showing through each other */}
      <div className={`pointer-events-none absolute inset-0 ${project.tint}`} aria-hidden="true" />

      <div className="relative grid items-center gap-10 p-8 lg:grid-cols-2 lg:gap-16 lg:p-12">
      {/* Image */}
      <div className={`relative ${flip ? "lg:order-2" : ""}`}>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
          <motion.img
            style={{ y: imgY }}
            src={project.image}
            alt=""
            loading="lazy"
            className="h-[115%] w-full object-cover"
          />
        </div>
        <motion.span
          style={{ y: numY }}
          aria-hidden="true"
          className={`pointer-events-none absolute -top-6 select-none font-display text-[7rem] font-bold leading-none text-ink/[0.09] ${
            flip ? "right-0" : "left-0"
          }`}
        >
          {project.number}
        </motion.span>
      </div>

      {/* Copy */}
      <div className={flip ? "lg:order-1" : ""}>
        <span
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${project.tint} ${project.accent}`}
        >
          <project.icon size={26} strokeWidth={1.75} />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink/72">{project.description}</p>

        <ul className="mt-6 space-y-2">
          {project.approach.map((step) => (
            <li key={step.title} className="flex items-start gap-3 text-sm text-ink/60">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${project.accent}`} />
              {step.title}
            </li>
          ))}
        </ul>

        <Link
          to={`/projects/${project.slug}`}
          className={`mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 font-display text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-current ${project.accent}`}
        >
          Explore this project
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div>
      <Seo
        title="Projects"
        description="Four community-led programs — decriminalization advocacy, legal support, SRHR access, and digital platforms — along the Kenya-Uganda border."
      />
      <PageHero
        eyebrow="Projects"
        titleLines={["Where the", "work lives."]}
        subcopy="Four programs, each tackling a different point of leverage in the same fight for safety and recognition."
        image="/images/7.jpeg"
        accentImage="/images/8.jpeg"
      />

      <Marquee items={MARQUEE_ITEMS} />

      {/* Each row pins, then the next slides up over it */}
      <section className="container-x flex flex-col gap-10 py-16">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} className="sticky" style={{ top: `${104 + i * 22}px` }}>
            <ProjectRow project={project} index={i} />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
