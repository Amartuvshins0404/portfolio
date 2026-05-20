"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Globe className="h-4 w-4" />,
    title: "Website hiine · Веб сайт хийх",
    subtitle: "Landing & marketing sites",
    description:
      "Хямд, хурдан landing page болон marketing site — Next.js + Tailwind дээр бүтээгдсэн. Mongolian SEO (website hiine, web hogjuuleh, веб сайт хийх) ба analytics багтсан.",
    timeline: "3-7 хоног",
  },
  {
    icon: <Layers className="h-4 w-4" />,
    title: "Web hogjuuleh · Full-stack хөгжүүлэлт",
    subtitle: "Production-ready web apps",
    description:
      "Full-stack веб сайт хөгжүүлэлт — auth, CMS, admin panel, payments, integrations. flint.mn, voices.mn, piano.mn зэрэг шиг live products бүтээсэн туршлагатай.",
    timeline: "3-6 долоо хоног",
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "AI Agentic Workflows",
    subtitle: "Claude Code · MCP servers",
    description:
      "Claude Code, custom MCP server, тусгай skill-үүдийг ашиглан engineering автоматжуулалт. Нэг developer-ийг бүхэл багийн хурдтай ажиллуулах хөшүүрэг.",
    timeline: "Project-based",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Security audit · Vulnerability triage",
    subtitle: "OWASP · CodeQL · GraphQL Federation",
    description:
      "Application security review, code-scanning сэрэмжлүүлгийн triage, vulnerability fix. Erxes-д enterprise SaaS security дээр ажилласан туршлагатай.",
    timeline: "1-3 долоо хоног",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Website hiine — хэдэн төгрөг вэ? How much does a website cost in Mongolia?",
    a: "Веб сайт хийх төсөв нь scope-оос хамаарна. Энгийн landing page (1-3 хуудас) дунджаар 1-3 сая төгрөг, full-stack веб app (auth, CMS, payments) 5-15 сая төгрөг. Хямд, тогтмол үнэтэй pricing-ийн хувьд scope-ийг эхэлж тодорхойлоод дараа нь fixed quote өгдөг.",
  },
  {
    q: "Хэр хурдан website hiine? How fast can you ship?",
    a: "Landing page 3-7 хоног, marketing site 1-2 долоо хоног, full-stack бүтээгдэхүүн 3-6 долоо хоног дотор production-д гарна. AI agentic workflow (Claude Code + MCP servers) ашигладаг учраас record хурдтай.",
  },
  {
    q: "Хямд website хийдэг үү? Do you offer affordable web development?",
    a: "Тийм. Startup, жижиг бизнес, эсвэл MVP-д зориулсан хямд landing page-ийн option байгаа. Том scope-той project-ийн хувьд phased delivery хийж budget-ийг хэсэг хэсгээр хуваан ажиллах боломжтой.",
  },
  {
    q: "Mongolia-аас гадуур ажилладаг уу? Do you work with international clients?",
    a: "Тийм. Улаанбаатар (Ulaanbaatar) дотор болон remote-оор Mongolia-аас гадуурх клиентүүдтэй ажилладаг. UTC+8 timezone-д байгаа учраас Азийн орнуудтай ажиллахад ялангуяа хялбар.",
  },
  {
    q: "Ямар technology ашигладаг вэ? What tech stack do you use?",
    a: "Frontend: Next.js (App Router), React 19, TypeScript, Tailwind v4. Backend: Node.js, GraphQL Federation, PostgreSQL, MongoDB, Redis, MinIO. AI: Claude Code, MCP servers. Security: OWASP, CodeQL.",
  },
  {
    q: "Аль live website-уудыг хийсэн бэ? Which live products have you shipped?",
    a: "flint.mn (dating platform), voices.mn (multi-tenant news), devscomm.com (developer community), piano.mn (Mongolian Piano Association). Бүгд production-д ажиллаж байгаа, end-to-end бүтээсэн.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Website hiine · Веб сайт хийх services — Mongolia"
    >
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-muted-foreground/50" />
              Services · Үйлчилгээ
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Веб сайт хийнэ.
              <span className="block text-muted-foreground text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mt-2">
                Website hiine — Mongolia.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-base md:text-right leading-relaxed">
            Хямд, хурдан, найдвартай <strong className="text-foreground font-semibold">веб сайт хөгжүүлэлт</strong> Улаанбаатар хотоос. Freelance{" "}
            <strong className="text-foreground font-semibold">website hiine</strong> and{" "}
            <strong className="text-foreground font-semibold">web hogjuuleh</strong> services for Mongolian businesses and startups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <div id="faq" className="mt-24 md:mt-32 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8 bg-muted-foreground/50" />
                FAQ · Асуулт хариулт
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Түгээмэл асуултууд.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground text-base md:text-right">
              Mongolia-д website хийлгэхээр төлөвлөж буй хүмүүсийн ихэвчлэн асуудаг асуултууд.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {faqs.map((f, i) => (
              <FAQCard key={f.q} faq={f} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
            >
              Өөр асуулт байна уу? Холбоо барих
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-3xl border border-border/40 bg-card p-6 md:p-8 transition-all duration-500",
        "hover:border-border/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5",
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="space-y-1.5 min-w-0">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground">
              {service.icon}
            </span>
            {service.subtitle}
          </div>
          <h3 className="text-2xl md:text-[1.6rem] font-semibold tracking-tight">
            {service.title}
          </h3>
        </div>
        <span className="shrink-0 text-[11px] font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-muted/60 border border-border/30">
          {service.timeline}
        </span>
      </div>
      <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
        {service.description}
      </p>
    </motion.article>
  );
}

function FAQCard({
  faq,
  index,
}: {
  faq: { q: string; a: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="rounded-2xl border border-border/40 bg-card p-6 md:p-7 transition-colors hover:border-border/80"
    >
      <h3 className="text-base md:text-lg font-semibold tracking-tight mb-3 leading-snug">
        {faq.q}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
    </motion.div>
  );
}
