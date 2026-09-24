"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CMSProfile, CMSSiteSettings, CMSSocialLink } from "@/lib/cms";
import type { ServiceSite } from "@/lib/directus";
import { Reveal } from "@/components/portfolio-motion";
import { Line, TextReveal } from "@/components/section-motion";

const ease = [0.16, 1, 0.3, 1] as const;

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
  const reduceMotion = useReducedMotion();
  const email =
    site?.contact_email ?? profile?.email ?? "amaraaamka0404@gmail.com";
  const phone = site?.contact_phone ?? profile?.phone ?? null;
  const heading =
    site?.apply_title ??
    settings?.contact_title ??
    "Let’s build something worth shipping.";
  const available = profile?.available_for_freelance ?? false;

  return (
    <section id="contact" className="pb-10 pt-24 md:pt-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Line />

        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-6 md:py-24">
          <div className="space-y-4 md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {site?.apply_eyebrow ?? "Contact"}
            </p>
            {available ? (
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                {settings?.contact_availability_label ?? "Available"}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-9">
            <TextReveal
              as="h2"
              text={heading}
              className="text-4xl font-semibold leading-[1] tracking-[-0.05em] md:text-6xl lg:text-7xl"
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-12 md:mt-16"
            >
              <Link
                href={`mailto:${email}`}
                className="group relative inline-block max-w-full break-all text-2xl font-medium tracking-[-0.03em] text-foreground md:text-4xl lg:text-5xl"
              >
                {email}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100 md:-bottom-2 md:h-0.5"
                />
              </Link>
              {phone ? (
                <p className="mt-4">
                  <Link
                    href={`tel:${phone.replace(/[\s-]/g, "")}`}
                    className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {phone}
                  </Link>
                </p>
              ) : null}
            </motion.div>
          </div>
        </div>

        <Line delay={0.1} />

        <Reveal
          delay={0.1}
          className="flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between"
        >
          <p>
            © {new Date().getFullYear()} {profile?.name ?? "Amartuvshin Surenjav"}
            {" · "}
            {site?.footer_note ?? settings?.footer_note ?? "Built in Ulaanbaatar."}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono uppercase tracking-[0.18em]">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <FooterLink href={link.url} external>
                  {link.platform}
                </FooterLink>
              </li>
            ))}
            <li>
              <FooterLink href="/mn">Монгол</FooterLink>
            </li>
            <li>
              <FooterLink href="/feed.xml">RSS</FooterLink>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative inline-block text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}
