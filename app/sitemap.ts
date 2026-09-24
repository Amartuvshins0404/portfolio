import type { MetadataRoute } from "next";
import { fetchPages, fetchPosts } from "@/lib/directus";

const SITE_URL = "https://amartuvshin.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const portfolioEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const [posts, mnPages] = await Promise.all([
    fetchPosts().catch(() => []),
    fetchPages("mn").catch(() => []),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(
      post.date_updated ?? post.published_at ?? post.date_created,
    ),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const mnEntries: MetadataRoute.Sitemap = mnPages.map((page) => ({
    url:
      page.slug === "index"
        ? `${SITE_URL}/mn`
        : `${SITE_URL}/mn/${page.slug}`,
    lastModified: new Date(
      page.date_updated ?? page.published_at ?? page.date_created,
    ),
    changeFrequency: "monthly",
    priority: page.slug === "index" ? 0.8 : 0.7,
  }));

  return [...portfolioEntries, ...postEntries, ...mnEntries];
}
