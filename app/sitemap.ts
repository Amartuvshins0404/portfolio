import type { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/directus";

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

  try {
    const posts = await fetchPosts();
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(
        post.date_updated ?? post.published_at ?? post.date_created,
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
    return [...portfolioEntries, ...postEntries];
  } catch {
    return portfolioEntries;
  }
}
