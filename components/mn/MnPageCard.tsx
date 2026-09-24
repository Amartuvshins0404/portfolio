import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SitePage } from "@/lib/directus";

export default function MnPageCard({ page }: { page: SitePage }) {
  return (
    <Link
      href={`/mn/${page.slug}`}
      className="group block rounded-3xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/90 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-border/80">
        <div className="flex flex-1 flex-col space-y-3 p-6 md:p-7">
          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight">
            {page.title}
          </h3>
          {page.lead ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {page.lead}
            </p>
          ) : null}
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium">
            Дэлгэрэнгүй
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
