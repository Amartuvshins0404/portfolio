import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CMSProfile, CMSSiteSettings, CMSSocialLink } from "@/lib/cms";
import type { ServiceSite } from "@/lib/directus";
import { seoAvailability } from "@/lib/seo";

export default function Contact({
  profile,
  socialLinks,
  settings,
  site,
}: {
  profile: CMSProfile | null;
  socialLinks: CMSSocialLink[];
  settings?: CMSSiteSettings | null;
  site?: ServiceSite | null;
}) {
  const email =
    site?.contact_email ?? profile?.email ?? "amaraaamka0404@gmail.com";
  const phone = site?.contact_phone ?? profile?.phone ?? null;
  const heading =
    site?.apply_title ??
    settings?.contact_title ??
    "Let’s build something worth shipping.";
  const description =
    site?.apply_description ?? settings?.contact_description ?? null;
  const availability = seoAvailability(profile, settings ?? null);

  return (
    <section id="contact" className="card-surface p-6 sm:p-10">
      <span className="section-badge">{site?.apply_eyebrow ?? "Contact"}</span>
      <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {availability ? (
        <p className="mt-8 flex items-center gap-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {availability}
        </p>
      ) : null}
      <Link
        href={`mailto:${email}`}
        className={`${availability ? "mt-3" : "mt-8"} inline-block break-all text-2xl font-semibold tracking-tight underline decoration-border decoration-2 underline-offset-8 transition-colors hover:decoration-primary sm:text-3xl`}
      >
        {email}
      </Link>
      <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        {phone ? (
          <li>
            <Link
              href={`tel:${phone.replace(/[\s-]/g, "")}`}
              className="font-mono text-muted-foreground hover:text-foreground"
            >
              {phone}
            </Link>
          </li>
        ) : null}
        {socialLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.platform}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
