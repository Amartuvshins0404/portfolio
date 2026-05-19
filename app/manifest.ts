import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amartuvshin Surenjav — Portfolio",
    short_name: "Amartuvshin",
    description:
      "Security Engineer at erxes, Cybersecurity student at MUST-SICT, and AI agentic workflow engineer based in Ulaanbaatar, Mongolia.",
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
        src: "/profile.jpg",
        sizes: "1080x1080",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
