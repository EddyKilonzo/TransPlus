import type { LucideIcon } from "lucide-react";
import { useId } from "react";

type SpinningBadgeProps = {
  /** repeated around the ring — keep it short, it is duplicated to fill the circle */
  text: string;
  icon: LucideIcon;
  tone?: "pine" | "leaf";
  size?: "sm" | "md";
  className?: string;
};

export default function SpinningBadge({
  text,
  icon: Icon,
  tone = "pine",
  size = "md",
  className = "",
}: SpinningBadgeProps) {
  const id = useId().replace(/:/g, "");
  const ring = tone === "pine" ? "text-pine" : "text-leaf";
  const core = tone === "pine" ? "bg-pine text-white" : "bg-leaf text-night";
  const box = size === "sm" ? "h-28 w-28" : "h-40 w-40";
  const coreBox = size === "sm" ? "h-11 w-11" : "h-16 w-16";
  const label = `${text} · `.repeat(3);

  return (
    <div className={`relative shrink-0 ${box} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className={`h-full w-full motion-safe:animate-[spin_18s_linear_infinite] ${ring}`}
      >
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text
          fontSize={size === "sm" ? 15 : 13}
          fontWeight={600}
          letterSpacing="1.5"
          className="fill-current uppercase"
        >
          <textPath href={`#${id}`} startOffset="0%">
            {label}
          </textPath>
        </text>
      </svg>
      <span
        className={`absolute inset-0 m-auto flex items-center justify-center rounded-full ${coreBox} ${core}`}
      >
        <Icon size={size === "sm" ? 16 : 22} />
      </span>
    </div>
  );
}
