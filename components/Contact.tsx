"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CMSProfile, CMSSocialLink } from "@/lib/cms";

const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="h-3.5 w-3.5" />,
  Github: <Github className="h-3.5 w-3.5" />,
  Twitter: <Twitter className="h-3.5 w-3.5" />,
  Instagram: <Instagram className="h-3.5 w-3.5" />,
};

export default function Contact({
  profile,
  socialLinks,
}: {
  profile: CMSProfile | null;
  socialLinks: CMSSocialLink[];
}) {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-10">
          {profile?.available_for_freelance && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Available for new projects
              </span>
            </motion.div>
          )}

          <div className="space-y-5 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground"
            >
              Let&apos;s build something <span className="text-muted-foreground">worth shipping.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Freelance projects, security audits, AI-native tooling, or just a sharp second opinion — reach out and let&apos;s talk shape, scope, and timeline.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-stretch gap-3 pt-2 w-full max-w-xl"
          >
            {profile?.email && (
              <ContactLine
                href={`mailto:${profile.email}`}
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={profile.email}
              />
            )}
            {profile?.phone && (
              <ContactLine
                href={`tel:${profile.phone.replace(/[\s-]/g, "")}`}
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={profile.phone}
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="h-12 px-7 rounded-full text-base font-semibold gap-2 transition-all duration-300 hover:scale-[1.02]"
              asChild
            >
              <Link href={`mailto:${profile?.email ?? "amaraaamka0404@gmail.com"}`}>
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6"
          >
            {socialLinks.map((link) => (
              <SocialLink key={link.platform} href={link.url} icon={iconMap[link.icon] ?? <Linkedin className="h-3.5 w-3.5" />} label={link.platform} />
            ))}
          </motion.div>

          <div className="w-full max-w-2xl pt-10 mt-2 border-t border-border/60">
            <p className="text-xs text-muted-foreground pt-6">
              © {new Date().getFullYear()} {profile?.name ?? "Amartuvshin Surenjav"}. Built in Ulaanbaatar.
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
