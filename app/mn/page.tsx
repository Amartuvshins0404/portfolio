import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPage, fetchPages } from "@/lib/directus";
import { getProfile } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";
import MdcRenderer from "@/components/mdc/MdcRenderer";
import MnPageCard from "@/components/mn/MnPageCard";
import MnContactCta from "@/components/mn/MnContactCta";

export const revalidate = 60;

const url = `${SITE_URL}/mn`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage("mn", "index").catch(() => null);
  if (!page) {
    return {
      title: "Page not found",
      robots: { index: false, follow: true },
    };
  }
  const title = page.seo_title ?? page.title;
  const description = page.seo_description ?? page.lead ?? undefined;
  return {
    title: { absolute: title },
    description,
    keywords: page.keywords?.length ? page.keywords : null,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "mn_MN",
      url,
      siteName: "Amartuvshin Surenjav",
      title,
      description,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function MnLandingPage() {
  const [page, pages, profile] = await Promise.all([
    fetchPage("mn", "index").catch(() => null),
    fetchPages("mn").catch(() => []),
    getProfile().catch(() => null),
  ]);
  if (!page) notFound();

  const description = page.seo_description ?? page.lead ?? undefined;
  const services = pages.filter((p) => p.kind === "service");
  const articles = pages.filter((p) => p.kind === "article");

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description,
    inLanguage: "mn",
    about: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <main lang="mn" className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <section className="relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-10 space-y-6">
          {page.eyebrow ? (
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              {page.eyebrow}
            </div>
          ) : null}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter break-words">
            {page.title}
          </h1>
          {page.lead ? (
            <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
              {page.lead}
            </p>
          ) : null}
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <MdcRenderer content={page.content ?? ""} />
      </div>

      {services.length > 0 ? (
        <section className="container mx-auto max-w-5xl px-4 md:px-6 pt-16 md:pt-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
            Үйлчилгээ
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((p) => (
              <MnPageCard key={p.id} page={p} />
            ))}
          </div>
        </section>
      ) : null}

      {articles.length > 0 ? (
        <section className="container mx-auto max-w-5xl px-4 md:px-6 pt-16 md:pt-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
            Нийтлэл
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((p) => (
              <MnPageCard key={p.id} page={p} />
            ))}
          </div>
        </section>
      ) : null}

      <MnContactCta page={page} profile={profile} />
    </main>
  );
}
