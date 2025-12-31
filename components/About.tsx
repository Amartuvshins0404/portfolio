import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Code2, Cpu, Database, Globe, Layers, Lock, Sparkles, Terminal } from "lucide-react";

export default function About() {
    const skills = [
        { name: "Next.js", icon: <Code className="h-5 w-5" /> },
        { name: "React", icon: <Code2 className="h-5 w-5" /> },
        { name: "TypeScript", icon: <Terminal className="h-5 w-5" /> },
        { name: "Supabase", icon: <Database className="h-5 w-5" /> },
        { name: "AI Automation", icon: <Sparkles className="h-5 w-5" /> },
        { name: "UI/UX Design", icon: <Layers className="h-5 w-5" /> },
        { name: "Cybersecurity", icon: <Lock className="h-5 w-5" /> },
    ];

    return (
        <section id="skills" className="py-20 relative overflow-hidden container mx-auto">
            <div className="container px-4 md:px-6 space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About & Skills</h2>
                    <p className="max-w-[700px] mx-auto">
                        A journey from traditional development to AI-enhanced rapid prototyping.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">My mindset</h3>
                        <p className="text-muted-foreground leading-loose">
                            I believe in the power of <strong className="text-background">quantity with speed</strong>.
                            By combining deep technical expertise with cutting-edge AI tools, I turn complex ideas into
                            live, production-grade applications in a fraction of the traditional time.
                        </p>
                        <p className="text-muted-foreground leading-loose">
                            My background usually spans multiple disciplines—Software Development, UI/UX, and AI Automation.
                            This allows me to see the full picture, ensuring that every line of code serves both functionality
                            and user experience.
                        </p>
                        <p className="text-muted-foreground leading-loose">
                            I leverage AI tools to enhance my coding efficiency, but I am far from an "AI-driven" developer with no foundational knowledge. With extensive experience in the industry predating the AI explosion, I remain the lead developer of my projects—guided by my expertise, not AI.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-4">
                            <Badge className="px-8 py-2 text-sm shadow-2xl shadow-zinc-800">Full Stack</Badge>
                            <Badge className="px-8 py-2 text-sm shadow-2xl shadow-zinc-800">AI Native</Badge>
                            <Badge className="px-8 py-2 text-sm shadow-2xl shadow-zinc-800">Rapid Prototyping</Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {skills.map((skill, i) => (
                            <Card key={i} className="bg-linear-to-br from-primary to-zinc-950  border-none transition-colors">
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="p-2 rounded-full bg-background/10 text-secondary">
                                        {skill.icon}
                                    </div>
                                    <span className="font-medium text-secondary">{skill.name}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
