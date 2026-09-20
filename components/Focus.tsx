import Link from "next/link";
import { Bot, Layers, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/portfolio-motion";

const focusAreas = [
  {
    icon: ShieldCheck,
    title: "Application Security",
    description:
      "Triage of code-scanning alerts, vulnerability remediation, and hardening across a TypeScript GraphQL Federation monorepo at erxes.",
    tags: ["CodeQL", "OWASP", "SAST", "Vulnerability Triage", "GraphQL Federation"],
    href: "/blog",
  },
  {
    icon: Bot,
    title: "AI Agent Workflows",
    description:
      "Designing agentic developer loops with Claude Code, custom MCP servers, and tightly scoped skills so one engineer can ship like a team.",
    tags: ["MCP servers", "Claude Code", "Agentic engineering", "RAG", "n8n"],
    href: "/blog",
  },
  {
    icon: Layers,
    title: "Full-Stack Product Engineering",
    description:
      "Shipping production products end to end with Next.js, React, TypeScript, PostgreSQL, and Cloudflare — from CMS-driven sites to three-sided logistics platforms.",
    tags: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Cloudflare"],
    href: "/blog?type=case-studies",
  },
] as const;

export default function Focus() {
  return (
    <section id="focus" className="border-b border-border/60 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl space-y-14 px-4 md:px-6">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              Focus
            </div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Application security, AI agent workflows, and full-stack systems.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground md:text-right">
            The three areas most of my work and writing sit in.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-4 md:grid-cols-3">
            {focusAreas.map(({ icon: Icon, title, description, tags, href }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-3xl border border-border/40 bg-card/90 p-6 transition-colors duration-300 hover:border-border/80 md:p-7"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/30 bg-muted/60 px-2.5 py-1 text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={href}
                  className="mt-auto pt-8 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Read related writing →
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
