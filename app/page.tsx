import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import IdentityGraph from "@/components/IdentityGraph";
import Projects from "@/components/Projects";

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
  title: "Amartuvshin Surenjav — Security Engineer & AI Agentic Workflow Engineer",
  description:
    "Personal portfolio of Amartuvshin Surenjav: Security Engineer at erxes, Cybersecurity student at MUST-SICT, and full-stack builder shipping AI-native tooling and live products (flint.mn, voices.mn, devscomm.com, piano.mn) from Ulaanbaatar, Mongolia.",
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
      <Hero
        stats={stats}
        socialLinks={socialLinks}
        tagline={settings?.tagline ?? null}
        subtitle={settings?.subtitle ?? null}
        profile={profile}
      />
      <IdentityGraph />
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
