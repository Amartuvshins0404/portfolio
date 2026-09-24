import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  Fade,
  LocalClock,
  MagneticName,
  RotatingWords,
  Rule,
} from "@/components/hero-type";
import type {
  CMSActivity,
  CMSProfile,
  CMSSiteSettings,
  CMSStat,
  CMSSocialLink,
} from "@/lib/cms";

const builds = [
  "secure products",
  "AI agent workflows",
  "MCP servers",
  "full-stack apps",
];

export default function Hero({
  socialLinks,
  profile,
  activities = [],
}: {
  stats: CMSStat[];
  socialLinks: CMSSocialLink[];
  settings: CMSSiteSettings | null;
  profile: CMSProfile | null;
  activities?: CMSActivity[];
}) {
  const name = profile?.name ?? "Amartuvshin Surenjav";
  const role = profile?.job_title ?? "Software Engineer";
  const company = profile?.company ?? "erxes";
  const location = profile?.location ?? "Ulaanbaatar, Mongolia";
  const city = location.split(",")[0];
  const lines = name.split(" ");
  const now = activities.slice(0, 3);

  return (
    <section
      id="backtop"
      className="relative isolate flex min-h-[calc(100svh-96px)] flex-col justify-end overflow-hidden border-b border-border/60 pb-10 pt-32 md:pb-14 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_40%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_40%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_78%)]"
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Fade className="flex items-baseline justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>
            {role} · {company}
          </p>
          <p className="hidden sm:block">
            {city} · <LocalClock timeZone="Asia/Ulaanbaatar" /> UTC+8
          </p>
        </Fade>

        <MagneticName
          lines={lines}
          className="mt-8 text-[clamp(2.75rem,13.2vw,11.5rem)] uppercase leading-[0.86] tracking-[-0.05em] md:mt-12"
        />

        <Rule delay={0.9} className="mt-10 md:mt-14" />

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:gap-8">
          <Fade delay={1} className="md:col-span-7">
            <p className="text-2xl leading-[1.15] tracking-[-0.03em] sm:text-3xl md:text-4xl">
              I build{" "}
              <RotatingWords words={builds} className="text-foreground" />
              <span className="hidden text-muted-foreground sm:inline">
                {" "}
                — end to end.
              </span>
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Software engineer in Mongolia building AI agents and full-stack
              products. Security engineering on a GraphQL Federation platform
              by day; agentic developer tooling, MCP servers and Next.js
              products the rest of the time.
              {profile?.available_for_freelance !== false
                ? " Available for freelance and remote work."
                : null}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 font-medium text-foreground"
              >
                Selected work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                Writing
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Fade>

          <Fade delay={1.15} className="md:col-span-5 md:pl-8">
            {now.length > 0 ? (
              <dl className="border-t border-border/60">
                {now.map((a) => (
                  <div
                    key={a.id}
                    className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border/60 py-3 text-sm"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {a.label}
                    </dt>
                    <dd className="text-foreground">{a.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {socialLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.platform}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </Fade>
        </div>
      </div>
    </section>
  );
}
