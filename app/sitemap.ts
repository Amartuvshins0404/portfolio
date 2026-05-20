import type { MetadataRoute } from "next";

const SITE_URL = "https://amartuvshin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
