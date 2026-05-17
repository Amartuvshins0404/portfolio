"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Bot,
    Briefcase,
    Code2,
    Database,
    Github,
    GraduationCap,
    MapPin,
    ShieldCheck,
    Sparkles,
    Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

const currently: { label: string; value: string }[] = [
    { label: "Shipped", value: "Flint — a Mongolia-native dating platform" },
    { label: "Securing", value: "erxes — code-scanning triage & application security" },
    { label: "Studying", value: "Cybersecurity at MUST-SICT" },
    { label: "Exploring", value: "MCP servers & agentic developer loops" },
];

const stack: Record<string, string[]> = {
    Frontend: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Shadcn UI"],
    Backend: ["Node.js", "Express", "GraphQL Federation", "tRPC", "Apollo Server", "BullMQ"],
    Data: ["MongoDB / Mongoose", "PostgreSQL", "Redis", "Elasticsearch", "MinIO / S3"],
    Security: ["Application Security", "OWASP / SAST", "CodeQL", "Vulnerability Triage", "JWT · OAuth"],
    AI: ["Claude Code", "Custom MCP Servers", "OpenAI / Anthropic SDK", "n8n", "Agentic Workflows"],
};

export default function About() {
    return (
        <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10 space-y-14">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                            <span className="h-px w-8 bg-muted-foreground/50" />
                            About
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                            The short version.
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground md:text-right">
                        Security engineer by day, full-stack builder by night, AI agentic workflow tinkerer always.
                    </p>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
                    {/* Identity / Bio — tall left card */}
                    <BentoCard className="md:col-span-3 md:row-span-2 flex flex-col gap-6">
                        <div className="flex items-start gap-5">
                            <Image
                                src="/profile.jpg"
                                alt="Amartuvshin Surenjav"
                                width={88}
                                height={88}
                                className="rounded-2xl border border-border/40 object-cover shrink-0"
                            />
                            <div className="space-y-1.5 flex-1 min-w-0">
                                <h3 className="text-2xl md:text-[1.6rem] font-semibold tracking-tight">
                                    Amartuvshin Surenjav
                                </h3>
                                <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Ulaanbaatar, Mongolia
                                </p>
                                <div className="inline-flex items-center gap-2 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mt-1">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </span>
                                    Available for freelance
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-5 border-t border-border/40 flex-1">
                            <p className="text-muted-foreground leading-relaxed text-[15px]">
                                I do <strong className="text-foreground">application security at erxes</strong> — triaging code-scanning alerts, shipping fixes across a TypeScript microservices monorepo, and learning enterprise SaaS from the inside.
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-[15px]">
                                Off the clock I run side-products (<span className="text-foreground">flint.mn, voices.mn, devscomm.com</span>) and design <strong className="text-foreground">AI agentic workflows</strong> with Claude Code, custom MCP servers, and tightly-scoped skills — the leverage that lets one developer move like a team.
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-[15px]">
                                I&apos;ve been writing code since before the AI explosion. I use AI to amplify the fundamentals — not replace them.
                            </p>
                        </div>
                    </BentoCard>

                    {/* Work */}
                    <BentoCard className="md:col-span-3">
                        <CardHeader icon={<Briefcase className="h-3 w-3" />} label="Work" right="2025 — Present" />
                        <div className="space-y-1.5">
                            <h4 className="text-xl font-semibold tracking-tight">Security Engineer</h4>
                            <Link
                                href="https://erxes.io"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                            >
                                erxes Mongolia LLC
                                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                            <p className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                                Application security on a source-available Experience OS. Vulnerability triage, fix pipelines, and shipping features across an Nx-powered GraphQL Federation monorepo.
                            </p>
                        </div>
                    </BentoCard>

                    {/* Education */}
                    <BentoCard className="md:col-span-3">
                        <CardHeader icon={<GraduationCap className="h-3 w-3" />} label="Education" right="In Progress" />
                        <div className="space-y-1.5">
                            <h4 className="text-xl font-semibold tracking-tight">B.S. in Cybersecurity</h4>
                            <p className="text-sm text-muted-foreground">
                                Mongolian University of Science and Technology
                            </p>
                            <p className="text-sm text-muted-foreground">
                                School of Information & Communication Technology (SICT)
                            </p>
                        </div>
                    </BentoCard>

                    {/* Currently */}
                    <BentoCard className="md:col-span-3">
                        <CardHeader
                            label="Currently"
                            right={
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                            }
                        />
                        <ul className="space-y-3">
                            {currently.map((c) => (
                                <li key={c.label} className="flex gap-3 text-sm">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground w-20 shrink-0 pt-0.5">
                                        {c.label}
                                    </span>
                                    <span className="text-foreground/90 leading-snug">{c.value}</span>
                                </li>
                            ))}
                        </ul>
                    </BentoCard>

                    {/* GitHub */}
                    <BentoCard className="md:col-span-3">
                        <Link
                            href="https://github.com/Amartuvshins0404"
                            target="_blank"
                            className="flex items-start justify-between group"
                        >
                            <div className="space-y-1.5">
                                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-2">
                                    <Github className="h-3 w-3" /> GitHub
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl md:text-6xl font-bold tracking-tighter">27</span>
                                    <span className="text-sm text-muted-foreground">public repos</span>
                                </div>
                                <p className="text-sm text-muted-foreground pt-2 max-w-xs">
                                    Open-sourcing tools, security skills, and agentic experiments.
                                    <span className="block text-foreground/80 font-mono text-xs mt-1">@Amartuvshins0404</span>
                                </p>
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </Link>
                    </BentoCard>
                </div>

                {/* Tech stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 pt-4"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-muted-foreground/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                            Tech Stack
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Object.entries(stack).map(([category, items]) => (
                            <div
                                key={category}
                                className="space-y-4 rounded-2xl border border-border/40 bg-card p-5 transition-colors hover:border-border/80"
                            >
                                <h4 className="text-sm font-semibold tracking-tight flex items-center gap-2.5">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground">
                                        <CategoryIcon name={category} />
                                    </span>
                                    {category}
                                </h4>
                                <ul className="space-y-1.5">
                                    {items.map((item) => (
                                        <li
                                            key={item}
                                            className="text-[13px] text-muted-foreground flex items-center gap-2"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>
    );
}

function BentoCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "rounded-3xl border border-border/40 bg-card p-6 md:p-7 transition-all duration-300 hover:border-border/80 hover:-translate-y-0.5",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

function CardHeader({
    icon,
    label,
    right,
}: {
    icon?: React.ReactNode;
    label: string;
    right?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-2">
                {icon}
                {label}
            </span>
            {typeof right === "string" ? (
                <span className="text-[10px] font-mono text-muted-foreground">{right}</span>
            ) : (
                right
            )}
        </div>
    );
}

function CategoryIcon({ name }: { name: string }) {
    const map: Record<string, React.ReactNode> = {
        Frontend: <Code2 className="h-3.5 w-3.5" />,
        Backend: <Workflow className="h-3.5 w-3.5" />,
        Data: <Database className="h-3.5 w-3.5" />,
        Security: <ShieldCheck className="h-3.5 w-3.5" />,
        AI: <Bot className="h-3.5 w-3.5" />,
    };
    return <>{map[name] ?? <Sparkles className="h-3.5 w-3.5" />}</>;
}
