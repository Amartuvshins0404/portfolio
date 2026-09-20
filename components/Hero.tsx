import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  InstagramIcon,
  Linkedin,
  MapPin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/portfolio-motion";
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
  stats,
  socialLinks,
  settings,
  profile,
}: {
  stats: CMSStat[];
  socialLinks: CMSSocialLink[];
  settings: CMSSiteSettings | null;
  profile: CMSProfile | null;
}) {
  return (
    <section
      id="backtop"
      className="relative isolate flex min-h-[calc(100svh-96px)] items-center overflow-hidden border-b border-border/60 pb-16 pt-24 md:pb-28 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_40%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_40%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="container mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.08fr_0.72fr] lg:gap-20">
        <div>
          <Reveal distance={30}>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {profile?.name ?? "Amartuvshin Surenjav"} ·{" "}
              {profile?.job_title ?? "Software Engineer"} ·{" "}
              {profile?.location ?? "Ulaanbaatar, Mongolia"}
            </p>
            <h1 className="max-w-5xl text-[2.75rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[5.35rem]">
              {settings?.tagline ??
                "Software engineer building secure products and AI systems."}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {settings?.subtitle ??
                "I design and ship production software, build AI-native workflows, and turn complex requirements into reliable products."}
            </p>
          </Reveal>

          <Reveal
            delay={0.12}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
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
          </Reveal>

          {stats.length > 0 ? (
            <Reveal
              delay={0.2}
              className="mt-12 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-border/60 bg-background/65 backdrop-blur"
            >
              {stats.slice(0, 3).map((stat, index) => (
                <div
                  key={stat.id}
                  className={`px-4 py-4 md:px-6 ${
                    index > 0 ? "border-l border-border/60" : ""
                  }`}
                >
                  <span className="text-xl font-semibold tracking-tight md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </Reveal>
          ) : null}
        </div>

        <Reveal
          delay={0.16}
          distance={26}
          className="mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto"
        >
          <aside className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-6 shadow-2xl shadow-primary/5 md:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl"
            />

            <div className="relative flex items-start gap-5">
              <Image
                src={profile?.profile_image ?? "/profile.jpg"}
                alt={profile?.name ?? "Amartuvshin Surenjav"}
                width={112}
                height={112}
                priority
                className="h-24 w-24 rounded-3xl border border-border/60 object-cover md:h-28 md:w-28"
              />
              <div className="min-w-0 pt-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {settings?.hero_profile_eyebrow ?? "Portfolio"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                  {profile?.name ?? "Amartuvshin Surenjav"}
                </h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile?.location ?? "Ulaanbaatar, Mongolia"}
                </p>
              </div>
            </div>

            <div className="relative mt-7 rounded-2xl border border-border/60 bg-muted/40 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {settings?.hero_current_role_label ?? "Current role"}
              </p>
              <p className="mt-2 font-medium">
                {profile?.job_title ?? "Software Engineer"}
              </p>
              {profile?.company ? (
                <Link
                  href={profile.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {profile.company}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>

            <div className="relative mt-6 flex flex-wrap gap-2">
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
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
