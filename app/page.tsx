import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Focus from "@/components/Focus";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
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

export const revalidate = 60;

const SITE_URL = "https://amartuvshin.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const title =
    settings?.site_title ?? "Amartuvshin Surenjav — Software Engineer";
  const description =
    settings?.site_description ??
    "Portfolio of Amartuvshin Surenjav, a software engineer in Ulaanbaatar building secure full-stack products and AI systems.";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: "profile",
      url: SITE_URL,
      title,
      description,
    },
  };
}

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
  const profileImageUrl = new URL("/profile.jpg", SITE_URL).toString();

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${settings?.projects_title ?? "Projects"} by ${
      profile?.name ?? "Amartuvshin Surenjav"
    }`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebSite",
        name: project.title,
        url: project.demo_url,
        description: project.description,
        author: {
          "@type": "Person",
          name: profile?.name ?? "Amartuvshin Surenjav",
        },
      },
    })),
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    inLanguage: "en",
    mainEntity: {
      "@type": "Person",
      name: profile?.name ?? "Amartuvshin Surenjav",
      url: SITE_URL,
      image: profile?.profile_image ?? profileImageUrl,
      jobTitle: profile?.job_title?.split(" — ")[0] ?? "Software Engineer",
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
        settings={settings}
        profile={profile}
      />
      <Focus />
      <Projects projects={projects} settings={settings} />
      <Writing />
      <About
        profile={profile}
        settings={settings}
        skills={skills}
        workExperiences={workExperiences}
        educations={educations}
        activities={activities}
      />
      <Contact
        profile={profile}
        socialLinks={socialLinks}
        settings={settings}
      />
    </main>
  );
}
