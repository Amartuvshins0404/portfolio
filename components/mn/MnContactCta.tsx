import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CMSProfile } from "@/lib/cms";
import type { SitePage } from "@/lib/directus";

export default function MnContactCta({
  page,
  profile,
}: {
  page: SitePage;
  profile: CMSProfile | null;
}) {
  const email = profile?.email ?? "amaraaamka0404@gmail.com";
  const phone = profile?.phone ?? null;
  return (
    <section className="mt-16 border-t border-border/40 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          {page.cta_title ?? "Төслөө ярилцъя"}
        </h2>
        <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
          {page.cta_description ??
            "Юу бүтээхийг хүсэж байгаагаа товч бичээд илгээгээрэй — үнийн санал, хугацааг хамтдаа тодорхойлъё."}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild className="rounded-full">
            <a href={`mailto:${email}`}>
              Имэйл бичих
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          {phone ? (
            <Button asChild variant="outline" className="rounded-full">
              <a href={`tel:${phone.replace(/[\s-]/g, "")}`}>{phone}</a>
            </Button>
          ) : null}
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Англи хэл дээрх портфолио
          </Link>
        </div>
      </div>
    </section>
  );
}
