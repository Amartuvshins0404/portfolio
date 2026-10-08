import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/portfolio-motion";
import {
  directusAssetUrl,
  fetchBlogSettings,
  fetchContentTypes,
  fetchPosts,
  type ContentType,
  type Post,
} from "@/lib/directus";
import { cn } from "@/lib/utils";

const SITE_URL = "https://amartuvshin.com";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchBlogSettings().catch(() => null);
  const heading = settings?.heading ?? "Notes and essays.";
  const description =
    settings?.description ??
    "Writing about AI agents, agentic workflows, and the craft of shipping reliable software.";
  return {
    title: {
      absolute:
        settings?.seo_title ??
        "Articles on AI Agents, MCP Servers & Full-Stack Engineering — Amartuvshin Surenjav",
    },
    description,
    alternates: {
      canonical: `${SITE_URL}/blog`,
      types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
    },
    openGraph: {
      title: `${heading.replace(/\.$/, "")} — Amartuvshin Surenjav`,
      description,
      url: `${SITE_URL}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.seo_title ?? `${heading.replace(/\.$/, "")} — Amartuvshin Surenjav`,
      description,
    },
  };
}

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function blogJsonLd(posts: Post[], heading: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Amartuvshin Surenjav — ${heading.replace(/\.$/, "")}`,
    inLanguage: "en",
    url: `${SITE_URL}/blog`,
    author: { "@type": "Person", name: "Amartuvshin Surenjav" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      inLanguage: "en",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.published_at ?? p.date_created,
      dateModified: p.date_updated ?? p.published_at ?? p.date_created,
      description: p.excerpt ?? undefined,
    })),
  };
}

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${SITE_URL}/blog`,
      },
    ],
  };
}

type SearchParams = Promise<{ type?: string | string[] }>;

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const requestedType = Array.isArray(sp.type) ? sp.type[0] : sp.type;

  const [settings, types] = await Promise.all([
    fetchBlogSettings().catch(() => null),
    fetchContentTypes().catch(() => [] as ContentType[]),
  ]);

  const activeType =
    types.find((t) => t.slug === requestedType) ??
    types[0] ??
    null;

  let posts: Post[] = [];
  let loadError: string | null = null;
  try {
    posts = activeType ? await fetchPosts(activeType.slug) : await fetchPosts();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load posts";
  }

  const heading = settings?.heading ?? "Notes and essays.";
  const description = settings?.description ?? null;
  const eyebrow = settings?.eyebrow ?? null;
  const minReadSuffix = settings?.min_read_suffix ?? "min read";
  const filterAriaLabel = settings?.filter_aria_label ?? "Filter articles by type";
  const errorTitle = settings?.error_title ?? "Unable to connect to the CMS";
  const errorBody =
    settings?.error_body ??
    "The blog backend returned an error. Please try again shortly.";
  const noPostsTitle = settings?.no_posts_title ?? "Articles coming soon";
  const noPostsBody =
    settings?.no_posts_body ??
    "New writing is in progress. Please check back soon.";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd(posts, heading)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />
      <section className="card-surface relative overflow-hidden p-6 sm:p-10">
        <div className="relative space-y-5">
          {eyebrow ? <span className="section-badge">{eyebrow}</span> : null}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {heading}
          </h1>
          {description ? (
            <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
              {description}
            </p>
          ) : null}
          {types.length > 1 ? (
            <TabsBar
              types={types}
              activeSlug={activeType?.slug}
              ariaLabel={filterAriaLabel}
            />
          ) : null}
          {activeType?.description ? (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {activeType.description}
            </p>
          ) : null}
        </div>
      </section>

      {loadError ? (
        <EmptyState title={errorTitle} body={`${errorBody} (${loadError})`} />
      ) : posts.length === 0 ? (
        <EmptyState title={noPostsTitle} body={noPostsBody} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, index) => (
            <PostCard
              key={p.id}
              post={p}
              minReadSuffix={minReadSuffix}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}

function TabsBar({
  types,
  activeSlug,
  ariaLabel,
}: {
  types: ContentType[];
  activeSlug?: string;
  ariaLabel: string;
}) {
  return (
    <nav
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap items-center gap-1 rounded-full bg-muted p-1"
    >
      {types.map((t) => {
        const isActive = t.slug === activeSlug;
        const href = `/blog?type=${encodeURIComponent(t.slug)}`;
        return (
          <Link
            key={t.id}
            href={href}
            role="tab"
            aria-selected={isActive}
            scroll={false}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="card-surface p-10 text-center sm:p-14">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function PostCard({
  post,
  minReadSuffix,
  index,
}: {
  post: Post;
  minReadSuffix: string;
  index: number;
}) {
  const cover = directusAssetUrl(post.cover_image, {
    width: 800,
    height: 450,
    fit: "cover",
    quality: 80,
  });
  return (
    <Reveal delay={Math.min(index, 6) * 0.06} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full rounded-2xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        <article className="tile-surface flex h-full flex-col overflow-hidden transition-colors group-hover:border-primary/40">
          {cover ? (
            <div className="relative aspect-video overflow-hidden bg-muted/20">
              <Image
                src={cover}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col space-y-3 p-5">
            <PostMeta post={post} minReadSuffix={minReadSuffix} />
            <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

function PostMeta({
  post,
  minReadSuffix,
}: {
  post: Post;
  minReadSuffix: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
      {post.type?.label ? <span>{post.type.label}</span> : null}
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
  );
}
