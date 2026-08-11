type MarqueeProps = {
  items: string[];
  tone?: "light" | "dark";
};

export default function Marquee({ items, tone = "light" }: MarqueeProps) {
  const border = tone === "dark" ? "border-white/10" : "panel-line border-y";
  const text = tone === "dark" ? "text-white/40" : "text-ink/40";
  const dot = tone === "dark" ? "text-leaf" : "text-pine";

  return (
    <div aria-hidden="true" className={`overflow-hidden py-5 ${border}`}>
      <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-8">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 font-display text-sm font-medium uppercase tracking-[0.2em] ${text}`}
          >
            {item} <span className={dot}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
