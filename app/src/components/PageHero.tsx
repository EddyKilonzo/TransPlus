import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type PageHeroProps = {
  eyebrow: string;
  titleLines: [string, string];
  subcopy?: string;
  image: string;
  imageAlt?: string;
  accentImage?: string;
  children?: ReactNode;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageHero({
  eyebrow,
  titleLines,
  subcopy,
  image,
  imageAlt = "",
  accentImage,
  children,
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.06]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <section ref={ref} className="container-x grid items-center gap-16 pt-32 pb-24 sm:pt-40 lg:grid-cols-2">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.span variants={item} className="eyebrow block">
          {eyebrow}
        </motion.span>

        <h1 className="mt-6 overflow-hidden font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl">
          <span className="block overflow-hidden">
            <motion.span variants={item} className="block">
              {titleLines[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={item} className="block text-pine">
              {titleLines[1]}
            </motion.span>
          </span>
        </h1>

        {subcopy && (
          <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            {subcopy}
          </motion.p>
        )}
        {children && (
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            {children}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: reduced ? 0 : -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
        className="relative mx-auto aspect-[4/5] w-full max-w-sm"
      >
        <motion.div
          style={{ y, scale }}
          className="glow-card h-full w-full overflow-hidden rounded-[2rem] border-4 border-white bg-fog shadow-2xl"
        >
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </motion.div>

        {accentImage && (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="absolute -bottom-8 -left-8 hidden h-36 w-36 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block"
          >
            <img src={accentImage} alt="" className="h-full w-full object-cover" />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
