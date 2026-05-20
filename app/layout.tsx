import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/top-nav";
import FixedButtons from "@/components/fixed-buttons";
import { ThemeProvider } from "@/components/theme-provider";
import { getProfile, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://amartuvshin.com";

export async function generateMetadata(): Promise<Metadata> {
  const [profile, settings] = await Promise.all([
    getProfile().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  const title =
    settings?.site_title ??
    "Amartuvshin Surenjav — Security Engineer & AI Agentic Workflow Engineer";
  const description =
    settings?.site_description ??
    "Portfolio of Amartuvshin Surenjav — Security Engineer at erxes, Cybersecurity student at MUST-SICT, and AI agentic workflow engineer based in Ulaanbaatar, Mongolia. Shipping full-stack products (flint.mn, voices.mn, devscomm.com, piano.mn) and AI-native tooling at record speed.";

  const keywords = settings?.meta_keywords ?? [
    "Amartuvshin Surenjav",
    "Amaraa",
    "Mongolia developer",
    "security engineer",
    "AI agentic workflows",
    "Claude Code",
    "MCP servers",
    "full-stack engineer",
    "Next.js",
    "TypeScript",
    "React",
    "GraphQL Federation",
    "erxes",
    "MUST-SICT",
    "flint.mn",
    "voices.mn",
    "devscomm.com",
    "piano.mn",
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
    authors: [{ name: profile?.name ?? "Amartuvshin Surenjav", url: SITE_URL }],
    creator: profile?.name ?? "Amartuvshin Surenjav",
    publisher: profile?.name ?? "Amartuvshin Surenjav",
    category: "technology",
    classification: "Personal portfolio",
    alternates: {
      canonical: "/",
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
    verification: {},
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile().catch(() => null);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name ?? "Amartuvshin Surenjav",
    alternateName: profile?.alternate_names ?? [],
    url: SITE_URL,
    image: profile?.profile_image ?? `${SITE_URL}/profile.jpg`,
    jobTitle: profile?.job_title?.split(" — ")[0] ?? "Security Engineer",
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
    email: `mailto:${profile?.email ?? "amaraaamka0404@gmail.com"}`,
    telephone: profile?.phone ?? "+976-8036-0420",
    knowsAbout: [
      "Application Security",
      "Vulnerability Triage",
      "CodeQL",
      "OWASP",
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL Federation",
      "MongoDB",
      "PostgreSQL",
      "Claude Code",
      "MCP servers",
      "AI agentic workflows",
    ],
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
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: profile?.name ?? "Amartuvshin Surenjav",
      url: SITE_URL,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TopNav profile={profile} />
          {children}
          <FixedButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
