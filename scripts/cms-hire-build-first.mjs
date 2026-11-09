#!/usr/bin/env node

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? "https://cms.amartuvshin.com";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const APPLY = process.argv.includes("--apply");
const LOCALE = "en-US";

if (!DIRECTUS_TOKEN) {
  console.error(
    "DIRECTUS_TOKEN is required: DIRECTUS_TOKEN=... node scripts/cms-hire-build-first.mjs [--apply]",
  );
  process.exit(1);
}

async function api(path, init) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...init?.headers,
    },
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const message = json.errors?.[0]?.message ?? text;
    throw new Error(`${init?.method ?? "GET"} ${path} -> ${res.status}: ${message}`);
  }
  return json.data;
}

const get = (path) => api(path);
const post = (path, body) => api(path, { method: "POST", body: JSON.stringify(body) });
const patch = (path, body) => api(path, { method: "PATCH", body: JSON.stringify(body) });

const PROFILE = {
  job_title: "Full-Stack, Mobile & AI Agent Engineer",
  bio_short:
    "Full-stack, mobile and AI agent engineer building websites, mobile apps and enterprise AI agents.",
};

const SITE_SETTINGS = {
  subtitle:
    "I build mobile apps, websites and AI agent workflows for startups and enterprise teams, from first prototype to production.",
  focus_title: "AI agents for enterprise, web and mobile apps, and agentic developer workflows.",
  about_freelance_label: "Open to freelance & contract work",
};

const FOCUS_AREAS = [
  {
    href: "/blog/erxes-ai-agents-plugin-case-study",
    next: { title: "Enterprise AI Agents" },
  },
  {
    href: "/blog?type=case-studies",
    next: {
      title: "Web & Mobile Apps",
      line: "Next.js websites and web apps, and React Native / Expo mobile apps, shipped end to end.",
      keywords: ["Next.js", "React Native", "Expo"],
    },
  },
];

const SERVICE_SITE = {
  seo_title: "Hire a Full-Stack, Mobile & AI Agent Engineer in Mongolia | Amartuvshin Surenjav",
  seo_description:
    "Hire Amartuvshin Surenjav, an engineer in Ulaanbaatar, Mongolia, to build mobile apps, websites and AI agent workflows for enterprise systems. Open to freelance and contract work. Not sure what to build yet? Start with a System Decision Sprint.",
  hero_title: "Mobile apps, websites and AI agents, built end to end.",
  hero_description:
    "I'm a full-stack, mobile and AI agent engineer in Ulaanbaatar, open to freelance and contract work. I build React Native and Expo apps, Next.js websites and AI agent workflows that plug into your existing systems. Not sure what to build yet? Start with a System Decision Sprint.",
  hero_primary_cta: "Discuss your project",
  hero_secondary_cta: "See what I build",
  offer_eyebrow: "What I build",
  offer_title: "Mobile apps, websites and AI agents.",
  offer_description:
    "Hire me to build it end to end. If the right system isn't clear yet, start with a short paid System Decision Sprint.",
  proof_title: "Products I've built and shipped.",
};

const BUILD_OFFERS = [
  {
    slug: "mobile-app-development",
    sort: 1,
    featured: false,
    copy: {
      title: "Mobile App Development",
      summary:
        "iOS and Android apps built with React Native and Expo, sharing one backend with your website. From the engineer behind the erxes XOS mobile app.",
      duration: null,
      outcome: "A store-ready app on your own accounts",
      deliverables:
        "- React Native / Expo app for iOS and Android\n- One shared API with your web app\n- App Store and Google Play release on your accounts",
      cta_label: "Discuss your app",
      seo_title: null,
      seo_description: null,
    },
  },
  {
    slug: "web-app-development",
    sort: 2,
    featured: false,
    copy: {
      title: "Websites & Web Apps",
      summary:
        "Fast Next.js websites, dashboards and SaaS products in TypeScript, from a landing page to a multi-tenant platform.",
      duration: null,
      outcome: "A fast, maintainable product you own",
      deliverables:
        "- Next.js website or web app with an admin and CMS\n- PostgreSQL or MongoDB backend with auth\n- Deployed on your cloud and ready for search",
      cta_label: "Discuss your website",
      seo_title: null,
      seo_description: null,
    },
  },
  {
    slug: "enterprise-ai-agents",
    sort: 3,
    featured: true,
    copy: {
      title: "Enterprise AI Agent Workflows",
      summary:
        "AI agents that work inside your systems: permission-scoped tools, human approval on risky actions, durable workflows and schedules. The same approach behind erxes AI Agents, shipped to production in 12 days.",
      duration: null,
      outcome: "Agents running safely on your systems",
      deliverables:
        "- Agents with permission-scoped tools\n- Human approval on risky actions\n- Durable workflows and schedules",
      cta_label: "Discuss your agent workflow",
      seo_title: null,
      seo_description: null,
    },
  },
];

