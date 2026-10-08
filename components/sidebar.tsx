"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Github,
  GraduationCap,
  Handshake,
  Headset,
  House,
  InstagramIcon,
  Layers,
  Linkedin,
  Menu,
  Shapes,
  Twitter,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type {
  CMSNavLink,
  CMSProfile,
  CMSSiteSettings,
  CMSSocialLink,
} from "@/lib/cms";
import { cn } from "@/lib/utils";

const fallbackLinks: CMSNavLink[] = [
  { id: "home", sort: 1, label: "Home", href: "/", external: false },
  { id: "about", sort: 2, label: "About", href: "/#about", external: false },
  { id: "focus", sort: 3, label: "Focus", href: "/#focus", external: false },
  {
    id: "portfolio",
    sort: 4,
    label: "Portfolio",
    href: "/#projects",
    external: false,
  },
  { id: "stack", sort: 5, label: "Stack", href: "/#skills", external: false },
  { id: "hire", sort: 6, label: "Hire", href: "/hire", external: false },
  { id: "writing", sort: 7, label: "Writing", href: "/blog", external: false },
  {
    id: "contact",
    sort: 8,
    label: "Contact",
    href: "/#contact",
    external: false,
  },
];

const navIcons: Record<string, LucideIcon> = {
  Home: House,
  About: User,
  Focus: Shapes,
  Portfolio: Briefcase,
  Stack: Layers,
  Writing: BookOpen,
  Contact: Headset,
  Services: Briefcase,
  Hire: Handshake,
  Learn: GraduationCap,
};

const socialIcons: Record<string, LucideIcon> = {
  Linkedin: Linkedin,
  Github: Github,
  Twitter: Twitter,
  Instagram: InstagramIcon,
};

function resolvedHref(href: string, pathname: string): string {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

function isCurrentPath(pathname: string, href: string): boolean {
  if (!href.startsWith("/") || href.includes("#")) return false;
  const targetPath = href.split("#")[0] || "/";
  return targetPath === "/"
    ? pathname === "/"
    : pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

export default function Sidebar({
  profile,
  navLinks,
  socialLinks,
}: {
  profile: CMSProfile | null;
  navLinks: CMSNavLink[];
  socialLinks: CMSSocialLink[];
  settings: CMSSiteSettings | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const items = navLinks.length > 0 ? navLinks : fallbackLinks;

  const name = profile?.name ?? "Amartuvshin Surenjav";
  const role = profile?.job_title ?? "Software Engineer";
  const email = profile?.email ?? "info@amartuvshin.com";
  const available = profile?.available_for_freelance ?? true;

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = items
      .map((item) => item.href.split("#")[1])
      .filter((id): id is string => Boolean(id));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveSection(elements[elements.length - 1].id);
        return;
      }
      const line = window.innerHeight * 0.4;
      const nearest = elements
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
        .filter((el) => el.top <= line)
        .sort((a, b) => b.top - a.top)[0];
      setActiveSection(nearest?.id ?? "home");
    };

    let frame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname, items]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const isItemActive = (item: CMSNavLink): boolean => {
    if (item.external) return false;
    const hash = item.href.split("#")[1];
    if (hash) {
      return pathname === "/" && activeSection === hash;
    }
    const targetPath = item.href.split("#")[0] || "/";
    if (targetPath === "/") {
      return (
        pathname === "/" &&
        (activeSection === null || activeSection === "home")
      );
    }
    return isCurrentPath(pathname, item.href);
  };

  return (
    <aside className="card-surface relative w-full shrink-0 p-6 sm:p-7 lg:sticky lg:top-8 lg:w-[320px] xl:w-[340px]">
      <ThemeToggle className="hidden lg:absolute lg:right-5 lg:top-5 lg:inline-flex" />
      <div className="flex items-center gap-3 lg:hidden">
        <span className="relative shrink-0">
          <Image
            src={profile?.profile_image || "/profile.jpg"}
            alt={name}
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full border border-border/60 object-cover object-top"
          />
          <span
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
              available ? "bg-emerald-500" : "bg-muted-foreground"
            )}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold tracking-tight">
            {name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {role}
          </span>
        </span>
        <ThemeToggle />
        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-accent"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 lg:block lg:opacity-100",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 max-lg:pointer-events-none"
        )}
      >
        <div className="min-h-0 overflow-hidden lg:overflow-visible">
          <div className="hidden flex-col items-center pt-1 text-center lg:flex">
            <div className="relative">
              <Image
                src={profile?.profile_image || "/profile.jpg"}
                alt={name}
                width={112}
                height={112}
                priority
                className="relative h-28 w-28 rounded-full border-4 border-card object-cover object-top shadow-lg"
              />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-card bg-emerald-500" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {role}
            </p>
            <p className="mt-1.5 text-2xl font-bold tracking-tight">{name}</p>
          </div>

          <div className="mt-5 flex flex-col items-center lg:mt-4">
            {socialLinks.length > 0 ? (
              <div className="flex items-center justify-center gap-2">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon] ?? Linkedin;
                  return (
                    <Link
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </Link>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-4 grid w-full grid-cols-2 gap-2.5">
              <Link
                href="/hire"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Hire me
              </Link>
              <Link
                href={`mailto:${email}`}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Contact
              </Link>
            </div>
          </div>

          <nav aria-label="Primary" className="mt-6">
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const Icon = navIcons[item.label] ?? House;
                const active = isItemActive(item);
                return (
                  <li key={item.id}>
                    <Link
                      href={resolvedHref(item.href, pathname)}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "border-primary/20 bg-accent text-accent-foreground"
                          : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
