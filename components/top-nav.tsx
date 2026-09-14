"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Home,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { CMSNavLink, CMSProfile } from "@/lib/cms";
import { cn } from "@/lib/utils";

const fallbackLinks: CMSNavLink[] = [
  {
    id: "home",
    sort: 1,
    label: "Home",
    href: "/",
    external: false,
  },
  {
    id: "portfolio",
    sort: 2,
    label: "Portfolio",
    href: "/#projects",
    external: false,
  },
  {
    id: "writing",
    sort: 3,
    label: "Writing",
    href: "/blog",
    external: false,
  },
  {
    id: "contact",
    sort: 4,
    label: "Contact",
    href: "/#contact",
    external: false,
  },
];

const bottomNavIcons: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  Portfolio: <FolderGit2 className="h-4 w-4" />,
  Services: <Briefcase className="h-4 w-4" />,
  Writing: <BookOpen className="h-4 w-4" />,
  Learn: <GraduationCap className="h-4 w-4" />,
  Contact: <Mail className="h-4 w-4" />,
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

export default function TopNav({
  profile,
  navLinks,
}: {
  profile: CMSProfile | null;
  navLinks: CMSNavLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = navLinks.length > 0 ? navLinks : fallbackLinks;

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 80);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <nav className="container mx-auto max-w-7xl rounded-2xl border border-border/60 bg-background/82 px-3 py-2.5 shadow-lg shadow-primary/[0.03] backdrop-blur-xl md:px-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${profile?.name ?? "Amartuvshin Surenjav"} — Portfolio`}
            className="flex min-w-0 items-center gap-3"
          >
            <Image
              src={profile?.profile_image ?? "/profile.jpg"}
              alt={profile?.name ?? "Amartuvshin Surenjav"}
              width={40}
              height={40}
              priority
              className="h-10 w-10 shrink-0 rounded-xl border border-border/60 object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight md:text-base">
                {profile?.name ?? "Amartuvshin Surenjav"}
              </span>
              <span className="hidden truncate text-[11px] text-muted-foreground sm:block">
                {profile?.job_title ?? "Software Engineer"}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 lg:flex">
              {items.map((item) => {
                const href = resolvedHref(item.href, pathname);
                const active = isCurrentPath(pathname, href);
                return (
                  <li key={item.id}>
                    <Link
                      href={href}
                      {...(item.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className={cn(
                        "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 lg:hidden",
            open
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <ul className="grid gap-1 border-t border-border/60 pb-1 pt-3 mt-3 sm:grid-cols-2">
              {items.map((item) => {
                const href = resolvedHref(item.href, pathname);
                const active = isCurrentPath(pathname, href);
                return (
                  <li key={item.id}>
                    <Link
                      href={href}
                      {...(item.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      </header>
      <BottomNav
        visible={isScrolled}
        items={items}
        pathname={pathname}
      />
    </>
  );
}

function BottomNav({
  visible,
  items,
  pathname,
}: {
  visible: boolean;
  items: CMSNavLink[];
  pathname: string;
}) {
  const quickLinks = items.filter((item) => item.label !== "Learn");

  return (
    <nav
      aria-label="Quick navigation"
      className={cn(
        "fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border/70 bg-background/82 p-2 shadow-2xl shadow-primary/10 ring-1 ring-border/40 backdrop-blur-xl transition-all duration-500 md:flex",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      {quickLinks.map((item) => {
        const href = resolvedHref(item.href, pathname);
        const active = isCurrentPath(pathname, href);
        return (
          <Link
            key={item.id}
            href={href}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            title={item.label}
            className={cn(
              "group relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-foreground",
              active
                ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                : "text-muted-foreground",
            )}
          >
            {bottomNavIcons[item.label] ?? <Home className="h-4 w-4" />}
            <span className="sr-only">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
