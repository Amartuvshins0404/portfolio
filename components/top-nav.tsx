'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FolderGit2, GraduationCap, Home, Mail, Sparkles, BookOpen, HelpCircle, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import type { CMSProfile } from "@/lib/cms";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={20} />,
  Services: <Briefcase size={20} />,
  Projects: <FolderGit2 size={20} />,
  Skills: <Sparkles size={20} />,
  FAQ: <HelpCircle size={20} />,
  Learn: <GraduationCap size={20} />,
  Blog: <BookOpen size={20} />,
  Contact: <Mail size={20} />,
};

export default function TopNav({ profile }: { profile: CMSProfile | null }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <UpperNav profile={profile} />
      <BottomNav isScrolled={isScrolled} />
    </>
  )
}

function UpperNav({ profile }: { profile: CMSProfile | null }) {
  const navItems: { label: string; href: string; external?: boolean }[] = [
    { label: "Home", href: "#backtop" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "#skills" },
    { label: "FAQ", href: "#faq" },
    { label: "Learn", href: "https://learn.amartuvshin.com", external: true },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "flex justify-between items-center container mx-auto p-6 transition-all duration-300",
    )}>
      <Link href="#backtop" aria-label="Amartuvshin Surenjav — Home" className="flex items-center gap-2">
        <Image
          src={profile?.profile_image ?? "/profile.jpg"}
          alt="Amartuvshin Surenjav — Security Engineer & freelance web developer Ulaanbaatar Mongolia"
          width={40}
          height={40}
          priority
          className="rounded-full"
        />
        <div>
          <span className="block font-bold tracking-tight text-lg md:text-xl">{profile?.name ?? "Amartuvshin Surenjav"}</span>
          <span className="block text-xs md:text-sm text-muted-foreground font-medium">{profile?.job_title ?? "Security Engineer @ erxes · Cybersecurity Student"}</span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        <ul className={cn(
          "hidden md:flex items-center gap-8 transition-opacity duration-300",
        )}>
          {navItems.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}

function BottomNav({ isScrolled }: { isScrolled: boolean }) {
  const navItems: { label: string; href: string; external?: boolean }[] = [
    { label: "Home", href: "#backtop" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "#skills" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
      !isScrolled ? "translate-y-24 opacity-0 md:translate-y-24 md:opacity-0 pointer-events-none md:pointer-events-none" : "translate-y-0 opacity-100",
      "max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto"
    )}>
      <div className={cn(
        "flex items-center gap-2 p-2 rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-2xl ring-1 ring-border/50"
      )}>
        {navItems.map((item) => (
          <NavIcon
            key={item.label}
            href={item.href}
            icon={iconMap[item.label] ?? <Home size={20} />}
            label={item.label}
            external={item.external}
          />
        ))}
      </div>
    </div>
  )
}

function NavIcon({ href, icon, label, external }: { href: string, icon: React.ReactNode, label: string, external?: boolean }) {
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        "relative group flex items-center justify-center w-12 h-12 rounded-full",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-all duration-300 hover:scale-110"
      )}
      title={label}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  )
}
