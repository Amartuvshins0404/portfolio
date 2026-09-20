import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio-motion";
import {
  Counter,
  Line,
  Marquee,
  TextReveal,
} from "@/components/section-motion";
import type {
  CMSActivity,
  CMSEducation,
  CMSProfile,
  CMSSiteSettings,
  CMSSkill,
  CMSWorkExperience,
} from "@/lib/cms";

export default function About({
  profile,
  settings,
  skills,
  workExperiences,
  educations,
  activities,
}: {
  profile: CMSProfile | null;
  settings: CMSSiteSettings | null;
  skills: CMSSkill[];
  workExperiences: CMSWorkExperience[];
  educations: CMSEducation[];
  activities: CMSActivity[];
}) {
  const statement =
    profile?.bio_paragraphs?.[0] ??
    profile?.bio_short ??
    "Software engineer building secure products, production systems, and AI-native workflows.";
  const work = workExperiences[0];
  const education = educations[0];
  const github = profile?.github_username ?? "Amartuvshins0404";
  const stack = skills.map((s) => s.name);

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground md:col-span-3">
            {settings?.about_eyebrow ?? "About"}
          </p>
          <TextReveal
            as="h2"
            text={statement}
            className="text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-foreground md:col-span-9 md:text-4xl lg:text-[2.75rem]"
          />
        </div>

        <div className="mt-16 grid gap-px md:mt-20 md:grid-cols-3">
          <Reveal className="border-t border-border py-8 md:pr-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {settings?.about_work_label ?? "Work"}
            </p>
            <p className="mt-4 text-xl font-medium tracking-tight">
              {work?.role ?? profile?.job_title ?? "Software Engineer"}
            </p>
            {work ? (
              <Link
                href={work.company_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {work.company}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : null}
            {work ? (
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {work.period}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.08} className="border-t border-border py-8 md:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {settings?.about_education_label ?? "Education"}
            </p>
            <p className="mt-4 text-xl font-medium tracking-tight">
              {education?.degree ?? "—"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {education?.institution}
            </p>
            {education ? (
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {education.status}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.16} className="border-t border-border py-8 md:pl-8">
            <Link
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {settings?.about_github_label ?? "GitHub"}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
                <Counter value={profile?.github_repo_count ?? 27} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {settings?.about_github_repo_label ?? "public repos"} · @{github}
              </p>
            </Link>
          </Reveal>
        </div>

        {activities.length > 0 ? (
          <div className="mt-16 md:mt-20">
            <Line />
            <ul className="divide-y divide-border">
              {activities.map((a) => (
                <li
                  key={a.id}
                  className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-4 md:grid-cols-12"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
                    {a.label}
                  </span>
                  <span className="text-sm text-foreground/90 md:col-span-9 md:text-base">
                    {a.value}
                  </span>
                </li>
              ))}
            </ul>
            <Line delay={0.2} />
          </div>
        ) : null}

        {stack.length > 0 ? (
          <div className="mt-16 md:mt-20">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {settings?.about_tech_stack_label ?? "Tech Stack"}
            </p>
            <Marquee items={stack} speed={stack.length * 1.6} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
