'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { Briefcase, FolderGit2, Home, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TopNav() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative">
            {isScrolled ? <BottomNav /> : <UpperNav />}
        </div>
    )
}

function UpperNav() {
    return (
        <nav className="flex justify-between items-center container mx-auto p-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="flex items-center gap-2">
                <Image src={'/profile.jpg'} alt="profile" width={50} height={50} className="rounded-full" />
                <div>
                    <h1 className="font-bold tracking-tight text-xl">Amartuvshin Surenjav</h1>
                    <h1 className="text-sm text-muted-foreground font-medium">Software Developer | Cybersecurity Student</h1>
                </div>
            </div>
            <ul className="flex items-center gap-8">
                {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
                    <li key={item} className="relative group">
                        <Link
                            href={item === 'Home' ? '#backtop' : `#${item.toLowerCase()}`}
                            className="font-medium text-muted-foreground hover:text-background transition-colors duration-300"
                        >
                            {item}
                        </Link>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

function BottomNav() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-background backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
                <NavIcon href="#backtop" icon={<Home size={20} />} label="Home" />
                <NavIcon href="#projects" icon={<FolderGit2 size={20} />} label="Projects" />
                <NavIcon href="#skills" icon={<Sparkles size={20} />} label="Skills" />
                <NavIcon href="#contact" icon={<Mail size={20} />} label="Contact" />
            </div>
        </div>
    )
}

function NavIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
    return (
        <Link
            href={href}
            className={cn(
                "relative group flex items-center justify-center w-12 h-12 rounded-full",
                "text-muted-foreground hover:text-foreground hover:bg-white/10",
                "transition-all duration-300 hover:scale-110"
            )}
            title={label}
        >
            {icon}
            <span className="sr-only">{label}</span>
        </Link>
    )
}