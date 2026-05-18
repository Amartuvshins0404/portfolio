import Link from "next/link";
import { ArrowRight, Github, InstagramIcon, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section id="backtop" className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-10">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Simplicity over complexity, quantity over quality.
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
                        Hi, I&apos;m <span className="text-foreground font-semibold">Amartuvshin Surenjav</span> — Security Engineer at <Link href="https://erxes.io" target="_blank" className="text-foreground font-semibold underline decoration-dotted underline-offset-4">erxes</Link>, Cybersecurity student at MUST-SICT, and an AI Agentic Workflow Engineer. I ship full-stack products and AI-native tooling at record speed.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                    <Button asChild size="lg" className="rounded-full">
                        <Link href="#projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full">
                        <Link href="#contact">
                            Get in Touch
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-3xl font-bold">3+ years</span>
                        <span className="text-sm text-muted-foreground">Experience</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-3xl font-bold">20+</span>
                        <span className="text-sm text-muted-foreground">Projects</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-3xl font-bold">8h</span>
                        <span className="text-sm text-muted-foreground">Avg. MVP</span>
                    </div>
                    <div className="flex flex-col items-center space-y-5 py-1">
                        <div className="flex gap-4 text-muted-foreground">
                            <Link href="https://www.linkedin.com/in/amartuvshins/" target="_blank" className="transition-colors hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="https://github.com/Amartuvshins0404" target="_blank" className="transition-colors hover:text-foreground">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="https://x.com/Amaraa2404" target="_blank" className="transition-colors hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.instagram.com/amartovision/" target="_blank" className="transition-colors hover:text-foreground">
                                <InstagramIcon className="h-5 w-5" />
                            </Link>
                        </div>
                        <span className="text-sm text-muted-foreground">Social Presence</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
