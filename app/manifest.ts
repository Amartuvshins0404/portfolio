import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getProfile } from "@/lib/cms";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const [profile, requestHeaders] = await Promise.all([
    getProfile().catch(() => null),
    headers(),
  ]);
  const hostname = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    ""
  )
    .split(",")[0]
    .trim()
    .split(":")[0];
  const isPortfolio = hostname === "portfolio.amartuvshin.com";

  return {
    name: isPortfolio
      ? `${profile?.name ?? "Amartuvshin Surenjav"} — Portfolio`
      : "Amartuvshin Surenjav — Web & AI Product Engineering",
    short_name: profile?.name?.split(" ")[0] ?? "Amartuvshin",
    description: isPortfolio
      ? profile?.bio_short ??
        "Security engineering, AI agentic workflows, and production full-stack products by Amartuvshin Surenjav."
      : "End-to-end web development, AI agentic workflows, and application security services from Ulaanbaatar, Mongolia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: profile?.profile_image ?? "/profile.jpg",
        sizes: "1080x1080",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
