import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  InstagramIcon,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HeroFade,
  HeroOrb,
  HeroWords,
  ScrollCue,
} from "@/components/hero-motion";
import type {
  CMSProfile,
  CMSSiteSettings,
  CMSStat,
  CMSSocialLink,
} from "@/lib/cms";

const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="h-4 w-4" />,
  Github: <Github className="h-4 w-4" />,
  Twitter: <Twitter className="h-4 w-4" />,
  Instagram: <InstagramIcon className="h-4 w-4" />,
};

export default function Hero({
  socialLinks,
  settings,
  profile,
}: {
  stats: CMSStat[];
  socialLinks: CMSSocialLink[];
  settings: CMSSiteSettings | null;
  profile: CMSProfile | null;
}) {
  const name = profile?.name ?? "Amartuvshin Surenjav";
  const role = profile?.job_title ?? "Software Engineer";
  const location = profile?.location ?? "Ulaanbaatar, Mongolia";

  return (
    <section
      id="backtop"
      className="relative isolate flex min-h-[calc(100svh-96px)] items-center overflow-hidden border-b border-border/60 pb-20 pt-28 md:pb-28 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_40%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_40%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]"
      />

      <div className="container mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <HeroFade>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {name} · {role} · {location}
            </p>
          </HeroFade>

          <HeroWords
            text={
              settings?.tagline ??
              "Software engineer building secure products and AI systems."
            }
            className="max-w-4xl text-[2.75rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[5.35rem]"
          />

          <HeroFade delay={0.55}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {settings?.subtitle ??
                "Application security, AI agent workflows, and full-stack products — shipped end to end."}
            </p>
          </HeroFade>

          <HeroFade
            delay={0.7}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-7 text-sm"
            >
              <Link href="#projects">
                {settings?.hero_primary_cta ?? "View selected work"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full bg-background/70 px-7 text-sm backdrop-blur"
            >
              <Link href="#contact">
                {settings?.hero_secondary_cta ?? "Start a conversation"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </HeroFade>

          {socialLinks.length > 0 ? (
            <HeroFade delay={0.85} className="mt-10 flex gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground"
                >
                  {iconMap[link.icon] ?? <Linkedin className="h-4 w-4" />}
                </Link>
              ))}
            </HeroFade>
          ) : null}
        </div>

        <div className="order-first pb-8 lg:order-none lg:pb-0">
          <HeroOrb
            src={profile?.profile_image ?? "/profile.jpg"}
            alt={name}
            label={`${role} · ${profile?.company ?? "erxes"}`}
          />
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
