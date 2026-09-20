import { fetchPosts } from "@/lib/directus";

const SITE_URL = "https://amartuvshin.com";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await fetchPosts().catch(() => []);
  const newestPost = posts[0];
  const lastBuildDate = new Date(
    newestPost?.published_at ?? newestPost?.date_created ?? Date.now(),
  ).toUTCString();
  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(
        post.published_at ?? post.date_created,
      ).toUTCString();
      const categories = (post.tags ?? [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
      return `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(postUrl)}</link><guid isPermaLink="true">${escapeXml(postUrl)}</guid><pubDate>${pubDate}</pubDate><description>${escapeXml(post.excerpt ?? "")}</description>${categories}</item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Amartuvshin Surenjav — Writing</title><link>${SITE_URL}/blog</link><description>Articles and case studies on application security, MCP servers, AI agent workflows, and full-stack engineering.</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/><lastBuildDate>${lastBuildDate}</lastBuildDate>${items}</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
