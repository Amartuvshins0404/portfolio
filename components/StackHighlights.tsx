import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TechIcon, techTint } from "@/components/tech-icon";
import { getTechIcon } from "@/lib/tech-icons";
import type { CMSSkill } from "@/lib/cms";

const HIGHLIGHT_CATEGORIES = ["Frontend", "Backend", "Data", "AI"];

export default function StackHighlights({ skills }: { skills: CMSSkill[] }) {
  const picks = HIGHLIGHT_CATEGORIES.map((category) =>
    skills.find((skill) => skill.category === category)
  ).filter((skill): skill is CMSSkill => Boolean(skill));

  if (picks.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {picks.map((skill) => {
        const icon = getTechIcon(skill.name);
        return (
          <Link
            key={skill.id}
            href="#skills"
            className="group flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 shadow-card transition-colors hover:border-primary/40"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={techTint(icon.kind === "brand" ? icon.hex : undefined)}
              >
                <TechIcon name={skill.name} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {skill.name}
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  {skill.category}
                </span>
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        );
      })}
    </div>
  );
}
