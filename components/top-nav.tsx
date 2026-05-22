'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FolderGit2, GraduationCap, Home, Mail, Sparkles, BookOpen, HelpCircle, Briefcase, Menu, X } from "lucide-react";
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

function buildNavItems(
  homeHref: (hash: string) => string,
  withLearn: boolean,
): { label: string; href: string; external?: boolean }[] {
  const items: { label: string; href: string; external?: boolean }[] = [
    { label: "Home", href: homeHref("#backtop") },
    { label: "Services", href: homeHref("#services") },
    { label: "Projects", href: homeHref("#projects") },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: homeHref("#skills") },
    { label: "FAQ", href: homeHref("#faq") },
  ];
  if (withLearn) {
    items.push({ label: "Learn", href: "https://learn.amartuvshin.com", external: true });
  }
  items.push({ label: "Contact", href: homeHref("#contact") });
  return items;
}

export default function TopNav({ profile }: { profile: CMSProfile | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const homeLinkHref = homeHref("#backtop");

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
      <UpperNav profile={profile} homeHref={homeHref} homeLinkHref={homeLinkHref} />
      <BottomNav isScrolled={isScrolled || !isHome} homeHref={homeHref} />
    </>
  )
}

function UpperNav({
  profile,
  homeHref,
  homeLinkHref,
}: {
  profile: CMSProfile | null;
  homeHref: (hash: string) => string;
  homeLinkHref: string;
}) {
  const navItems = buildNavItems(homeHref, true);

  return (
    <nav className={cn(
      "flex justify-between items-center container mx-auto p-6 transition-all duration-300",
    )}>
      <Link href={homeLinkHref} aria-label="Amartuvshin Surenjav — Home" className="flex items-center gap-2 min-w-0">
        <Image
          src={profile?.profile_image ?? "/profile.jpg"}
          alt="Amartuvshin Surenjav — Security Engineer & freelance web developer Ulaanbaatar Mongolia"
          width={40}
          height={40}
          priority
          className="rounded-full shrink-0"
        />
        <div className="min-w-0">
          <span className="block font-bold tracking-tight text-base md:text-xl truncate">{profile?.name ?? "Amartuvshin Surenjav"}</span>
          <span className="block text-xs md:text-sm text-muted-foreground font-medium line-clamp-1">{profile?.job_title ?? "Security Engineer @ erxes · Cybersecurity Student"}</span>
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

function BottomNav({
  isScrolled,
  homeHref,
}: {
  isScrolled: boolean;
  homeHref: (hash: string) => string;
}) {
  const navItems = buildNavItems(homeHref, false);

  return (
    <>
      <div className={cn(
        "hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        !isScrolled ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      )}>
        <div className="flex items-center gap-2 p-2 rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-2xl ring-1 ring-border/50">
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
      <MobileNavFab navItems={navItems} />
    </>
  )
}

function MobileNavFab({ navItems }: { navItems: { label: string; href: string; external?: boolean }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden fixed bottom-10 left-10 z-50">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed inset-0 w-full h-full bg-background/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        tabIndex={open ? 0 : -1}
      />

      <div
        className={cn(
          "absolute bottom-16 left-0 flex flex-col-reverse gap-2 transition-all duration-300",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            className={cn(
              "flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full",
              "border border-border bg-background/90 backdrop-blur-xl shadow-lg ring-1 ring-border/50",
              "text-foreground hover:bg-accent transition-all duration-300",
              "w-fit"
            )}
          >
            <span className="flex items-center justify-center w-8 h-8 text-muted-foreground">
              {iconMap[item.label] ?? <Home size={20} />}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex items-center justify-center w-12 h-12 rounded-full",
          "bg-background/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-border/50",
          "text-foreground hover:bg-accent transition-transform duration-300",
          open && "rotate-90"
        )}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
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
