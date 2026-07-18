import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CMSProfile, CMSStat } from "@/lib/cms";

const outcomes = [
  "Fast, responsive product experience",
  "CMS, analytics, SEO and integrations",
  "Security review before launch",
  "Source code and clean handover",
];

const capabilities = [
  {
    icon: Sparkles,
    eyebrow: "01 · Define",
    title: "Scope the right product",
    description:
      "Зорилго, хэрэглэгчийн урсгал, амжилтын хэмжүүрээ хамт тодорхойлно. Хийх ажлыг ойлгомжтой scope, хугацаа, үнэд оруулна.",
  },
  {
    icon: Code2,
    eyebrow: "02 · Build",
    title: "Ship in working slices",
    description:
      "Design, frontend, backend, CMS болон интеграцийг нэг урсгалаар хөгжүүлж, тогтмол ажиллаж буй хувилбар үзүүлнэ.",
  },
  {
    icon: Gauge,
    eyebrow: "03 · Validate",
    title: "Test the real journey",
    description:
      "Mobile, performance, SEO, accessibility болон хэрэглэгчийн гол үйлдлүүдийг production орчинтой адил нөхцөлд шалгана.",
  },
  {
    icon: Rocket,
    eyebrow: "04 · Launch",
    title: "Deploy and hand over",
    description:
      "Domain, hosting, monitoring, analytics-ийг тохируулж production-д гаргана. Код болон удирдлагыг бүрэн шилжүүлнэ.",
  },
];

export function ServiceHero({
  profile,
  stats,
}: {
  profile: CMSProfile | null;
  stats: CMSStat[];
}) {
  const email = profile?.email ?? "amaraaamka0404@gmail.com";
  const visibleStats = stats.filter((stat) => stat.label !== "Amaraa").slice(0, 3);

  return (
    <section id="backtop" className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_85%_35%,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="container mx-auto grid min-h-[calc(100svh-96px)] max-w-7xl items-center gap-14 px-4 py-20 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile?.available_for_freelance === false
              ? "Next project waitlist open"
              : "Шинэ төсөл авч байна · Available for work"}
          </div>

          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Web products · AI workflows · Security
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            Санааг тань ажилладаг
            <span className="block text-muted-foreground">digital product болгоно.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Улаанбаатарт суурилсан end-to-end product engineering. Marketing сайтаас эхлээд AI-тэй production систем хүртэл — design, development, security, launch-ийг нэг дор.
          </p>

          <div className="relative z-[60] mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-sm">
              <Link href="#contact">
                Төслөө ярилцах <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-sm">
              <Link href="#projects">
                Хийсэн ажлууд <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {visibleStats.length > 0 && (
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-border/60 pt-6">
              {visibleStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <aside className="relative mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto" aria-label="Delivery promise">
          <div className="absolute -inset-8 -z-10 rounded-full bg-primary/5 blur-3xl" />
          <div className="rounded-[2rem] border border-border/60 bg-card/85 p-6 shadow-2xl shadow-primary/5 backdrop-blur md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-border/60 pb-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">End-to-end delivery</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">One owner. No handoff gaps.</h2>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>

            <ul className="space-y-4 py-6">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3 border-t border-border/60 pt-6 text-sm">
              <div className="rounded-2xl bg-muted/60 p-4">
                <span className="block text-xs text-muted-foreground">Based in</span>
                <strong className="mt-1 block font-medium">Ulaanbaatar · UTC+8</strong>
              </div>
              <Link href={`mailto:${email}`} className="group rounded-2xl bg-foreground p-4 text-background transition-opacity hover:opacity-90">
                <span className="block text-xs text-background/60">Direct contact</span>
                <strong className="mt-1 flex items-center gap-1 font-medium">
                  Send a brief <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </strong>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function DeliveryProcess() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-border/50 bg-muted/20 py-24 md:py-32" aria-labelledby="process-title">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Process · Ажлын явц</p>
            <h2 id="process-title" className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.045em] md:text-6xl">
              Clear scope. Fast feedback. Production launch.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:justify-self-end">
            Төслийн явц үргэлж харагдана. Эхний өдрөөс ажилладаг хувилбар руу чиглэж, эрсдэлийг эрт илрүүлэн, хэрэггүй ажлыг хасна.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-card md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, eyebrow, title, description }, index) => (
            <article
              key={title}
              className={`relative p-6 md:p-8 ${index < capabilities.length - 1 ? "border-b border-border/60 lg:border-b-0 lg:border-r" : ""} ${index === 1 ? "md:border-r-0 lg:border-r" : ""}`}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