const CONSULTING_OFFERS = [
  { slug: "system-decision-sprint", sort: 4, featured: false },
  { slug: "software-vendor-selection", sort: 5, featured: false },
  { slug: "software-proposal-review", sort: 6, featured: false },
];

const FAQ_BUILD = {
  question: /build the system yourself/i,
  next: {
    answer:
      "Yes. I build mobile apps, websites and AI agent workflows myself, end to end. For larger programs I can also bring in and lead specialists, while staying the accountable owner on your side.",
  },
};

const NEW_PROOF = {
  key: "erxes-xos-mobile",
  url: "https://play.google.com/store/apps/details?id=com.erxesxos",
  copy: {
    label: "Mobile · Enterprise CRM",
    title: "erxes XOS Mobile App",
    description:
      "The official React Native companion to the erxes CRM: contacts, deal pipelines, team inbox and tasks in one app.",
    result: "Live on Google Play",
  },
};

const PROOF_ORDER = ["erxes AI Agents", NEW_PROOF.copy.title, "Flint"];
const PROOF_HIDDEN = ["Voices"];

const planned = [];
function plan(label, before, after, run) {
  planned.push({ label, before, after, run });
}

function changesFrom(current, next) {
  return Object.fromEntries(
    Object.entries(next).filter(
      ([key, value]) => JSON.stringify(current?.[key] ?? null) !== JSON.stringify(value),
    ),
  );
}

function beforeOf(current, changes) {
  return Object.fromEntries(Object.keys(changes).map((key) => [key, current?.[key] ?? null]));
}

function planPatch(label, path, current, next) {
  const changes = changesFrom(current, next);
  if (!Object.keys(changes).length) return;
  plan(label, beforeOf(current, changes), changes, () => patch(path, changes));
}

function planTranslation(label, path, row, next) {
  const changes = changesFrom(row, next);
  if (!Object.keys(changes).length) return;
  plan(label, beforeOf(row, changes), changes, () =>
    patch(path, { translations: { create: [], update: [{ id: row.id, ...changes }], delete: [] } }),
  );
}

function translationCreate(languageKey, copy) {
  return { create: [{ language: languageKey, ...copy }], update: [], delete: [] };
}

