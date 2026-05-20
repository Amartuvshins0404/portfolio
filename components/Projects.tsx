"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/cms";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              Featured Work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Recent projects.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-base md:text-right">
            Live products shipped end-to-end — from design system to deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        href={project.demo_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-3xl"
      >
        <div className="relative rounded-3xl border border-border/40 bg-card overflow-hidden transition-all duration-500 group-hover:border-border/80 group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-1">
          <div
            className={cn(
              "absolute -inset-px rounded-3xl bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl",
              project.accent
            )}
          />

          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/40 bg-muted/30">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <div className="ml-3 flex-1 flex items-center gap-2 text-xs text-muted-foreground font-mono px-3 py-1 rounded-md bg-background/50 border border-border/30">
              <Globe className="h-3 w-3" />
              <span className="truncate">{project.url}</span>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
            <Image
              src={project.image_url}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-card/30 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-6 md:p-8 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  {project.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {project.title}
                </h3>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-muted-foreground/90 px-2.5 py-1 rounded-full bg-muted/60 border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
