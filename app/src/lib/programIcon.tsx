import { Scale, ShieldCheck, HeartPulse, Lock, type LucideIcon } from "lucide-react";
import type { ProgramArea } from "../data/content";

const ICONS: Record<ProgramArea["icon"], LucideIcon> = {
  scale: Scale,
  shield: ShieldCheck,
  heart: HeartPulse,
  lock: Lock,
};

export function ProgramIcon({ icon, ...props }: { icon: ProgramArea["icon"]; className?: string; size?: number }) {
  const Icon = ICONS[icon];
  return <Icon {...props} />;
}
