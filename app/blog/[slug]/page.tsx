import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import {
  directusAssetUrl,
  fetchBlogSettings,
  fetchPostBySlug,
  fetchPostSlugs,
  fetchRelatedPosts,
  type RelatedPostSummary,
} from "@/lib/directus";
import MdcRenderer from "@/components/mdc/MdcRenderer";

const SITE_URL = "https://portfolio.amartuvshin.com";

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
    title: { absolute: post.title },
    description: post.excerpt ?? undefined,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
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

  const related = await fetchRelatedPosts(post).catch(() => []);

  const allPostsLabel = settings?.all_posts_label ?? "Бүх нийтлэл";
  const morePostsLabel = settings?.more_posts_label ?? "Бусад нийтлэл";
  const lastUpdatedLabel = settings?.last_updated_label ?? "Сүүлд шинэчилсэн";
  const minReadSuffix = settings?.min_read_suffix ?? "минут унших";
  const relatedLabel = settings?.related_label ?? "Холбоотой постууд";

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

      <article className="relative overflow-hidden pt-12 pb-32 md:pt-40 md:pb-32">
        <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-3xl px-4 md:px-6 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            {allPostsLabel}
          </Link>

          <header className="space-y-4 md:space-y-6 mb-10 md:mb-16">
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[1.05] break-words">
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
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl border border-border/40 bg-muted/20 mb-10 md:mb-16">
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

          {related.length > 0 ? (
            <RelatedSection label={relatedLabel} posts={related} />
          ) : null}
        </div>
      </article>
    </main>
  );
}

function RelatedSection({
  label,
  posts,
}: {
  label: string;
  posts: RelatedPostSummary[];
}) {
  return (
    <section
      aria-label={label}
      className="mt-20 pt-12 border-t border-border/40"
    >
      <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8">
        <span className="inline-block h-px w-8 align-middle bg-muted-foreground/50 mr-3" />
        {label}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {posts.map((p) => (
          <RelatedCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}

function RelatedCard({ post }: { post: RelatedPostSummary }) {
  const cover = directusAssetUrl(post.cover_image, {
    width: 600,
    height: 400,
    fit: "cover",
    quality: 80,
  });
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
    >
      <article className="relative h-full rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 group-hover:border-border/80 group-hover:shadow-lg group-hover:-translate-y-0.5">
        <div className="flex items-stretch">
          {cover ? (
            <div className="relative w-28 md:w-32 shrink-0 bg-muted/20 aspect-square">
              <Image
                src={cover}
                alt={post.title}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
          ) : null}
          <div className="flex-1 min-w-0 p-4 md:p-5 space-y-2">
            {post.type ? (
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                {post.type.label}
              </div>
            ) : null}
            <h3 className="text-base md:text-lg font-semibold tracking-tight leading-snug line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="text-xs md:text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            ) : null}
          </div>
          <div className="hidden md:flex items-center pr-4 text-muted-foreground/60 group-hover:text-foreground transition-colors">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>
      </article>
    </Link>
  );
}
