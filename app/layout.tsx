import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/app-shell";
import FixedButtons from "@/components/fixed-buttons";
import { ThemeProvider } from "@/components/theme-provider";
import {
  getNavigationLinks,
  getProfile,
  getSiteSettings,
  getSkills,
  getSocialLinks,
} from "@/lib/cms";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  SEO_KEYWORDS,
  SEO_OCCUPATIONS,
  SEO_SERVICES,
  SITE_URL,
  seoAreaServed,
  seoDescription,
  seoOccupation,
  seoTitle,
} from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [profile, settings] = await Promise.all([
    getProfile().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  const title = seoTitle(profile);
  const description = seoDescription(profile);
  const keywords = [
    ...new Set([...SEO_KEYWORDS, ...(settings?.meta_keywords ?? [])]),
  ];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s · Amartuvshin Surenjav",
    },
    description,
    applicationName: profile?.name ?? "Amartuvshin Surenjav",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords,
    authors: [{ name: profile?.name ?? "Amartuvshin Surenjav", url: "https://amartuvshin.com" }],
    creator: profile?.name ?? "Amartuvshin Surenjav",
    publisher: profile?.name ?? "Amartuvshin Surenjav",
    category: "technology",
    classification: "Digital product services and personal portfolio",
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": `${SITE_URL}/feed.xml`,
      },
    },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: SITE_URL,
      siteName: profile?.name ?? "Amartuvshin Surenjav",
      title,
      description,
      firstName: profile?.name?.split(" ")[0] ?? "Amartuvshin",
      lastName: profile?.name?.split(" ").slice(1).join(" ") ?? "Surenjav",
      username: profile?.github_username ?? "",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Amaraa2404",
      site: "@Amaraa2404",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: { url: "/profile.jpg", sizes: "180x180", type: "image/jpeg" },
    },
    manifest: "/manifest.webmanifest",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: {
        ...(process.env.BING_SITE_VERIFICATION
          ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
          : {}),
      },
    },
  };
}

const FALLBACK_KNOWS_ABOUT = [
  "AI agents",
  "Mastra",
  "MCP servers",
  "Claude Code",
  "Next.js",
  "React",
  "TypeScript",
  "GraphQL Federation",
  "MongoDB",
  "PostgreSQL",
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#06090e" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, navLinks, skills, socialLinks, settings] =
    await Promise.all([
      getProfile().catch(() => null),
      getNavigationLinks().catch(() => []),
      getSkills().catch(() => []),
      getSocialLinks().catch(() => []),
      getSiteSettings().catch(() => null),
    ]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile?.name ?? "Amartuvshin Surenjav",
    alternateName: profile?.alternate_names ?? [],
    url: "https://amartuvshin.com",
    mainEntityOfPage: SITE_URL,
    image: profile?.profile_image ?? `${SITE_URL}/profile.jpg`,
    description: seoDescription(profile),
    jobTitle: profile?.job_title?.split(" — ")[0] ?? "Software Engineer",
    hasOccupation: seoOccupation(profile),
    knowsLanguage: ["en", "mn"],
    worksFor: {
      "@type": "Organization",
      name: profile?.company ?? "erxes Mongolia LLC",
      url: profile?.company_url ?? "https://erxes.io",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Mongolian University of Science and Technology — School of Information & Communication Technology (SICT)",
      url: "https://sict.must.edu.mn/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ulaanbaatar",
      addressCountry: "MN",
    },
    homeLocation: {
      "@type": "City",
      name: "Ulaanbaatar",
      containedInPlace: { "@type": "Country", name: "Mongolia" },
    },
    email: `mailto:${profile?.email ?? "amaraaamka0404@gmail.com"}`,
    telephone: profile?.phone ?? "+976-8036-0420",
    knowsAbout: [
      ...new Set([
        ...(skills.length > 0 ? skills.map((s) => s.name) : FALLBACK_KNOWS_ABOUT),
        ...SEO_OCCUPATIONS,
      ]),
    ],
    makesOffer: SEO_SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: seoAreaServed(),
      },
    })),
    sameAs: [
      "https://github.com/Amartuvshins0404",
      "https://www.linkedin.com/in/amartuvshins/",
      "https://x.com/Amaraa2404",
      "https://www.instagram.com/amartovision/",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile?.name ?? "Amartuvshin Surenjav",
    alternateName: profile?.alternate_names ?? ["Amaraa", "Amartuvshin"],
    description: seoDescription(profile),
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: profile?.name ?? "Amartuvshin Surenjav",
      url: "https://amartuvshin.com",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppShell
            profile={profile}
            navLinks={navLinks}
            socialLinks={socialLinks}
            settings={settings}
          >
            {children}
          </AppShell>
          <FixedButtons />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
