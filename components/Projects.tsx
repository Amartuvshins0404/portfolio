"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  CircleDotDashed,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Reveal, TiltCard } from "@/components/portfolio-motion";
import { cn } from "@/lib/utils";
import type {
  CMSSiteSettings,
  Project,
  ProjectState,
} from "@/lib/cms";

const STATE_ORDER: ProjectState[] = ["done", "ongoing", "planning"];

type StateMeta = {
  label: string;
  cardLabel: string;
  emptyLabel: string;
  icon: LucideIcon;
  badge: string;
  wash: string;
};

const DEFAULT_STATE_META: Record<ProjectState, StateMeta> = {
  ongoing: {
    label: "Ongoing",
    cardLabel: "In active development",
    emptyLabel: "No ongoing projects published yet.",
    icon: CircleDotDashed,
    badge:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    wash: "from-amber-500/20 via-orange-500/8 to-transparent",
  },
  done: {
    label: "Done",
    cardLabel: "Shipped",
    emptyLabel: "No completed projects published yet.",
    icon: CheckCircle2,
    badge:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    wash: "from-emerald-500/18 via-teal-500/8 to-transparent",
  },
  planning: {
    label: "Planning",
    cardLabel: "In planning",
    emptyLabel: "No planning projects published yet.",
    icon: CalendarClock,
    badge:
      "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    wash: "from-indigo-500/20 via-violet-500/8 to-transparent",
  },
};
function getStateMeta(
  settings: CMSSiteSettings | null
): Record<ProjectState, StateMeta> {
  return {
    ongoing: {
      ...DEFAULT_STATE_META.ongoing,
      label:
        settings?.projects_ongoing_label ??
        DEFAULT_STATE_META.ongoing.label,
      cardLabel:
        settings?.projects_ongoing_card_label ??
        DEFAULT_STATE_META.ongoing.cardLabel,
      emptyLabel:
        settings?.projects_ongoing_empty_label ??
        DEFAULT_STATE_META.ongoing.emptyLabel,
    },
    done: {
      ...DEFAULT_STATE_META.done,
      label: settings?.projects_done_label ?? DEFAULT_STATE_META.done.label,
      cardLabel:
        settings?.projects_done_card_label ??
        DEFAULT_STATE_META.done.cardLabel,
      emptyLabel:
        settings?.projects_done_empty_label ??
        DEFAULT_STATE_META.done.emptyLabel,
    },
    planning: {
      ...DEFAULT_STATE_META.planning,
      label:
        settings?.projects_planning_label ??
        DEFAULT_STATE_META.planning.label,
      cardLabel:
        settings?.projects_planning_card_label ??
        DEFAULT_STATE_META.planning.cardLabel,
      emptyLabel:
        settings?.projects_planning_empty_label ??
        DEFAULT_STATE_META.planning.emptyLabel,
    },
  };
}


export default function Projects({
  projects,
  settings,
}: {
  projects: Project[];
  settings: CMSSiteSettings | null;
}) {
  const stateMeta = getStateMeta(settings);
  const firstPopulatedState =
    STATE_ORDER.find((state) =>
      projects.some((project) => project.state === state)
    ) ?? "done";
  const [activeState, setActiveState] =
    useState<ProjectState>(firstPopulatedState);
  const visibleProjects = projects.filter(
    (project) => project.state === activeState
  );

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -left-64 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[128px]" />
      <div className="pointer-events-none absolute -right-64 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              {settings?.projects_eyebrow ?? "Selected work"}
            </div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              {settings?.projects_title ?? "Projects."}
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:text-right">
            {settings?.projects_description ??
              "Active builds, completed products, and what I’m planning next."}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mb-12">
          <div
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-border/50 bg-muted/50 p-1.5"
            aria-label={
              settings?.projects_filter_label ?? "Filter projects by state"
            }
          >
            {STATE_ORDER.map((state) => {
              const meta = stateMeta[state];
              const count = projects.filter(
                (project) => project.state === state
              ).length;
              const isActive = activeState === state;

              return (
                <button
                  key={state}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveState(state)}
                  className={cn(
                    "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                  )}
                >
                  {meta.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-background/70 text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div aria-live="polite">
          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  meta={stateMeta[project.state]}
                  viewCta={settings?.projects_view_cta ?? "View project"}
                />
              ))}
            </div>
          ) : (
            <Reveal className="rounded-3xl border border-dashed border-border/60 bg-muted/25 px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground">
                {stateMeta[activeState].emptyLabel}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  meta,
  viewCta,
}: {
  project: Project;
  index: number;
  meta: StateMeta;
  viewCta: string;
}) {
  const StateIcon = meta.icon;

  return (
    <TiltCard
      delay={index * 0.08}
      intensity={5}
      className="relative rounded-3xl"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/90 backdrop-blur-sm transition-all duration-500 group-hover:border-border/80 group-hover:shadow-2xl group-hover:shadow-primary/5">
        {project.image_url ? (
          <>
            <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/30 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-border/30 bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                <span className="truncate">{project.url}</span>
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
              <Image
                src={project.image_url}
                alt={`${project.title} — ${project.category} built by Amartuvshin Surenjav`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-card/30 via-transparent to-transparent" />
            </div>
          </>
        ) : (
          <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden border-b border-border/40 bg-muted/20">
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br",
                meta.wash
              )}
            />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <StateIcon className="h-7 w-7" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {meta.cardLabel}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col space-y-5 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
                  meta.badge
                )}
              >
                <StateIcon className="h-3.5 w-3.5" />
                {meta.label}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {project.title}
              </h3>
            </div>
            <span className="max-w-[45%] text-right font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {project.category}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/30 bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex min-h-10 items-center justify-between gap-4 border-t border-border/40 pt-5">
            <span className="truncate font-mono text-xs text-muted-foreground">
              {project.url}
            </span>
            {project.demo_url ? (
              <Link
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                {viewCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
