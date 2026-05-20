import type { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/directus";

const SITE_URL = "https://amartuvshin.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "mn-MN": SITE_URL,
          "mn-Cyrl": SITE_URL,
          "mn-Latn": SITE_URL,
          en: SITE_URL,
          "x-default": SITE_URL,
        },
      },
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
    const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date_updated ?? p.published_at ?? p.date_created),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
    return [...staticEntries, ...postEntries];
  } catch {
    return staticEntries;
  }
}
