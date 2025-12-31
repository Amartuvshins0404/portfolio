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
        // Trigger once on mount to set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <UpperNav/>
            <BottomNav isScrolled={isScrolled} />
        </>
    )
}

function UpperNav() {
    return (
        <nav className={cn(
            "flex justify-between items-center container mx-auto p-6 transition-all duration-300",
        )}>
            <div className="flex items-center gap-2">
                <Image src={'/profile.jpg'} alt="profile" width={40} height={40} className="rounded-full" />
                <div>
                    <h1 className="font-bold tracking-tight text-lg md:text-xl">Amartuvshin Surenjav</h1>
                    <h1 className="text-xs md:text-sm text-muted-foreground font-medium">Software Developer | Cybersecurity Student</h1>
                </div>
            </div>

            {/* Desktop Navigation Links - Hidden on Mobile or when Scrolled */}
            <ul className={cn(
                "hidden md:flex items-center gap-8 transition-opacity duration-300",
            )}>
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

function BottomNav({ isScrolled }: { isScrolled: boolean }) {
    return (
        <div className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
            // Mobile: Always visible (translate-y-0)
            // Desktop: Visible only when scrolled. If not scrolled, hide it (translate-y-20)
            !isScrolled ? "translate-y-24 opacity-0 md:translate-y-24 md:opacity-0 pointer-events-none md:pointer-events-none" : "translate-y-0 opacity-100",
            // OVERRIDE: On mobile, always visible
            "max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto"
        )}>
            <div className={cn(
                "flex items-center gap-2 p-2 rounded-full border border-white/10 bg-background/80 backdrop-blur-xl shadow-2xl ring-1 ring-white/5"
            )}>
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