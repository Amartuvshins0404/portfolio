"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  CircleDotDashed,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/portfolio-motion";
import ShowcaseVideo from "@/components/showcase-video";
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
};

const DEFAULT_STATE_META: Record<ProjectState, StateMeta> = {
  ongoing: {
    label: "Ongoing",
    cardLabel: "In active development",
    emptyLabel: "No ongoing projects published yet.",
    icon: CircleDotDashed,
    badge:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  done: {
    label: "Done",
    cardLabel: "Shipped",
    emptyLabel: "No completed projects published yet.",
    icon: CheckCircle2,
    badge:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  planning: {
    label: "Planning",
    cardLabel: "In planning",
    emptyLabel: "No planning projects published yet.",
    icon: CalendarClock,
    badge:
      "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
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
    <section id="projects" className="card-surface p-5 sm:p-7">
      <Reveal className="flex flex-wrap items-center justify-between gap-4">
        <span className="section-badge">
          {settings?.projects_eyebrow ?? "Selected work"}
        </span>
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {settings?.projects_title ?? "Projects."}
        </h2>
      </Reveal>
      {settings?.projects_description ? (
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          {settings.projects_description}
        </p>
      ) : null}

      <Reveal delay={0.08} className="mt-6">
        <div
          className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-muted p-1"
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
                  "inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
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

      <div aria-live="polite" className="mt-6">
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <Reveal className="rounded-2xl border border-dashed border-border/60 bg-muted/25 px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              {stateMeta[activeState].emptyLabel}
            </p>
          </Reveal>
        )}
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
    <Reveal delay={index * 0.08} className="h-full">
      <article className="tile-surface group flex h-full flex-col overflow-hidden transition-colors hover:border-primary/40">
        {project.video_url ? (
          <ShowcaseVideo
            src={project.video_url}
            poster={project.image_url || undefined}
            title={project.title}
            className="aspect-video rounded-b-none"
          />
        ) : project.image_url ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
            <Image
              src={project.image_url}
              alt={`${project.title} — ${project.category} built by Amartuvshin Surenjav`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/7] items-center justify-center bg-tile">
            <StateIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-1 flex-col space-y-4 p-5 sm:p-6">
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
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <span className="max-w-[45%] text-right font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {project.category}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/30 bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground/90"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex min-h-10 items-center justify-between gap-4 border-t border-border/40 pt-4">
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
    </Reveal>
  );
}
