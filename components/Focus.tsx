import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Line, Row, TextReveal } from "@/components/section-motion";

const focusAreas = [
  {
    title: "Application Security",
    line: "Code-scanning triage and remediation in a GraphQL Federation monorepo.",
    keywords: ["CodeQL", "OWASP", "GraphQL Federation"],
    href: "/blog",
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
] as const;

export default function Focus() {
  return (
    <section id="focus" className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground md:col-span-3">
            Focus
          </p>
          <TextReveal
            as="h2"
            text="Application security, AI agent workflows, and full-stack systems."
            className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:col-span-9 md:text-5xl"
          />
        </div>

        <div className="mt-16 md:mt-20">
          <Line />
        </div>
        <ul>
          {focusAreas.map((area, i) => (
            <Row key={area.title} index={i}>
              <Link
                href={area.href}
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-7 md:grid-cols-12 md:gap-6 md:py-9"
              >
                <span className="font-mono text-xs text-muted-foreground md:col-span-1">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                  {area.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:order-last md:col-span-1 md:justify-self-end" />
                <div className="col-span-3 mt-3 space-y-2 md:col-span-5 md:mt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {area.line}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {area.keywords.join(" · ")}
                  </p>
                </div>
              </Link>
              <span className="block h-px w-full bg-border" />
            </Row>
          ))}
        </ul>
      </div>
    </section>
  );
}
