import type { MetadataRoute } from "next";
import { getProfile } from "@/lib/cms";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const profile = await getProfile().catch(() => null);

  return {
    name: profile?.name ? `${profile.name} — Portfolio` : "Amartuvshin Surenjav — Portfolio",
    short_name: profile?.name?.split(" ")[0] ?? "Amartuvshin",
    description:
      profile?.bio_short
        ? `${profile.bio_short} Based in ${profile.location ?? "Ulaanbaatar, Mongolia"}.`
        : "Security Engineer at erxes, Cybersecurity student at MUST-SICT, and AI agentic workflow engineer based in Ulaanbaatar, Mongolia.",
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
