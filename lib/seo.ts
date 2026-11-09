import type { CMSProfile, CMSSiteSettings } from "@/lib/cms";

export const SITE_URL = "https://amartuvshin.com";

export const SEO_ROLE = "Full-Stack, Mobile & AI Agent Engineer";
export const SEO_CITY = "Ulaanbaatar";
export const SEO_COUNTRY = "Mongolia";

// Search intents this site should rank for (what a client or recruiter types),
// rather than the owner's name.
export const SEO_KEYWORDS = [
  "software engineer Ulaanbaatar",
  "web developer Mongolia",
  "full-stack developer Mongolia",
  "mobile app developer Mongolia",
  "React Native developer Mongolia",
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

// Cyrillic Mongolian queries — Mongolian users search in Cyrillic, so the
// name and core service terms need Cyrillic variants to rank for them.
export const SEO_NAME_MN = "Амартүвшин Сүрэнжав";

export const SEO_MN_KEYWORDS = [
  "Амартүвшин Сүрэнжав",
  "Амартувшин Сүрэнжав",
  "Амараа Сүрэнжав",
  "программ хангамжийн инженер Монгол",
  "программист Улаанбаатар",
  "Монгол программист",
  "вэб хөгжүүлэгч Монгол",
  "вэб хөгжүүлэгч Улаанбаатар",
  "мобайл апп хөгжүүлэгч",
  "апп хөгжүүлэгч Монгол",
  "вэб сайт хөгжүүлэх",
  "вэб сайт захиалах",
  "AI агент хөгжүүлэгч",
  "хиймэл оюун ухаан хөгжүүлэгч",
  "хөгжүүлэгч ажилд авах",
  "фриланс хөгжүүлэгч Монгол",
  "Next.js хөгжүүлэгч",
];

export const SEO_ALTERNATE_NAMES = [
  "Amaraa",
  "Amartuvshin",
  "Амартүвшин Сүрэнжав",
  "Амартувшин Сүрэнжав",
  "Амартүвшин",
  "Амараа",
];

// Short Mongolian-language summary rendered as visible on-page text so there
// is real Cyrillic content for search engines to index.
export const SEO_MN_SUMMARY =
  "Амартүвшин Сүрэнжав — Монгол Улсын Улаанбаатар хотод ажилладаг программ хангамжийн инженер, вэб, мобайл апп болон AI агент хөгжүүлэгч. Тэрээр erxes компанид AI агент болон платформын системүүдийг хөгжүүлдэг бөгөөд Next.js, React, TypeScript ашиглан вэб бүтээгдэхүүн, React Native, Expo ашиглан мобайл апп, MCP сервер, агентлаг ажлын урсгал бүтээдэг. Фриланс, гэрээт болон алсын зайнаас ажиллах төслүүдэд нээлттэй.";

export const SEO_OCCUPATIONS = [
  "Software Engineer",
  "Full-Stack Developer",
  "Web Developer",
  "Mobile App Developer",
  "AI Agent Developer",
];

export const SEO_SERVICES = [
  "Full-stack web development (Next.js, React, TypeScript)",
  "Mobile app development (React Native, Expo)",
  "Enterprise AI agent workflows (permission-scoped tools, human approval, durable runs)",
  "MCP server development",
  "GraphQL and backend platform engineering",
  "Security engineering for web platforms",
];

export function seoName(profile: CMSProfile | null) {
  return profile?.name ?? "Amartuvshin Surenjav";
}

export function seoAlternateNames(profile: CMSProfile | null) {
  return [
    ...new Set([...(profile?.alternate_names ?? []), ...SEO_ALTERNATE_NAMES]),
  ];
}

export function seoTitle(profile: CMSProfile | null) {
  return `${seoName(profile)} — ${SEO_ROLE} in ${SEO_CITY}, ${SEO_COUNTRY}`;
}

export function seoDescription(profile: CMSProfile | null) {
  const name = seoName(profile);
  const availability =
    profile?.available_for_freelance === false
      ? ""
      : " Open to freelance, contract and remote work.";
  return `${name} is a full-stack, mobile and AI agent engineer in ${SEO_CITY}, ${SEO_COUNTRY}, building websites and web apps (Next.js, React, TypeScript), mobile apps (React Native, Expo) and AI agent workflows for enterprise systems.${availability}`;
}

export function seoAvailability(
  profile: CMSProfile | null,
  settings: CMSSiteSettings | null,
) {
  if (profile?.available_for_freelance === false) return null;
  return settings?.about_freelance_label ?? "Open to freelance & contract work";
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
