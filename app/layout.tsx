import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/top-nav";
import FixedButtons from "@/components/fixed-buttons";
import { ThemeProvider } from "@/components/theme-provider";

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
const SITE_NAME = "Amartuvshin Surenjav";
const SITE_TITLE =
  "Amartuvshin Surenjav — Security Engineer & AI Agentic Workflow Engineer";
const SITE_DESCRIPTION =
  "Portfolio of Amartuvshin Surenjav — Security Engineer at erxes, Cybersecurity student at MUST-SICT, and AI agentic workflow engineer based in Ulaanbaatar, Mongolia. Shipping full-stack products (flint.mn, voices.mn, devscomm.com, piano.mn) and AI-native tooling at record speed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Amartuvshin Surenjav",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Amartuvshin Surenjav",
    "Amaraa",
    "Amartuvshin",
    "Mongolia developer",
    "Mongolian software engineer",
    "Ulaanbaatar developer",
    "security engineer Mongolia",
    "application security engineer",
    "AI agentic workflows",
    "Claude Code",
    "MCP servers",
    "full-stack engineer",
    "Next.js developer",
    "TypeScript engineer",
    "React engineer",
    "GraphQL Federation",
    "erxes",
    "MUST-SICT",
    "flint.mn",
    "voices.mn",
    "devscomm.com",
    "piano.mn",
  ],
  authors: [{ name: "Amartuvshin Surenjav", url: SITE_URL }],
  creator: "Amartuvshin Surenjav",
  publisher: "Amartuvshin Surenjav",
  category: "technology",
  classification: "Personal portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: "Amartuvshin",
    lastName: "Surenjav",
    username: "Amartuvshins0404",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    apple: "/profile.jpg",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {},
};

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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amartuvshin Surenjav",
  alternateName: ["Amaraa", "Amartuvshin"],
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: "Security Engineer",
  worksFor: {
    "@type": "Organization",
    name: "erxes Mongolia LLC",
    url: "https://erxes.io",
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
  email: "mailto:amaraaamka0404@gmail.com",
  telephone: "+976-8036-0420",
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
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: "Amartuvshin Surenjav",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <TopNav />
          {children}
          <FixedButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
