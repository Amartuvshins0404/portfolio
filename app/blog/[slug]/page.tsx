import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import {
  directusAssetUrl,
  fetchBlogSettings,
  fetchPostBySlug,
  fetchPostSlugs,
} from "@/lib/directus";
import MdcRenderer from "@/components/mdc/MdcRenderer";

const SITE_URL = "https://amartuvshin.com";

export const revalidate = 60;
export const dynamicParams = true;

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  try {
    const slugs = await fetchPostSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
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
  const [post, settings] = await Promise.all([
    fetchPostBySlug(slug).catch(() => null),
    fetchBlogSettings().catch(() => null),
  ]);
  if (!post) {
    return {
      title: settings?.not_found_title ?? "Нийтлэл олдсонгүй",
      robots: { index: false, follow: false },
    };
  }
  const cover = directusAssetUrl(post.cover_image, { width: 1200, height: 630, fit: "cover", quality: 82 });
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.date_updated ?? undefined,
      authors: ["Amartuvshin Surenjav"],
      tags: post.tags ?? undefined,
      images: cover ? [{ url: cover, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: cover ? [cover] : undefined,
    },
  };
}

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    fetchPostBySlug(slug).catch(() => null),
    fetchBlogSettings().catch(() => null),
  ]);
  if (!post) notFound();

  const allPostsLabel = settings?.all_posts_label ?? "Бүх нийтлэл";
  const morePostsLabel = settings?.more_posts_label ?? "Бусад нийтлэл";
  const lastUpdatedLabel = settings?.last_updated_label ?? "Сүүлд шинэчилсэн";
  const minReadSuffix = settings?.min_read_suffix ?? "минут унших";

  const cover = directusAssetUrl(post.cover_image, { width: 1800, quality: 88 });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: cover ? [cover] : undefined,
    datePublished: post.published_at ?? post.date_created,
    dateModified: post.date_updated ?? post.published_at ?? post.date_created,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    author: {
      "@type": "Person",
      name: "Amartuvshin Surenjav",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Amartuvshin Surenjav",
      url: SITE_URL,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-3xl px-4 md:px-6 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            {allPostsLabel}
          </Link>

          <header className="space-y-6 mb-12 md:mb-16">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {post.published_at ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.published_at)}
                </span>
              ) : null}
              {post.reading_time ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {post.reading_time} {minReadSuffix}
                </span>
              ) : null}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            ) : null}
            {post.tags && post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium text-muted-foreground/90 px-2.5 py-1 rounded-full bg-muted/60 border border-border/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {cover ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border/40 bg-muted/20 mb-12 md:mb-16">
              <Image
                src={cover}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                priority
                className="object-cover"
              />
            </div>
          ) : null}

          <MdcRenderer content={post.content ?? ""} />

          <footer className="mt-16 pt-8 border-t border-border/40 flex items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {morePostsLabel}
            </Link>
            <div className="text-xs text-muted-foreground font-mono">
              {lastUpdatedLabel}{" "}
              {formatDate(post.date_updated ?? post.published_at ?? post.date_created)}
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
