import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroFade } from "@/components/hero-motion";
import ShowcaseVideo from "@/components/showcase-video";
import {
  heroVideoUrl,
  type CMSProfile,
  type CMSSiteSettings,
} from "@/lib/cms";

export default function Hero({
  profile,
  settings,
}: {
  profile: CMSProfile | null;
  settings: CMSSiteSettings | null;
}) {
  const name = profile?.name ?? "Amartuvshin Surenjav";
  const role = profile?.job_title ?? "Software Engineer";
  const location = profile?.location ?? "Ulaanbaatar, Mongolia";
  const company = profile?.company ?? "erxes";
  const [firstName, ...restName] = name.split(" ");
  const showcaseVideo = heroVideoUrl(settings);

  return (
    <section
      id="home"
      className="card-surface relative overflow-hidden p-6 sm:p-10 lg:p-12"
    >
      <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <HeroFade>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Hey there, I&apos;m
            </p>
          </HeroFade>

          <HeroFade delay={0.1}>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {firstName}
              {restName.length > 0 ? (
                <>
                  <br />
                  {restName.join(" ")}
                </>
              ) : null}
              <span className="sr-only">
                — {role} in {location}
              </span>
            </h1>
          </HeroFade>

          <HeroFade delay={0.2}>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {role} <span aria-hidden="true">•</span> Based in {location}
            </p>
          </HeroFade>

          <HeroFade delay={0.3}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {settings?.subtitle ??
                "AI agents, platform engineering, and full-stack products — shipped end to end."}
            </p>
          </HeroFade>

          <HeroFade
            delay={0.4}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              {settings?.hero_primary_cta ?? "View selected work"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-semibold transition-colors hover:bg-muted"
            >
              {settings?.hero_secondary_cta ?? "Start a conversation"}
            </Link>
          </HeroFade>
        </div>

        <HeroFade delay={0.25} className="mx-auto lg:mx-0">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={profile?.profile_image || "/profile.jpg"}
                alt={name}
                fill
                priority
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover object-top"
              />
            </div>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border/60 bg-background/70 px-3.5 py-1 text-[11px] font-medium backdrop-blur-md">
              {role} · {company}
            </p>
          </div>
        </HeroFade>
      </div>

      {showcaseVideo ? (
        <div className="relative mt-12 border-t border-border/70 pt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="section-badge">Showcase</span>
            <p className="hidden flex-1 px-4 text-sm text-muted-foreground sm:block">
              erxes — the Experience OS I build on every day
            </p>
            {profile?.company_url ? (
              <Link
                href={profile.company_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent-foreground"
              >
                erxes.io
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          <ShowcaseVideo
            src={showcaseVideo}
            title="erxes platform showcase"
            className="aspect-video"
          />
        </div>
      ) : null}
    </section>
  );
}
