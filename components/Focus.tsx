import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio-motion";
import type { CMSFocusArea, CMSSiteSettings } from "@/lib/cms";

const FALLBACK_FOCUS_AREAS: Pick<
  CMSFocusArea,
  "title" | "line" | "keywords" | "href"
>[] = [
  {
    title: "AI Agents in Products",
    line: "erxes-agent: durable agents that call permission-checked tools across an enterprise platform, with human approval where it matters.",
    keywords: ["erxes-agent", "Mastra", "GraphQL Federation"],
    href: "/blog/erxes-ai-agents-plugin-case-study",
  },
  {
    title: "AI Agent Workflows",
    line: "Claude Code, custom MCP servers, and scoped skills for one-engineer teams.",
    keywords: ["MCP servers", "Claude Code", "Agentic engineering"],
    href: "/blog",
  },
  {
    title: "Full-Stack Products",
    line: "Next.js, TypeScript, and PostgreSQL products shipped end to end.",
    keywords: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "/blog?type=case-studies",
  },
];

export default function Focus({
  areas,
  settings,
}: {
  areas: CMSFocusArea[];
  settings: CMSSiteSettings | null;
}) {
  const list = areas.length > 0 ? areas : FALLBACK_FOCUS_AREAS;

  return (
    <section id="focus" className="card-surface p-6 sm:p-10">
      <Reveal>
        <span className="section-badge">
          {settings?.focus_eyebrow ?? "Focus"}
        </span>
      </Reveal>
      <h2 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
        {settings?.focus_title ??
          "AI agents in products, agentic developer workflows, and full-stack systems."}
      </h2>
      <div className="mt-8 grid gap-8 border-t border-border/70 pt-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border/70">
        {list.map((area, i) => (
          <Link
            key={area.title}
            href={area.href}
            className="group block md:px-6 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 flex items-center gap-2 text-lg font-bold tracking-tight">
              {area.title}
              <ArrowUpRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
              {area.line}
            </span>
            <span className="mt-4 block text-xs text-muted-foreground">
              {area.keywords.join(" · ")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
