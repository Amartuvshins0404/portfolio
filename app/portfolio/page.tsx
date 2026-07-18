import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import IdentityGraph from "@/components/IdentityGraph";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
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

export const dynamic = "force-dynamic";

const SITE_URL = "https://portfolio.amartuvshin.com";

export const metadata: Metadata = {
  title: { absolute: "Security & AI Engineering Portfolio | Amartuvshin" },
  description:
    "Security engineering, AI workflows, and production full-stack projects by Amartuvshin Surenjav in Ulaanbaatar, Mongolia.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: "Amartuvshin Surenjav — Portfolio",
    description:
      "Security engineering, AI agentic workflows, and production full-stack products built by Amartuvshin Surenjav.",
  },
};

export default async function PortfolioPage() {
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
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebSite",
        name: project.title,
        url: project.demo_url,
        description: project.description,
        author: { "@type": "Person", name: "Amartuvshin Surenjav" },
      },
    })),
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    inLanguage: ["en", "mn"],
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
    <main className="flex min-h-screen flex-col">
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
