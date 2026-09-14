"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, Scale, ScanSearch } from "lucide-react";
import { Reveal, TiltArticle, TiltCard } from "@/components/portfolio-motion";
import type {
  ServiceFaq,
  ServiceOffer,
  ServiceSite,
} from "@/lib/directus";
import { cn } from "@/lib/utils";

const offerIcons = {
  "system-decision-sprint": Compass,
  "software-vendor-selection": Scale,
  "software-proposal-review": ScanSearch,
};

function deliverables(markdown: string | null): string[] {
  if (!markdown) return [];
  return markdown
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function Services({
  site,
  offers,
  faqs,
}: {
  site: ServiceSite | null;
  offers: ServiceOffer[];
  faqs: ServiceFaq[];
}) {
  if (offers.length === 0 && faqs.length === 0) return null;

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="services-title"
    >
      <div
        aria-hidden="true"
        className="absolute -right-64 top-1/4 h-96 w-96 rounded-full bg-emerald-500/8 blur-[128px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-64 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/8 blur-[128px]"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {offers.length > 0 ? (
          <>
            <Reveal className="mb-14 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {site?.offer_eyebrow ?? "The starting point"}
                </p>
                <h2
                  id="services-title"
                  className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl"
                >
                  {site?.offer_title ?? "Make the right system decision first."}
                </h2>
              </div>
              {site?.offer_description ? (
                <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:justify-self-end">
                  {site.offer_description}
                </p>
              ) : null}
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {offers.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} index={index} />
              ))}
            </div>
          </>
        ) : null}

        {faqs.length > 0 ? (
          <div id="faq" className="scroll-mt-24 pt-24 md:pt-32">
            <Reveal className="mb-12 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {site?.faq_eyebrow ?? "Questions and answers"}
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                  {site?.faq_title ?? "What to know before we start."}
                </h2>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:justify-self-end">
                Clear expectations before either side commits time or budget.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <FaqCard key={faq.id} faq={faq} index={index} />
              ))}
            </div>

            <Reveal delay={0.12} className="mt-10">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                {site?.nav_apply ?? "Discuss your situation"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OfferCard({
  offer,
  index,
}: {
  offer: ServiceOffer;
  index: number;
}) {
  const Icon =
    offerIcons[offer.slug as keyof typeof offerIcons] ?? Compass;
  const items = deliverables(offer.deliverables);

  return (
    <TiltArticle
      delay={index * 0.07}
      intensity={4}
      className="h-full rounded-[1.75rem]"
    >
      <div
        className={cn(
          "flex h-full flex-col rounded-[1.75rem] border p-6 transition-colors md:p-7",
          offer.featured
            ? "border-foreground bg-foreground text-background shadow-xl shadow-primary/10"
            : "border-border/60 bg-card hover:border-border",
        )}
      >
        <div className="flex items-start justify-between gap-5">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-2xl",
              offer.featured
                ? "bg-background text-foreground"
                : "bg-muted text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
          {offer.duration ? (
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                offer.featured
                  ? "border-background/20 text-background/60"
                  : "border-border text-muted-foreground",
              )}
            >
              {offer.duration}
            </span>
          ) : null}
        </div>

        <div className="mt-8">
          <p
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.18em]",
              offer.featured
                ? "text-background/45"
                : "text-muted-foreground",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
            {offer.title}
          </h3>
          <p
            className={cn(
              "mt-4 text-sm leading-relaxed",
              offer.featured
                ? "text-background/68"
                : "text-muted-foreground",
            )}
          >
            {offer.summary}
          </p>
        </div>

        {items.length > 0 ? (
          <ul
            className={cn(
              "mt-6 space-y-2 border-t pt-5 text-sm",
              offer.featured
                ? "border-background/15 text-background/72"
                : "border-border/60 text-muted-foreground",
            )}
          >
            {items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  className={cn(
                    "mt-2 h-1 w-1 shrink-0 rounded-full",
                    offer.featured ? "bg-background/55" : "bg-foreground/45",
                  )}
                />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-7">
          {offer.outcome ? (
            <p
              className={cn(
                "mb-5 border-l pl-3 text-xs leading-relaxed",
                offer.featured
                  ? "border-background/25 text-background/55"
                  : "border-border text-muted-foreground",
              )}
            >
              {offer.outcome}
            </p>
          ) : null}
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            {offer.cta_label ?? "Discuss this engagement"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </TiltArticle>
  );
}

function FaqCard({
  faq,
  index,
}: {
  faq: ServiceFaq;
  index: number;
}) {
  return (
    <TiltCard
      delay={index * 0.04}
      intensity={2}
      className="rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-border md:p-7"
    >
      <div className="flex items-start gap-4">
        <span className="font-mono text-[10px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-base font-semibold leading-snug tracking-tight md:text-lg">
            {faq.question}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {faq.answer}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}
