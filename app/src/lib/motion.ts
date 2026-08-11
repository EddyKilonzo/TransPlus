export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll reveal preset shared by every page.
 *
 * `amount: 0.05` + no negative root margin matters: during a route transition the
 * PageShell is still animating when children mount, and a stricter threshold lets
 * the observer miss elements that are already on screen — which left sections stuck
 * at opacity 0 until a manual refresh.
 */
export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 } as const,
    transition: { duration: 0.6, delay, ease: EASE },
  };
}
