import type { CMSProfile } from "@/lib/cms";

export const SITE_URL = "https://amartuvshin.com";

export const SEO_ROLE = "Full-Stack & AI Agent Developer";
export const SEO_CITY = "Ulaanbaatar";
export const SEO_COUNTRY = "Mongolia";

// Search intents this site should rank for (what a client or recruiter types),
// rather than the owner's name.
export const SEO_KEYWORDS = [
  "software engineer Ulaanbaatar",
  "web developer Mongolia",
  "full-stack developer Mongolia",
  "AI agent developer",
  "AI agent developer Mongolia",
  "Next.js developer Mongolia",
  "React developer Ulaanbaatar",
  "TypeScript developer Mongolia",
  "MCP server developer",
  "freelance developer Ulaanbaatar",
  "remote full-stack developer",
  "hire software engineer Mongolia",
  "GraphQL developer Mongolia",
  "Claude Code",
  "Mastra",
  "erxes",
];

export const SEO_OCCUPATIONS = [
  "Software Engineer",
  "Full-Stack Developer",
  "Web Developer",
  "AI Agent Developer",
];

export const SEO_SERVICES = [
  "Full-stack web development (Next.js, React, TypeScript)",
  "AI agent and agentic workflow development",
  "MCP server development",
  "GraphQL and backend platform engineering",
  "Security engineering for web platforms",
];

export function seoName(profile: CMSProfile | null) {
  return profile?.name ?? "Amartuvshin Surenjav";
}

export function seoTitle(profile: CMSProfile | null) {
  return `${seoName(profile)} — ${SEO_ROLE} in ${SEO_CITY}, ${SEO_COUNTRY}`;
}

export function seoDescription(profile: CMSProfile | null) {
  const name = seoName(profile);
  const availability =
    profile?.available_for_freelance === false
      ? ""
      : " Available for freelance and remote work.";
  return `${name} is a full-stack software engineer and AI agent developer in ${SEO_CITY}, ${SEO_COUNTRY}, building Next.js/React/TypeScript products, MCP servers, and agentic workflows.${availability}`;
}

export function seoOccupation(profile: CMSProfile | null) {
  return {
    "@type": "Occupation",
    name: profile?.job_title?.split(" — ")[0] ?? "Software Engineer",
    occupationLocation: {
      "@type": "City",
      name: SEO_CITY,
      containedInPlace: { "@type": "Country", name: SEO_COUNTRY },
    },
    skills: SEO_SERVICES.join(", "),
  };
}

export function seoAreaServed() {
  return [
    { "@type": "Country", name: SEO_COUNTRY },
    { "@type": "Place", name: "Worldwide (remote)" },
  ];
}
