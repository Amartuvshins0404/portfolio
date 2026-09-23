import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative flex-1 overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-muted-foreground/50" />
            404
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter break-words">
            This page doesn’t exist.
          </h1>
          <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
            It may have moved, or the link is from an older version of this site.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild className="rounded-full">
              <Link href="/">
                Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {LINKS.map((link) => (
              <Button key={link.href} asChild variant="outline" className="rounded-full">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
