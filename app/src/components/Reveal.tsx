import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Variant = "up" | "left" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  /** rendered element — keeps grid/flex parents working (figure, article, li…) */
  as?: ElementType;
  delay?: number;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
};

const OFFSET: Record<Variant, { x?: number; y?: number; scale?: number }> = {
  up: { y: 44 },
  left: { x: -44 },
  right: { x: 44 },
  scale: { scale: 0.94, y: 20 },
};

/**
 * Scroll reveal that cannot get stuck.
 *
 * framer-motion's `whileInView` sets up an IntersectionObserver on mount. During a
 * route transition the page is still animating when children mount, and anything
 * already on screen could end up never receiving an intersection callback — leaving
 * it at opacity 0 until a manual refresh. The synchronous rect check below covers
 * that case; the observer handles everything further down the page.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  variant = "up",
  className,
  style,
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The observer emits an initial callback right after observe(), so anything
    // already on screen reveals without waiting for a scroll — that is what stops
    // sections from staying blank after a route change. It also stays connected, so
    // an element re-reveals every time it comes back into view.
    const io = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), {
      threshold: 0.01,
      rootMargin: "0px 0px -6% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const from = reduced ? { opacity: 0 } : { opacity: 0, ...OFFSET[variant] };
  const to = { opacity: 1, x: 0, y: 0, scale: 1 };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={style}
      initial={from}
      animate={shown ? to : from}
      transition={{ duration: reduced ? 0.3 : 0.75, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