function withLocale(path, fields) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}fields=${fields}&deep[translations][_filter][language][locale][_eq]=${LOCALE}`;
}

const localeRow = (item) => item.translations?.[0] ?? null;

async function planPortfolio() {
  const profile = await get("/items/profile");
  planPatch("profile", "/items/profile", profile, PROFILE);

  const settings = await get("/items/site_settings");
  planPatch("site_settings", "/items/site_settings", settings, SITE_SETTINGS);

  const areas = await get("/items/focus_areas?fields=id,href,title,line,keywords&limit=50");
  for (const { href, next } of FOCUS_AREAS) {
    const area = areas.find((candidate) => candidate.href === href);
    if (!area) {
      console.warn(`focus_areas: no card links to ${href}; skipping`);
      continue;
    }
    planPatch(`focus_areas "${area.title}"`, `/items/focus_areas/${area.id}`, area, next);
  }
}

async function planHire() {
  const site = await get(withLocale("/items/service_site", "id,translations.*"));
  const siteRow = localeRow(site);
  if (!siteRow) throw new Error(`service_site has no ${LOCALE} translation`);
  const languageKey = siteRow.language;
  planTranslation("service_site", "/items/service_site", siteRow, SERVICE_SITE);

  const offers = await get(
    withLocale("/items/service_offers?limit=50", "id,slug,status,featured,sort,translations.*"),
  );
  for (const offer of BUILD_OFFERS) {
    const current = offers.find((candidate) => candidate.slug === offer.slug);
    if (!current) {
      const payload = {
        status: "published",
        slug: offer.slug,
        featured: offer.featured,
        sort: offer.sort,
        translations: translationCreate(languageKey, offer.copy),
      };
      plan(
        `service_offers "${offer.slug}"`,
        "(missing)",
        { featured: offer.featured, sort: offer.sort, ...offer.copy },
        () => post("/items/service_offers", payload),
      );
      continue;
    }
    const path = `/items/service_offers/${current.id}`;
    planPatch(`service_offers "${offer.slug}"`, path, current, {
      status: "published",
      featured: offer.featured,
      sort: offer.sort,
    });
    const row = localeRow(current);
    if (row) planTranslation(`service_offers "${offer.slug}" copy`, path, row, offer.copy);
  }
  for (const offer of CONSULTING_OFFERS) {
    const current = offers.find((candidate) => candidate.slug === offer.slug);
    if (!current) {
      console.warn(`service_offers: "${offer.slug}" not found; skipping`);
      continue;
    }
    planPatch(`service_offers "${offer.slug}"`, `/items/service_offers/${current.id}`, current, {
      featured: offer.featured,
      sort: offer.sort,
    });
  }

  const faqs = await get(withLocale("/items/service_faqs?limit=50", "id,key,translations.*"));
  const faq = faqs.find((candidate) => FAQ_BUILD.question.test(localeRow(candidate)?.question ?? ""));
  if (faq) {
    planTranslation(
      `service_faqs "${faq.key}"`,
      `/items/service_faqs/${faq.id}`,
      localeRow(faq),
      FAQ_BUILD.next,
    );
  } else {
    console.warn('service_faqs: no "build the system yourself" question found; skipping');
  }

  const proof = await get(
    withLocale("/items/service_proof?limit=50", "id,key,status,url,sort,translations.*"),
  );
  const proofByTitle = (title) => proof.find((item) => localeRow(item)?.title === title);
  PROOF_ORDER.forEach((title, index) => {
    const item = proofByTitle(title);
    if (item) {
      planPatch(`service_proof "${title}"`, `/items/service_proof/${item.id}`, item, {
        status: "published",
        sort: index + 1,
      });
      return;
    }
    if (title !== NEW_PROOF.copy.title) {
      console.warn(`service_proof: "${title}" not found; skipping`);
      return;
    }
    const payload = {
      status: "published",
      key: NEW_PROOF.key,
      url: NEW_PROOF.url,
      sort: index + 1,
      translations: translationCreate(languageKey, NEW_PROOF.copy),
    };
    plan(
      `service_proof "${title}"`,
      "(missing)",
      { key: NEW_PROOF.key, url: NEW_PROOF.url, sort: index + 1, ...NEW_PROOF.copy },
      () => post("/items/service_proof", payload),
    );
  });
  for (const title of PROOF_HIDDEN) {
    const item = proofByTitle(title);
    if (item) {
      planPatch(`service_proof "${title}"`, `/items/service_proof/${item.id}`, item, {
        status: "draft",
      });
    }
  }
}

const me = await get("/users/me?fields=id");
if (!me?.id) throw new Error("token is not a user token");

await planPortfolio();
await planHire();

if (!planned.length) {
  console.log("Nothing to do; CMS already matches.");
  process.exit(0);
}

console.log(`${APPLY ? "Applying" : "Dry run:"} ${planned.length} change(s)\n`);
for (const { label, before, after } of planned) {
  console.log(`# ${label}`);
  console.log(`  before: ${JSON.stringify(before)}`);
  console.log(`  after:  ${JSON.stringify(after)}`);
}

if (!APPLY) {
  console.log("\nRe-run with --apply to write these changes.");
  process.exit(0);
}

for (const { label, run } of planned) {
  await run();
  console.log(`ok  ${label}`);
}
console.log("\nDone.");
