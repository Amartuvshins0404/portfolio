import type { Metadata } from "next";
import Contact from "@/components/Contact";
import ServiceProof from "@/components/ServiceProof";
import Services from "@/components/Services";
import { DeliveryProcess, ServiceHero } from "@/components/ServiceLanding";
import {
  getProfile,
  getSiteSettings,
  getSocialLinks,
  getStats,
} from "@/lib/cms";
import { getServiceContent } from "@/lib/directus";
import { SEO_KEYWORDS, SITE_URL, seoAreaServed } from "@/lib/seo";

export const revalidate = 60;

const FALLBACK_TITLE =
  "Hire a Software Engineer in Ulaanbaatar, Mongolia — Amartuvshin Surenjav";
const FALLBACK_DESCRIPTION =
  "Hire Amartuvshin Surenjav, a full-stack software engineer and independent technology consultant in Ulaanbaatar, Mongolia. AI agents, Next.js/TypeScript products, and platform engineering — available for freelance, contract, and remote work.";

export async function generateMetadata(): Promise<Metadata> {
  const [content, profile] = await Promise.all([
    getServiceContent("en-US").catch(() => null),
    getProfile().catch(() => null),
  ]);

  const name = profile?.name ?? "Amartuvshin Surenjav";
  const title =
    content?.site.seo_title ??
    `Hire a Software Engineer in Ulaanbaatar, Mongolia — ${name}`;
  const description = content?.site.seo_description ?? FALLBACK_DESCRIPTION;

  return {
    title: { absolute: title },
    description,
    keywords: [
      ...new Set([
        ...SEO_KEYWORDS,
        "hire software engineer Ulaanbaatar",
        "software consultant Mongolia",
        "technology consultant Ulaanbaatar",
        "independent software consultant",
        "contract developer Mongolia",
        "fractional software engineer",
      ]),
    ],
    alternates: {
      canonical: `${SITE_URL}/hire`,
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/hire`,
      siteName: name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Amaraa2404",
      site: "@Amaraa2404",
    },
    robots: { index: true, follow: true },
  };
}

export default async function HirePage() {
  const [content, profile, stats, socialLinks, settings] = await Promise.all([
    getServiceContent("en-US").catch(() => null),
    getProfile().catch(() => null),
    getStats().catch(() => []),
    getSocialLinks().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  const site = content?.site ?? null;
  const offers = content?.offers ?? [];
  const processSteps = content?.processSteps ?? [];
  const faqs = content?.faqs ?? [];
  const proof = content?.proof ?? [];
  const featuredOffer = offers.find((offer) => offer.featured) ?? offers[0] ?? null;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/hire#service`,
    name: site?.seo_title ?? FALLBACK_TITLE,
    description: site?.seo_description ?? FALLBACK_DESCRIPTION,
    url: `${SITE_URL}/hire`,
    serviceType: "Software engineering and technology consulting",
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: seoAreaServed(),
    hasOfferCatalog:
      offers.length > 0
        ? {
            "@type": "OfferCatalog",
            name: "Engagements",
            itemListElement: offers.map((offer, index) => ({
              "@type": "Offer",
              position: index + 1,
              url: `${SITE_URL}/hire#services`,
              itemOffered: {
                "@type": "Service",
                name: offer.title,
                description: offer.summary,
              },
            })),
          }
        : undefined,
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/hire#webpage`,
    name: site?.seo_title ?? FALLBACK_TITLE,
    url: `${SITE_URL}/hire`,
    inLanguage: "en",
    about: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hire",
        item: `${SITE_URL}/hire`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceHero
        profile={profile}
        stats={stats}
        site={site}
        featuredOffer={featuredOffer}
      />
      <Services site={site} offers={offers} faqs={faqs} />
      <DeliveryProcess site={site} steps={processSteps} />
      <ServiceProof site={site} items={proof} />
      <Contact
        profile={profile}
        socialLinks={socialLinks}
        settings={settings}
        site={site}
      />
    </>
  );
}
