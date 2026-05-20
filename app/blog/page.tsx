import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
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
  const heading = settings?.heading ?? "Writing";
  const description =
    settings?.description ??
    "Long-form notes from Amartuvshin Surenjav.";
  return {
    title: `${heading.replace(/\.$/, "")} — Amartuvshin Surenjav`,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${heading.replace(/\.$/, "")} — Amartuvshin Surenjav`,
      description,
      url: `${SITE_URL}/blog`,
      type: "website",
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
    url: `${SITE_URL}/blog`,
    author: { "@type": "Person", name: "Amartuvshin Surenjav" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.published_at ?? p.date_created,
      dateModified: p.date_updated ?? p.published_at ?? p.date_created,
      description: p.excerpt ?? undefined,
    })),
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

  const heading = settings?.heading ?? "Writing";
  const description = settings?.description ?? null;
  const eyebrow = settings?.eyebrow ?? null;

  const [featured, ...rest] = posts;

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd(posts, heading)),
        }}
      />
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-10 space-y-6">
          {eyebrow ? (
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              {eyebrow}
            </div>
          ) : null}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            {heading}
          </h1>
          {description ? (
            <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </section>

      {types.length > 1 ? (
        <section className="container mx-auto max-w-5xl px-4 md:px-6 pb-2">
          <TabsBar types={types} activeSlug={activeType?.slug} />
        </section>
      ) : null}

      <section className="pb-24 md:pb-32 pt-8 md:pt-10">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          {activeType?.description ? (
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground mb-12 md:mb-16">
              {activeType.description}
            </p>
          ) : null}

          {loadError ? (
            <EmptyState
              title="Couldn't reach the CMS"
              body={`The blog backend returned an error. Try again later. (${loadError})`}
            />
          ) : posts.length === 0 ? (
            <EmptyState
              title={
                activeType ? `No ${activeType.label.toLowerCase()} yet` : "No posts yet"
              }
              body={
                activeType
                  ? `Drafts are cooking. Check back soon, or pick another tab above.`
                  : `Drafts are cooking. Check back soon.`
              }
            />
          ) : (
            <div className="space-y-16">
              {featured ? <FeaturedCard post={featured} /> : null}
              {rest.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {rest.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function TabsBar({
  types,
  activeSlug,
}: {
  types: ContentType[];
  activeSlug?: string;
}) {
  return (
    <nav
      role="tablist"
      aria-label="Filter posts by type"
      className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border/50 bg-card/50 p-1 backdrop-blur-sm"
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
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
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
    <div className="rounded-3xl border border-border/40 bg-card p-10 md:p-14 text-center space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm">{body}</p>
    </div>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  const cover = directusAssetUrl(post.cover_image, {
    width: 1600,
    quality: 85,
  });
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-3xl"
    >
      <article className="relative rounded-3xl border border-border/40 bg-card overflow-hidden transition-all duration-500 group-hover:border-border/80 group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-1">
        {cover ? (
          <div className="relative aspect-[21/9] overflow-hidden bg-muted/20">
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-card/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : null}
        <div className="p-8 md:p-12 space-y-5">
          <PostMeta post={post} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          ) : null}
          <div className="inline-flex items-center gap-2 text-sm font-medium pt-2 text-foreground/80 group-hover:text-foreground transition-colors">
            Read post
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {
  const cover = directusAssetUrl(post.cover_image, {
    width: 1200,
    quality: 82,
  });
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-3xl"
    >
      <article className="relative h-full rounded-3xl border border-border/40 bg-card overflow-hidden transition-all duration-500 group-hover:border-border/80 group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-1">
        {cover ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ) : null}
        <div className="p-6 md:p-7 space-y-3">
          <PostMeta post={post} />
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
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
          {post.reading_time} min read
        </span>
      ) : null}
      {post.tags && post.tags.length > 0 ? (
        <span className="text-muted-foreground/80">
          {post.tags.slice(0, 3).join(" · ")}
        </span>
      ) : null}
    </div>
  );
}
