import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { fetchPage, fetchPages } from "@/lib/directus";
import { getProfile } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";
import MdcRenderer from "@/components/mdc/MdcRenderer";
import MnPageCard from "@/components/mn/MnPageCard";
import MnContactCta from "@/components/mn/MnContactCta";

export const revalidate = 60;
export const dynamicParams = true;

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  try {
    const pages = await fetchPages("mn");
    return pages
      .filter((p) => p.slug !== "index")
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPage("mn", slug).catch(() => null);
  if (!page || slug === "index") {
    return {
      title: "Page not found",
      robots: { index: false, follow: true },
    };
  }
  const url = `${SITE_URL}/mn/${page.slug}`;
  const title = page.seo_title ?? page.title;
  const description = page.seo_description ?? page.lead ?? undefined;
  const isArticle = page.kind === "article";
  return {
    title: { absolute: title },
    description,
    keywords: page.keywords?.length ? page.keywords : null,
    alternates: { canonical: url },
    openGraph: {
      type: isArticle ? "article" : "website",
      locale: "mn_MN",
      url,
      siteName: "Amartuvshin Surenjav",
      title,
      description,
      ...(isArticle
        ? {
            publishedTime: page.published_at ?? page.date_created,
            modifiedTime:
              page.date_updated ?? page.published_at ?? page.date_created,
            authors: ["Amartuvshin Surenjav"],
          }
        : {}),
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function readingMinutes(content: string | null): number {
  const words = (content ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function MnPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const [page, pages, profile] = await Promise.all([
    fetchPage("mn", slug).catch(() => null),
    fetchPages("mn").catch(() => []),
    getProfile().catch(() => null),
  ]);
  if (!page || slug === "index") notFound();

  const url = `${SITE_URL}/mn/${page.slug}`;
  const description = page.seo_description ?? page.lead ?? undefined;
  const isArticle = page.kind === "article";

  const related = [
    ...pages.filter((p) => p.kind === "service"),
    ...pages.filter((p) => p.kind === "article"),
  ]
    .filter((p) => p.slug !== page.slug && p.slug !== "index")
    .slice(0, 3);

  const pageJsonLd =
    page.kind === "service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.title,
          serviceType: page.title,
          description,
          url,
          inLanguage: "mn",
          provider: { "@id": `${SITE_URL}/#person` },
          areaServed: { "@type": "Country", name: "Mongolia" },
        }
      : page.kind === "article"
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: page.title,
            description,
            url,
            mainEntityOfPage: url,
            inLanguage: "mn",
            datePublished: page.published_at ?? page.date_created,
            dateModified:
              page.date_updated ?? page.published_at ?? page.date_created,
            author: { "@id": `${SITE_URL}/#person` },
            publisher: { "@id": `${SITE_URL}/#person` },
          }
        : {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: page.title,
            description,
            inLanguage: "mn",
            about: { "@id": `${SITE_URL}/#person` },
          };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Нүүр",
        item: `${SITE_URL}/mn`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: url,
      },
    ],
  };

  return (
    <main lang="mn" className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-10 space-y-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link
              href="/mn"
              className="transition-colors hover:text-foreground"
            >
              Нүүр
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-foreground/80">{page.title}</span>
          </nav>
          {page.eyebrow ? (
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              {page.eyebrow}
            </div>
          ) : null}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter break-words">
            {page.title}
          </h1>
          {page.lead ? (
            <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
              {page.lead}
            </p>
          ) : null}
          {isArticle ? (
            <p className="text-sm text-muted-foreground">
              {formatDate(page.published_at ?? page.date_created)}
              {" · "}
              {readingMinutes(page.content)} минут унших
            </p>
          ) : null}
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <MdcRenderer content={page.content ?? ""} />
      </div>

      {related.length > 0 ? (
        <section className="container mx-auto max-w-5xl px-4 md:px-6 pt-16 md:pt-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
            Мөн үзэх
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <MnPageCard key={p.id} page={p} />
            ))}
          </div>
        </section>
      ) : null}

      <MnContactCta page={page} profile={profile} />
    </main>
  );
}
