import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  GitBranch,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CMSProfile, CMSStat } from "@/lib/cms";
import type {
  ServiceOffer,
  ServiceProcessStep,
  ServiceSite,
} from "@/lib/directus";

const processIcons = {
  qualify: Handshake,
  diagnose: Eye,
  decide: GitBranch,
  deliver: ClipboardCheck,
  transfer: CheckCircle2,
};

export function ServiceHero({
  profile,
  stats,
  site,
  featuredOffer,
}: {
  profile: CMSProfile | null;
  stats: CMSStat[];
  site: ServiceSite | null;
  featuredOffer: ServiceOffer | null;
}) {
  const visibleStats = stats.slice(0, 3);
  const contactEmail =
    site?.contact_email ?? profile?.email ?? "amaraaamka0404@gmail.com";

  return (
    <section
      id="backtop"
      className="relative isolate overflow-hidden border-b border-border/60"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-400/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-44 -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-400/10"
      />

      <div className="container mx-auto grid min-h-[calc(100svh-96px)] max-w-7xl items-center gap-12 px-4 pb-20 pt-28 md:px-6 lg:grid-cols-[1.08fr_0.72fr] lg:gap-20 lg:pb-28 lg:pt-36">
        <div className="max-w-4xl">

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            {site?.hero_title ??
              "Define the right system. Lead it until it works."}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {site?.hero_description ??
              "I diagnose the real problem, make the buy-or-build decision, and lead implementation through adoption."}
          </p>

          <div className="relative z-10 mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-7 text-sm"
            >
              <Link href="#contact">
                {site?.hero_primary_cta ?? "Discuss your problem"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full bg-background/70 px-7 text-sm backdrop-blur"
            >
              <Link href="#services">
                {site?.hero_secondary_cta ?? "See the starting offer"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {visibleStats.length > 0 ? (
            <dl className="mt-12 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-border/60 bg-background/65 backdrop-blur">
              {visibleStats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`px-4 py-4 md:px-6 ${
                    index > 0 ? "border-l border-border/60" : ""
                  }`}
                >
                  <dd className="text-xl font-semibold tracking-tight md:text-2xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <aside
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto"
          aria-label="Starting engagement"
        >
          <div className="absolute -inset-8 -z-10 rounded-full bg-primary/5 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] bg-foreground text-background shadow-2xl shadow-primary/10">
            <div className="flex items-start justify-between gap-6 border-b border-background/15 p-6 md:p-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/55">
                  {site?.offer_eyebrow ?? "The starting point"}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
                  {featuredOffer?.title ??
                    site?.offer_title ??
                    "System Decision Sprint"}
                </h2>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-background text-foreground">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>

            <div className="space-y-6 p-6 md:p-8">
              <p className="text-base leading-relaxed text-background/70">
                {featuredOffer?.summary ?? site?.offer_description}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {featuredOffer?.duration ? (
                  <div className="rounded-2xl border border-background/15 bg-background/[0.06] p-4">
                    <span className="block text-xs text-background/50">
                      Duration
                    </span>
                    <strong className="mt-1 block text-sm font-medium">
                      {featuredOffer.duration}
                    </strong>
                  </div>
                ) : null}
                {featuredOffer?.outcome ? (
                  <div className="rounded-2xl border border-background/15 bg-background/[0.06] p-4">
                    <span className="block text-xs text-background/50">
                      Outcome
                    </span>
                    <strong className="mt-1 block text-sm font-medium leading-snug">
                      A defensible next decision
                    </strong>
                  </div>
                ) : null}
              </div>

              {site?.trust_note ? (
                <p className="border-l border-background/25 pl-4 text-sm leading-relaxed text-background/60">
                  {site.trust_note}
                </p>
              ) : null}

              <Link
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                {featuredOffer?.cta_label ?? "Start a conversation"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function DeliveryProcess({
  site,
  steps,
}: {
  site: ServiceSite | null;
  steps: ServiceProcessStep[];
}) {
  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      className="scroll-mt-24 border-y border-border/60 bg-muted/25 py-24 md:py-32"
      aria-labelledby="process-title"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {site?.process_eyebrow ?? "Operating method"}
            </p>
            <h2
              id="process-title"
              className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl"
            >
              {site?.process_title ?? "Reduce uncertainty at every stage."}
            </h2>
          </div>
          {site?.trust_note ? (
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:justify-self-end">
              {site.trust_note}
            </p>
          ) : null}
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-card sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon =
              processIcons[step.key as keyof typeof processIcons] ??
              CheckCircle2;
            return (
              <article
                key={step.id}
                className="relative border-b border-border/60 p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:nth-child(odd)]:border-r"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
