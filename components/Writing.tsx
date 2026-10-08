import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
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
    <section id="writing" className="card-surface p-5 sm:p-7">
      <Reveal className="flex flex-wrap items-center justify-between gap-4">
        <span className="section-badge">
          {settings?.writing_eyebrow ?? "Writing"}
        </span>
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {settings?.writing_title ??
            "Notes on AI agents, platform engineering, and shipping software."}
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-6">
        <div className="grid gap-4 md:grid-cols-3">
          {latestPosts.map((post) => (
            <WritingCard key={post.id} post={post} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.14} className="mt-6 flex justify-end">
        <Link
          href="/blog"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          {settings?.writing_cta ?? blogSettings?.all_posts_label ??
            "All articles"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
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
      className="group block rounded-2xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
    >
      <article className="tile-surface flex h-full flex-col overflow-hidden transition-colors group-hover:border-primary/40">
        {cover ? (
          <div className="relative aspect-video overflow-hidden bg-muted/20">
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col space-y-3 p-5">
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
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
