import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import { DeliveryProcess, ServiceHero } from "@/components/ServiceLanding";
import {
  getProfile,
  getProjects,
  getSocialLinks,
  getStats,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

const SITE_URL = "https://amartuvshin.com";

export const metadata: Metadata = {
  title: "Web Development, AI Workflows & Security Services",
  description:
    "End-to-end web development in Ulaanbaatar, Mongolia. Production websites, full-stack applications, AI agentic workflows, and application security delivered by Amartuvshin Surenjav.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Web Products, AI Workflows & Security — Amartuvshin Surenjav",
    description:
      "From business idea to production: design, full-stack development, AI automation, security, and launch from one accountable engineer.",
  },
};

export default async function ServicesPage() {
  const [profile, projects, socialLinks, stats] = await Promise.all([
    getProfile().catch(() => null),
    getProjects().catch(() => []),
    getSocialLinks().catch(() => []),
    getStats().catch(() => []),
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Amartuvshin Surenjav — Web & AI Product Engineering",
    url: SITE_URL,
    image: profile?.profile_image ?? `${SITE_URL}/profile.jpg`,
    description:
      "End-to-end web development, AI agentic workflow engineering, and application security services.",
    email: profile?.email ?? "amaraaamka0404@gmail.com",
    telephone: profile?.phone ?? "+976-8036-0420",
    founder: {
      "@type": "Person",
      name: profile?.name ?? "Amartuvshin Surenjav",
      url: "https://portfolio.amartuvshin.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ulaanbaatar",
      addressCountry: "MN",
    },
    areaServed: [
      { "@type": "Country", name: "Mongolia" },
      { "@type": "Place", name: "Worldwide remote" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital product services",
      itemListElement: [
        "Landing and marketing websites",
        "Full-stack web applications",
        "AI agentic workflows",
        "Security audits and vulnerability triage",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServiceHero profile={profile} stats={stats} />
      <Services />
      <DeliveryProcess />
      <Projects projects={projects} />
      <Contact profile={profile} socialLinks={socialLinks} />
    </main>
  );
}
