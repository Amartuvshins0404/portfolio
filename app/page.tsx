import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import IdentityGraph from "@/components/IdentityGraph";
import Projects from "@/components/Projects";
import Services from "@/components/Services";

export const dynamic = "force-dynamic";
import {
  getProfile,
  getProjects,
  getSkills,
  getWorkExperiences,
  getEducations,
  getCurrentActivities,
  getSocialLinks,
  getStats,
  getSiteSettings,
} from "@/lib/cms";

const SITE_URL = "https://amartuvshin.com";

export const metadata: Metadata = {
  title:
    "Website hiine Mongolia · Веб сайт хийх — Amartuvshin Surenjav",
  description:
    "Website hiine Mongolia — Amartuvshin Surenjav. Хямд, хурдан, найдвартай веб сайт хийх, web hogjuuleh, AI-native tooling. Freelance web developer in Ulaanbaatar.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [
    profile,
    projects,
    skills,
    workExperiences,
    educations,
    activities,
    socialLinks,
    stats,
    settings,
  ] = await Promise.all([
    getProfile().catch(() => null),
    getProjects().catch(() => []),
    getSkills().catch(() => []),
    getWorkExperiences().catch(() => []),
    getEducations().catch(() => []),
    getCurrentActivities().catch(() => []),
    getSocialLinks().catch(() => []),
    getStats().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects by Amartuvshin Surenjav",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "WebSite",
        name: p.title,
        url: p.demo_url,
        description: p.description,
        author: { "@type": "Person", name: "Amartuvshin Surenjav" },
      },
    })),
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    inLanguage: ["mn", "mn-Cyrl", "mn-Latn", "en"],
    mainEntity: {
      "@type": "Person",
      name: profile?.name ?? "Amartuvshin Surenjav",
      url: SITE_URL,
      image: profile?.profile_image ?? `${SITE_URL}/profile.jpg`,
      jobTitle: profile?.job_title?.split(" — ")[0] ?? "Security Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ulaanbaatar",
        addressCountry: "MN",
      },
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Amartuvshin Surenjav — Website hiine · Веб сайт хийх Mongolia",
    alternateName: [
      "Website hiine",
      "Web hogjuuleh",
      "Веб сайт хийх",
      "Веб хөгжүүлэлт",
    ],
    description:
      "Хямд, хурдан, найдвартай веб сайт хийх — Mongolia. Freelance website development, AI-native tooling, security audits. Next.js, React, TypeScript, Tailwind.",
    url: SITE_URL,
    image: profile?.profile_image ?? `${SITE_URL}/profile.jpg`,
    priceRange: "$$",
    provider: {
      "@type": "Person",
      name: profile?.name ?? "Amartuvshin Surenjav",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Mongolia" },
      { "@type": "City", name: "Ulaanbaatar" },
    ],
    serviceType: [
      "Website development",
      "Веб сайт хийх",
      "Web hogjuuleh",
      "AI agentic workflow engineering",
      "Application security audit",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web development services Mongolia",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website hiine — Landing page · Веб сайт хийх",
            description:
              "Хямд, хурдан landing page болон marketing site. Next.js + Tailwind. Mongolian SEO багтсан.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web hogjuuleh — Full-stack web app",
            description:
              "Full-stack веб сайт хөгжүүлэлт — auth, CMS, admin, payments. Production-ready.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI agentic workflow engineering",
            description:
              "Claude Code, MCP servers, custom skills — нэг developer-ийг бүхэл багийн адил хурдтай ажиллуулах.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Security audit / vulnerability triage",
            description:
              "OWASP, CodeQL, GraphQL Federation security review.",
          },
        },
      ],
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#local`,
    name: "Amartuvshin Surenjav — Freelance Web Development Mongolia",
    image: profile?.profile_image ?? `${SITE_URL}/profile.jpg`,
    url: SITE_URL,
    email: profile?.email ?? "amaraaamka0404@gmail.com",
    telephone: profile?.phone ?? "+976-8036-0420",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ulaanbaatar",
      addressCountry: "MN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.9184,
      longitude: 106.9177,
    },
    areaServed: [
      { "@type": "Country", name: "Mongolia" },
      { "@type": "Country", name: "Global (remote)" },
    ],
    sameAs: [
      "https://github.com/Amartuvshins0404",
      "https://www.linkedin.com/in/amartuvshins/",
      "https://x.com/Amaraa2404",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "mn",
    mainEntity: [
      {
        "@type": "Question",
        name: "Website hiine — хэдэн төгрөг вэ? How much does a website cost in Mongolia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Веб сайт хийх төсөв нь scope-оос хамаарна. Энгийн landing page (1-3 хуудас) дунджаар 1-3 сая төгрөг, full-stack веб app (auth, CMS, payments) 5-15 сая төгрөг. Хямд, тогтмол үнэтэй pricing-ийн хувьд би үргэлж scope-ийг эхэлж тодорхойлдог — дараа нь fixed quote өгдөг.",
        },
      },
      {
        "@type": "Question",
        name: "Хэр хурдан website hiine? How fast can you ship a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Landing page 3-7 хоног, marketing site 1-2 долоо хоног, full-stack бүтээгдэхүүн 3-6 долоо хоног дотор production-д гарна. AI agentic workflow (Claude Code + MCP servers) ашигладаг учраас нэг developer гэдэг бүхэл багийн хурдтай ажилладаг.",
        },
      },
      {
        "@type": "Question",
        name: "Ямар technology ашигладаг вэ? What tech stack do you use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Frontend: Next.js (App Router), React 19, TypeScript, Tailwind v4. Backend: Node.js, GraphQL Federation, PostgreSQL, MongoDB, Redis, MinIO. AI: Claude Code, MCP servers, custom skills. Security: OWASP, CodeQL, JWT review. Production-ready, scalable, modern.",
        },
      },
      {
        "@type": "Question",
        name: "Web hogjuuleh service-уудаа Mongolia-аас гадуур үзүүлдэг үү?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Тийм. Улаанбаатар (Ulaanbaatar) дотор болон remote-оор Mongolia-аас гадуурх клиентүүдтэй ажилладаг. UTC+8 цагийн бүсэд байгаа учраас Азийн орнуудтай ажиллахад ялангуяа хялбар.",
        },
      },
      {
        "@type": "Question",
        name: "Хямд website хийдэг үү? Do you offer affordable web development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Тийм. Startup, жижиг бизнес, эсвэл MVP-д зориулсан хямд landing page-ийн option байгаа. Том scope-той project-ийн хувьд phased delivery (хэсэг хэсгээр хүлээлгэн өгөх) хийж budget-ийг хуваан ажиллах боломжтой.",
        },
      },
      {
        "@type": "Question",
        name: "AI agentic workflow гэж юу вэ? What is AI agentic workflow engineering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI agent-уудыг ашиглан давтагдсан engineering ажлуудыг автоматжуулах — code review, security triage, content generation, deployment гэх мэт. Би Claude Code, custom MCP servers, болон скиллүүдийг ашиглан нэг developer-ийг бүхэл багийн адил хурдтай ажиллуулдаг.",
        },
      },
      {
        "@type": "Question",
        name: "Хэрхэн холбоо барих вэ? How do I get in touch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Email: ${profile?.email ?? "amaraaamka0404@gmail.com"}. Утас: ${profile?.phone ?? "+976-8036-0420"}. Эсвэл LinkedIn, GitHub-ээр шууд бичээрэй. Анхны зөвлөгөө (30 минут) үнэгүй.`,
        },
      },
      {
        "@type": "Question",
        name: "Аль live website-уудыг хийсэн бэ? What live products have you shipped?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "flint.mn (dating platform), voices.mn (multi-tenant news), devscomm.com (developer community), piano.mn (Mongolian Piano Association). Бүгд production-д ажиллаж байгаа, end-to-end бүтээсэн.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services · Website hiine", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 3, name: "Projects", item: `${SITE_URL}/#projects` },
      { "@type": "ListItem", position: 4, name: "FAQ", item: `${SITE_URL}/#faq` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${SITE_URL}/#contact` },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Hero
        stats={stats}
        socialLinks={socialLinks}
        tagline={settings?.tagline ?? null}
        subtitle={settings?.subtitle ?? null}
        profile={profile}
      />
      <IdentityGraph />
      <Services />
      <Projects projects={projects} />
      <About
        profile={profile}
        skills={skills}
        workExperiences={workExperiences}
        educations={educations}
        activities={activities}
      />
      <Contact profile={profile} socialLinks={socialLinks} />
    </main>
  );
}
