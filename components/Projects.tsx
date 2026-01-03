"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "Voices",
        description: "This is technically newspaper website where you can see political news and opinion of citizen at one place. Each category and page is fully customizable. Each page is managed by seperate admin account. Admin accounts created by super admin. It was complex nested user privelege system.",
        tags: ["React", "Vite.js", "Express.js", "Shadcn", "PostgreSQL", "Typescript", "Stripe"],
        category: "Full Stack",
        image: "/voices.png",
        demo: "https://voices.mn",
        github: "#",
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with Stripe integration, featuring a persistent cart, admin dashboard, and responsive design. Built in just 2 hours.",
        tags: ["Next.js", "Supabase", "Stripe", "Tailwind CSS"],
        category: "Full Stack",
        image: "/video-ecom.mp4",
        demo: "/video-ecom.mp4",
        github: "#",
        color: "from-blue-500/20 to-purple-500/20"
    },
    {
        title: "AI Chatbot",
        description: "An AI-powered chatbot that can handle customer support 24/7",
        tags: ["n8n", "OpenAI", "Webhook", "Facebook API"],
        category: "AI Automation",
        image: "/chatbot.png",
        demo: "#",
        github: "#",
        color: "from-emerald-500/20 to-teal-500/20"
    },
    {
        title: "Personal Portfolio",
        description: "A modern portfolio website built with Next.js and Tailwind CSS. Features a responsive design, smooth animations, and a clean, professional look.",
        tags: ["React", "Tailwind CSS", "Recharts", "Supabase"],
        category: "Frontend",
        image: "/portfolio.png",
        demo: "#",
        github: "#",
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "Brand Voice SaaS",
        description: "A SaaS platform for people to write tweet or enhance already written tweets with personality. It features to build your own personality you want to have for AI.",
        tags: ["Vite.js", "React", "Express.js", "Supabase", "Tailwind CSS", "Google AI", "Shadcn", "Stripe", "PostgreSQL"],
        category: "Personal Project",
        image: "/brandvoice.png",
        demo: "#",
        github: "#",
        color: "from-indigo-500/20 to-cyan-500/20"
    }
];

const categories = ["All", "Full Stack", "Frontend", "AI Automation"];

export default function Projects() {
    const [activeTab, setActiveTab] = useState("All");

    const filteredProjects = activeTab === "All"
        ? projects
        : projects.filter(p => p.category === activeTab);

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center space-y-4 mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-[700px] mx-auto text-muted-foreground text-lg"
                    >
                        A selection of my recent work, showcasing rapid development and premium quality.
                    </motion.p>
                </div>

                <div className="flex flex-col items-center space-y-12">
                    {/* Custom Tabs */}
                    {/* <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-foreground backdrop-blur-md rounded-full border border-border/50">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={cn(
                                    "relative px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300",
                                    activeTab === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-background rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div> */}

                    {/* Project Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.title} project={project} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const isVideo = project.image.endsWith(".mp4");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative h-[420px] rounded-3xl overflow-hidden bg-background/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-linear-to-tr opacity-0 group-hover:opacity-100 transition-opacity duration-700", project.color)} />

            {/* Media Container */}
            <div className="absolute inset-0 h-full w-full">
                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={project.image}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-foreground to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
            </div>

            {/* Content Content - Re-ordered for better UX */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-3">
                    {/* Top Meta */}
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-white/10 text-xs font-medium px-2.5 py-1">
                            {project.category}
                        </Badge>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-background/40 backdrop-blur-md" asChild>
                                <Link href={project.github} target="_blank">
                                    <Github className="h-4 w-4 text-background" />
                                </Link>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-background/40 backdrop-blur-md" asChild>
                                <Link href={project.demo} target="_blank">
                                    <ExternalLink className="h-4 w-4 text-background" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300">
                        {project.title}
                    </h3>

                    <p className="text-background line-clamp-2 group-hover:line-clamp-none transition-all duration-300 text-sm leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags - Appear on hover */}
                    <div className="flex flex-wrap gap-2 pt-4 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        {project.tags.map((tag: string) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-white/70">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
