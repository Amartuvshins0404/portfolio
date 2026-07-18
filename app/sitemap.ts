import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { fetchPosts } from "@/lib/directus";

const SITE_URL = "https://amartuvshin.com";
const PORTFOLIO_URL = "https://portfolio.amartuvshin.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const hostname = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    ""
  )
    .split(",")[0]
    .trim()
    .split(":")[0];
  const lastModified = new Date();

  if (hostname !== "portfolio.amartuvshin.com") {
    return [
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
    ];
  }

  const portfolioEntries: MetadataRoute.Sitemap = [
    {
      url: PORTFOLIO_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${PORTFOLIO_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  try {
    const posts = await fetchPosts();
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${PORTFOLIO_URL}/blog/${post.slug}`,
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
