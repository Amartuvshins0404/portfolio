import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio-motion";
import { Counter } from "@/components/section-motion";
import type {
  CMSActivity,
  CMSEducation,
  CMSProfile,
  CMSSiteSettings,
  CMSStat,
  CMSWorkExperience,
} from "@/lib/cms";

export default function About({
  profile,
  settings,
  stats,
  workExperiences,
  educations,
  activities,
}: {
  profile: CMSProfile | null;
  settings: CMSSiteSettings | null;
  stats: CMSStat[];
  workExperiences: CMSWorkExperience[];
  educations: CMSEducation[];
  activities: CMSActivity[];
}) {
  const paragraphs = profile?.bio_paragraphs?.length
    ? profile.bio_paragraphs
    : [
        profile?.bio_short ??
          "Software engineer building AI agents, production systems, and full-stack products.",
      ];
  const work = workExperiences[0];
  const education = educations[0];
  const github = profile?.github_username ?? "Amartuvshins0404";

  return (
    <section id="about" className="card-surface p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <div>
          <Reveal>
            <span className="section-badge">
              {settings?.about_eyebrow ?? "About"}
            </span>
          </Reveal>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            {settings?.about_title ?? "The short version."}
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                {p}
              </p>
            ))}
          </div>

          {stats.length > 0 ? (
            <dl className="mt-8 grid grid-cols-2 border-y border-border/70 sm:grid-cols-4 sm:divide-x sm:divide-border/70">
              {stats.map((stat) => {
                const hasPlus = stat.value.trimEnd().endsWith("+");
                const display = hasPlus
                  ? stat.value.trimEnd().slice(0, -1)
                  : stat.value;
                return (
                  <div
                    key={stat.id}
                    className="py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <dd className="text-2xl font-bold tracking-tight">
                      {display}
                      {hasPlus ? (
                        <span className="text-primary">+</span>
                      ) : null}
                    </dd>
                    <dt className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                );
              })}
            </dl>
          ) : null}

          {activities.length > 0 ? (
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {settings?.about_currently_label ?? "Currently"}
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                {activities.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>
                      <span className="font-semibold">{a.label}</span>
                      <span className="text-muted-foreground"> — {a.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="max-lg:border-t max-lg:pt-6 lg:border-l lg:border-border/70 lg:pl-8">
          <dl className="divide-y divide-border/70">
            <div className="py-5 first:pt-0">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {settings?.about_work_label ?? "Work"}
              </dt>
              <dd className="mt-2 font-semibold">
                {work?.role ?? profile?.job_title ?? "Software Engineer"}
              </dd>
              {work ? (
                <dd className="mt-1">
                  <Link
                    href={work.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {work.company}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </dd>
              ) : null}
              {work ? (
                <dd className="mt-1 font-mono text-xs text-muted-foreground">
                  {work.period}
                </dd>
              ) : null}
            </div>

            <div className="py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {settings?.about_education_label ?? "Education"}
              </dt>
              <dd className="mt-2 font-semibold">
                {education?.degree ?? "—"}
              </dd>
              <dd className="mt-1 text-sm text-muted-foreground">
                {education?.institution}
              </dd>
              {education ? (
                <dd className="mt-1 font-mono text-xs text-muted-foreground">
                  {education.status}
                </dd>
              ) : null}
            </div>

            <div className="py-5">
              <dt className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {settings?.about_github_label ?? "GitHub"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </dt>
              <dd className="mt-2">
                <Link
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="text-2xl font-bold tracking-tight">
                    <Counter value={profile?.github_repo_count ?? 27} />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {settings?.about_github_repo_label ?? "public repos"} · @
                    {github}
                  </span>
                </Link>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
