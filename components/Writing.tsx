import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/portfolio-motion";
import {
  directusAssetUrl,
  fetchBlogSettings,
  fetchPosts,
  type Post,
} from "@/lib/directus";
import type { CMSSiteSettings } from "@/lib/cms";

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Writing({
  settings,
}: {
  settings: CMSSiteSettings | null;
}) {
  const [posts, blogSettings] = await Promise.all([
    fetchPosts().catch(() => []),
    fetchBlogSettings().catch(() => null),
  ]);
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section id="writing" className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl space-y-14 px-4 md:px-6">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              {settings?.writing_eyebrow ?? "Writing"}
            </div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              {settings?.writing_title ??
                "Notes on AI agents, platform engineering, and shipping software."}
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground md:text-right">
            {blogSettings?.description ??
              "Long-form articles and case studies from real production work."}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <WritingCard key={post.id} post={post} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14} className="flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/blog">
              {settings?.writing_cta ?? blogSettings?.all_posts_label ??
                "All articles"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function WritingCard({ post }: { post: Post }) {
  const cover = directusAssetUrl(post.cover_image, {
    width: 800,
    height: 450,
    fit: "cover",
    quality: 80,
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-3xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/90 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-border/80">
        {cover ? (
          <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col space-y-3 p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
            {post.type?.label ? <span>{post.type.label}</span> : null}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formatDate(post.published_at ?? post.date_created)}
            </span>
            {post.reading_time ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.reading_time} min read
              </span>
            ) : null}
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}
          {post.tags && post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/30 bg-muted/60 px-2.5 py-1 text-[11px] text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
