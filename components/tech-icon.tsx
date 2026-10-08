import type { CSSProperties } from "react";
import { getTechIcon, isNearBlack } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export function techTint(hex?: string): CSSProperties {
  if (!hex || isNearBlack(hex)) {
    return { backgroundColor: "var(--muted)" };
  }
  return { backgroundColor: `#${hex}1A` };
}

export function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const icon = getTechIcon(name);

  if (icon.kind === "lucide") {
    const Icon = icon.Icon;
    return <Icon className={cn("text-primary", className)} />;
  }

  const nearBlack = isNearBlack(icon.hex);
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={className}
      style={nearBlack ? undefined : { color: `#${icon.hex}` }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
