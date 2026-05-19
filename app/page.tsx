import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import IdentityGraph from "@/components/IdentityGraph";
import Projects from "@/components/Projects";

const SITE_URL = "https://amartuvshin.com";

export const metadata: Metadata = {
  title:
    "Amartuvshin Surenjav — Security Engineer & AI Agentic Workflow Engineer",
  description:
    "Personal portfolio of Amartuvshin Surenjav: Security Engineer at erxes, Cybersecurity student at MUST-SICT, and full-stack builder shipping AI-native tooling and live products (flint.mn, voices.mn, devscomm.com, piano.mn) from Ulaanbaatar, Mongolia.",
  alternates: { canonical: "/" },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Projects by Amartuvshin Surenjav",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebSite",
        name: "Flint",
        url: "https://flint.mn",
        description:
          "Mongolia-native dating platform with swipe-based discovery, voice-note prompts, and real-time messaging.",
        author: { "@type": "Person", name: "Amartuvshin Surenjav" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebSite",
        name: "Voices",
        url: "https://voices.mn",
        description:
          "Digital newsroom platform — multi-tenant CMS with nested admin roles and MinIO-backed media.",
        author: { "@type": "Person", name: "Amartuvshin Surenjav" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "WebSite",
        name: "DevsComm",
        url: "https://devscomm.com",
        description:
          "Community hub for the Mongolian developer scene — articles, events, hackathon registrations, and code challenges.",
        author: { "@type": "Person", name: "Amartuvshin Surenjav" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "WebSite",
        name: "Piano.mn",
        url: "https://piano.mn",
        description:
          "Official platform for the Mongolian Piano Association — competitions, members, courses, and news, powered by Strapi.",
        author: { "@type": "Person", name: "Amartuvshin Surenjav" },
      },
    },
  ],
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  mainEntity: {
    "@type": "Person",
    name: "Amartuvshin Surenjav",
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: "Security Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ulaanbaatar",
      addressCountry: "MN",
    },
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Hero />
      <IdentityGraph />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
