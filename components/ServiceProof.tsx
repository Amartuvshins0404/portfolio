"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, TiltCard } from "@/components/portfolio-motion";
import type { ServiceProof as ServiceProofItem, ServiceSite } from "@/lib/directus";

export default function ServiceProof({
  site,
  items,
}: {
  site: ServiceSite | null;
  items: ServiceProofItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section id="work" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mb-14 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {site?.proof_eyebrow ?? "Systems shipped"}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              {site?.proof_title ?? "Advice grounded in delivery experience."}
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:justify-self-end">
            Real products, real constraints, and measurable delivery—not hypothetical strategy work.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item, index) => (
            <TiltCard
              key={item.id}
              delay={index * 0.06}
              intensity={3}
              className="rounded-[1.75rem] border border-border/60 bg-card p-6 transition-colors hover:border-border md:p-7"
            >
              <Link
                href={item.url ?? "#contact"}
                target={item.url ? "_blank" : undefined}
                rel={item.url ? "noopener noreferrer" : undefined}
                className="group flex h-full min-h-64 flex-col"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-muted-foreground">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="mt-auto pt-16">
                  {item.result ? (
                    <p className="mb-3 text-sm font-medium text-foreground">
                      {item.result}
                    </p>
                  ) : null}
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
