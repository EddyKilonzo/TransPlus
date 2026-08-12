import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import Reveal from "./Reveal";

export const INSTAGRAM_PROFILE = "https://www.instagram.com/trans.plus.ug/";

/** Post shortcodes, newest first. */
const POSTS = [
  "Db5hFQGghL1",
  "Db5gtV4AvE4",
  "Dbkz9p3idub",
  "Dbkz0CJij2I",
  "DbkzsEFiVk3",
  "DbkzZFFCuIT",
  "Da0Z1hFi5Ci",
  "DRwdrnZAk0_",
  "DRwdoTtAgRy",
];

const permalink = (code: string) => `https://www.instagram.com/p/${code}/`;

/** rotating accent so the column flow doesn't read as one flat block */
const ACCENTS = [
  { text: "text-pine", bar: "from-pine via-moss to-leaf", wash: "from-pine/[0.07]", ring: "hover:border-pine/30" },
  { text: "text-moss", bar: "from-moss via-leaf to-pine", wash: "from-moss/[0.09]", ring: "hover:border-moss/30" },
  { text: "text-warm", bar: "from-warm via-warm/60 to-leaf", wash: "from-warm/[0.09]", ring: "hover:border-warm/30" },
];

const EMBED_SRC = "https://www.instagram.com/embed.js";
/** embed.js swaps blockquotes for iframes asynchronously and quietly skips
 *  some of them under load — re-run process() a few times before giving up. */
const PROCESS_DELAYS = [0, 500, 1400, 3000, 5200];
/** how long a card may stay un-rendered before it falls back to a link tile */
const GIVE_UP_MS = 9000;

declare global {
  interface Window {
    instgrm?: { Embeds?: { process?: () => void } };
  }
}

let scriptPromise: Promise<void> | null = null;

/**
 * Loads embed.js at most once per page. Rejects — rather than hanging — when
 * the script is blocked by a tracker blocker, a CSP, or a dead network, so the
 * feed can fall back to plain links instead of leaving empty cards behind.
 */
function loadEmbedScript(): Promise<void> {
  if (window.instgrm?.Embeds?.process) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const settle = (reason: string) => {
      if (window.instgrm?.Embeds?.process) return resolve();
      scriptPromise = null; // allow a later mount to retry
      reject(new Error(reason));
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => settle("embed.js loaded without instgrm"), { once: true });
    script.addEventListener("error", () => settle("embed.js failed to load"), { once: true });
    // a tag already in the DOM may have settled before these listeners
    // attached, so bound the wait independently of the events
    window.setTimeout(() => settle("embed.js timed out"), GIVE_UP_MS);

    if (!existing) {
      script.src = EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return scriptPromise;
}

/** keeps the wall staggered even when every embed has fallen back */
const FALLBACK_HEIGHTS = ["min-h-[17rem]", "min-h-[21rem]", "min-h-[19rem]"];

/** Shown in place of an embed that never rendered. */
function FallbackTile({ url, index, accent }: { url: string; index: number; accent: (typeof ACCENTS)[number] }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex flex-col justify-between overflow-hidden p-7 ${FALLBACK_HEIGHTS[index % FALLBACK_HEIGHTS.length]}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.wash} via-transparent to-transparent`} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[8rem] font-bold leading-none text-ink/[0.05]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <Instagram size={26} strokeWidth={1.5} className={`relative ${accent.text}`} />
      <span className="relative">
        <span className="block font-display text-lg font-semibold leading-snug text-ink">
          View this post on Instagram
        </span>
        <span className="mt-2 inline-flex items-center gap-1.5 font-display text-sm font-medium text-ink/55">
          @trans.plus.ug
          <ArrowUpRight size={14} />
        </span>
      </span>
    </a>
  );
}

/** Masonry wall of embedded Instagram posts. */
export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const slots = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(false);
  const [broken, setBroken] = useState<boolean[]>(() => POSTS.map(() => false));

  // don't pull in Instagram's widget until the wall is nearly on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timers: number[] = [];

    // any slot still without an iframe by now is not going to get one
    const audit = () => {
      if (cancelled) return;
      setBroken((prev) => {
        const next = prev.map((was, i) => was || !slots.current[i]?.querySelector("iframe"));
        return next.some((v, i) => v !== prev[i]) ? next : prev;
      });
    };

    loadEmbedScript()
      .then(() => {
        for (const ms of PROCESS_DELAYS) {
          timers.push(window.setTimeout(() => !cancelled && window.instgrm?.Embeds?.process?.(), ms));
        }
        timers.push(window.setTimeout(audit, GIVE_UP_MS));
      })
      .catch(() => !cancelled && setBroken(POSTS.map(() => true)));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return (
    <section ref={sectionRef} className="container-x py-20 sm:py-24" aria-label="Trans+ on Instagram">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">Community / Instagram</span>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Life, in our <span className="text-gradient animate-gradient-pan">own words.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
            Dispatches, events, and everyday wins from the community — straight from our feed.
          </p>
        </div>
        <a
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ink px-5 py-3 font-display text-sm font-medium text-white transition-colors hover:bg-pine"
        >
          <Instagram size={17} strokeWidth={1.75} />
          @trans.plus.ug
          <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>

      <div className="masonry masonry-3 masonry-wide mt-12">
        {POSTS.map((code, i) => {
          const url = permalink(code);
          const accent = ACCENTS[i % ACCENTS.length];
          const failed = broken[i];

          return (
            <Reveal key={code} delay={(i % 3) * 0.08} className="group">
              <article
                className={`frost overflow-hidden rounded-[1.75rem] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_70px_-34px_rgba(31,122,77,0.5)] ${accent.ring}`}
              >
                {/* gradient hairline that sweeps in on hover */}
                <div
                  aria-hidden="true"
                  className={`h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r ${accent.bar} transition-transform duration-500 group-hover:scale-x-100`}
                />

                {/* the embed carries Instagram's own header, so ours stays to an
                    index, a rule, and the escape hatch */}
                <header className="flex items-center gap-3 border-b border-ink/[0.06] px-5 py-3">
                  <span className={`font-display text-[11px] font-bold tracking-[0.18em] ${accent.text}`}>
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-ink/25"> / {String(POSTS.length).padStart(2, "0")}</span>
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-ink/[0.08]" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Instagram post ${i + 1} in a new tab`}
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/[0.08] text-ink/45 transition-colors hover:bg-pine hover:text-white"
                  >
                    <ArrowUpRight size={13} />
                  </a>
                </header>

                {/* Instagram replaces this blockquote with its own iframe, so React
                    only ever toggles the wrapper's class — it never has to reconcile
                    children the widget has swapped out from under it. */}
                <div
                  ref={(el) => {
                    slots.current[i] = el;
                  }}
                  className={`ig-slot ${failed ? "hidden" : ""}`}
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[26rem] flex-col items-center justify-center gap-3 p-8 text-center"
                    >
                      <Instagram size={28} strokeWidth={1.5} className="text-pine" />
                      <span className="font-display text-sm font-medium text-ink/60">
                        View this post on Instagram
                      </span>
                    </a>
                  </blockquote>
                </div>

                {failed && <FallbackTile url={url} index={i} accent={accent} />}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
