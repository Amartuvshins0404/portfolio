"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type {
  CMSProfile,
  CMSSiteSettings,
  CMSSocialLink,
} from "@/lib/cms";
import type { ServiceSite } from "@/lib/directus";
import { Reveal } from "@/components/portfolio-motion";

const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="h-3.5 w-3.5" />,
  Github: <Github className="h-3.5 w-3.5" />,
  Twitter: <Twitter className="h-3.5 w-3.5" />,
  Instagram: <Instagram className="h-3.5 w-3.5" />,
};


const headingContainer: Variants = {
  rest: {},
  show: { transition: { staggerChildren: 0.065 } },
};

const headingWord: Variants = {
  rest: { y: 24, rotate: 2, filter: "blur(8px)" },
  show: {
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

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
  const headingParts = heading.split(/\s+/);
  const headingWords = headingParts.map((text, index) => ({
    text,
    muted: index >= headingParts.length - 2,
  }));
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-10">
          {profile?.available_for_freelance && (
            <Reveal className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                {settings?.contact_availability_label ??
                  "Available for new projects"}
              </span>
            </Reveal>
          )}

          <div className="max-w-3xl space-y-5">
            {site?.apply_eyebrow ? (
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {site.apply_eyebrow}
              </p>
            ) : null}
            <motion.h2
              aria-label={heading}
              initial={reduceMotion ? false : "rest"}
              whileInView={reduceMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-80px" }}
              variants={headingContainer}
              className="text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl lg:text-6xl"
            >
              {headingWords.map((word, index) => (
                <span key={`${word.text}-${index}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
                  <motion.span
                    variants={headingWord}
                    className={`inline-block ${word.muted ? "text-muted-foreground" : ""}`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <Reveal delay={0.12} className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {site?.apply_description ??
                settings?.contact_description ??
                "Reach out to discuss the problem, scope, and the next defensible decision."}
            </Reveal>
          </div>

          <Reveal delay={0.18} className="flex flex-col sm:flex-row items-stretch gap-3 pt-2 w-full max-w-xl">
            {email ? (
              <ContactLine
                href={`mailto:${email}`}
                icon={<Mail className="h-4 w-4" />}
                label={settings?.contact_email_label ?? "Email"}
                value={email}
              />
            ) : null}
            {phone ? (
              <ContactLine
                href={`tel:${phone.replace(/[\s-]/g, "")}`}
                icon={<Phone className="h-4 w-4" />}
                label={settings?.contact_phone_label ?? "Phone"}
                value={phone}
              />
            ) : null}
          </Reveal>

          <motion.div
            initial={reduceMotion ? false : { scale: 0.94, filter: "blur(6px)" }}
            whileInView={reduceMotion ? undefined : { scale: 1, filter: "blur(0px)" }}
            whileHover={reduceMotion ? undefined : { scale: 1.045, rotate: -1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              size="lg"
              className="h-12 px-7 rounded-full text-base font-semibold gap-2 transition-all duration-300 hover:scale-[1.02]"
              asChild
            >
              <Link href={`mailto:${email}`}>
                {site?.hero_primary_cta ??
                  settings?.contact_cta ??
                  "Start a conversation"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <Reveal delay={0.28} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6">
            {socialLinks.map((link) => (
              <SocialLink key={link.platform} href={link.url} icon={iconMap[link.icon] ?? <Linkedin className="h-3.5 w-3.5" />} label={link.platform} />
            ))}
          </Reveal>

          <div className="w-full max-w-2xl pt-10 mt-2 border-t border-border/60">
            <p className="text-xs text-muted-foreground pt-6">
              © {new Date().getFullYear()}{" "}
              {profile?.name ?? "Amartuvshin Surenjav"}.{" "}
              {site?.footer_note ??
                settings?.footer_note ??
                "Built in Ulaanbaatar."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
  return (
    <Link
      href={href}
      className="group flex-1 flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-foreground/40 hover:bg-card transition-all duration-300 text-left"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
        {icon}
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground truncate">
          {value}
        </span>
      </span>
      <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
    >
      {icon}
      <span>{label}</span>
      <span className="h-px w-0 bg-foreground transition-all duration-300 group-hover:w-3" />
    </Link>
  );
}
