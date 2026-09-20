#!/usr/bin/env node
// One-off Directus migration: move the Focus/Writing copy into the CMS and
// reposition the profile from "security engineer" to "software engineer".
// Idempotent. Dry-run by default; pass --apply to write.
//
//   DIRECTUS_TOKEN=... node scripts/cms-migrate-focus.mjs [--apply]

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? "https://cms.amartuvshin.com";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const APPLY = process.argv.includes("--apply");
const PUBLIC_POLICY = "abf8a154-5b1c-4a46-ac9c-7300570f4f17";

if (!DIRECTUS_TOKEN) {
  console.error("DIRECTUS_TOKEN is required");
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

const planned = [];
function plan(label, before, after, run) {
  planned.push({ label, before, after, run });
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const FOCUS_AREAS = [
  {
    sort: 1,
    title: "AI Agents in Products",
    line: "erxes-agent: durable agents that call permission-checked tools across an enterprise platform, with human approval where it matters.",
    keywords: ["erxes-agent", "Mastra", "GraphQL Federation"],
    href: "/blog/erxes-ai-agents-plugin-case-study",
  },
  {
    sort: 2,
    title: "AI Agent Workflows",
    line: "Claude Code, custom MCP servers, and scoped skills for one-engineer teams.",
    keywords: ["MCP servers", "Claude Code", "Agentic engineering"],
    href: "/blog",
  },
  {
    sort: 3,
    title: "Full-Stack Products",
    line: "Next.js, TypeScript, and PostgreSQL products shipped end to end.",
    keywords: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "/blog?type=case-studies",
  },
];

const SITE_SETTINGS = {
  focus_eyebrow: "Focus",
  focus_title: "AI agents in products, agentic developer workflows, and full-stack systems.",
  writing_eyebrow: "Writing",
  writing_title: "Notes on AI agents, platform engineering, and shipping software.",
  writing_cta: "All articles",
  tagline: "Software engineer building AI agents and full-stack products.",
  site_description:
    "Portfolio of Amartuvshin Surenjav, a software engineer in Ulaanbaatar building AI agents, platform features, and full-stack products.",
  about_github_description: "Open-sourcing tools, MCP servers, and agentic experiments.",
};

const BLOG_SETTINGS = {
  seo_title: "Articles on AI Agents, MCP Servers & Full-Stack Engineering — Amartuvshin Surenjav",
};

const PROFILE = {
  bio_short: "Software engineer building AI agents, production systems, and full-stack products.",
  about_statement:
    "I'm a software engineer at erxes building erxes-agent—AI agents that work inside the platform through permission-checked tools—across a TypeScript microservices monorepo, and learning enterprise SaaS from the inside.",
};

const WORK_EXPERIENCE = {
  role: "Software Engineer",
  description:
    "Building erxes-agent, the AI agent plugin of a source-available Experience OS: durable Mastra agents, permission-checked tool calling across plugins, human-in-the-loop approvals, and a sandboxed code mode—shipped across an Nx-powered GraphQL Federation monorepo.",
};

const ACTIVITY = { label: "Building", value: "erxes-agent — AI agents inside the erxes platform" };

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const NEW_SITE_SETTINGS_FIELDS = [
  ["focus_eyebrow", "string", "input", "Focus section eyebrow"],
  ["focus_title", "string", "input", "Focus section heading"],
  ["writing_eyebrow", "string", "input", "Homepage Writing section eyebrow"],
  ["writing_title", "string", "input", "Homepage Writing section heading"],
  ["writing_cta", "string", "input", "Homepage Writing section button label"],
];

function fieldPayload(field, type, iface, note, sort) {
  return {
    field,
    type,
    meta: { interface: iface, width: "full", sort, note },
    schema: { is_nullable: true },
  };
}

const FOCUS_AREAS_COLLECTION = {
  collection: "focus_areas",
  meta: {
    icon: "center_focus_strong",
    group: "portfolio_content",
    accountability: "all",
    collapse: "open",
    hidden: false,
    singleton: false,
    sort_field: "sort",
    note: "Focus section cards on the homepage",
  },
  schema: {},
  fields: [
    {
      field: "id",
      type: "uuid",
      meta: { hidden: true, readonly: true, interface: "input", special: ["uuid"] },
      schema: { is_primary_key: true, length: 36, has_auto_increment: false },
    },
    {
      field: "status",
      type: "string",
      meta: {
        interface: "select-dropdown",
        display: "labels",
        width: "half",
        required: true,
        options: {
          choices: [
            { text: "Published", value: "published" },
            { text: "Draft", value: "draft" },
          ],
        },
      },
      schema: { default_value: "published", is_nullable: false },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
      schema: { is_nullable: true },
    },
    {
      field: "title",
      type: "string",
      meta: { interface: "input", required: true },
      schema: { is_nullable: false },
    },
    {
      field: "line",
      type: "text",
      meta: { interface: "input-multiline", required: true },
      schema: { is_nullable: false },
    },
    {
      field: "keywords",
      type: "json",
      meta: { interface: "tags", special: ["cast-json"] },
      schema: { is_nullable: true },
    },
    {
      field: "href",
      type: "string",
      meta: { interface: "input", required: true },
      schema: { is_nullable: false },
    },
  ],
};

async function planSchema() {
  const collections = await get("/collections?fields=collection");
  const hasFocus = collections.some((c) => c.collection === "focus_areas");
  if (!hasFocus) {
    plan("collection focus_areas", "(missing)", "create", () =>
      post("/collections", FOCUS_AREAS_COLLECTION),
    );
  }

  const siteFields = await get("/fields/site_settings");
  const existing = new Set(siteFields.map((f) => f.field));
  let sort = Math.max(...siteFields.map((f) => f.meta?.sort ?? 0)) + 1;
  for (const [field, type, iface, note] of NEW_SITE_SETTINGS_FIELDS) {
    if (existing.has(field)) continue;
    const payload = fieldPayload(field, type, iface, note, sort++);
    plan(`field site_settings.${field}`, "(missing)", "create", () =>
      post("/fields/site_settings", payload),
    );
  }

  const blogFields = await get("/fields/blog_settings");
  if (!blogFields.some((f) => f.field === "seo_title")) {
    const blogSort = Math.max(...blogFields.map((f) => f.meta?.sort ?? 0)) + 1;
    const payload = fieldPayload(
      "seo_title",
      "string",
      "input",
      "/blog <title> tag",
      blogSort,
    );
    plan("field blog_settings.seo_title", "(missing)", "create", () =>
      post("/fields/blog_settings", payload),
    );
  }

  const perms = await get(
    `/permissions?filter[policy][_eq]=${PUBLIC_POLICY}&filter[action][_eq]=read` +
      `&filter[collection][_in]=focus_areas,blog_settings&fields=id,collection,fields`,
  );
  if (!perms.some((p) => p.collection === "focus_areas")) {
    plan("public read permission focus_areas", "(missing)", "fields: *", () =>
      post("/permissions", {
        policy: PUBLIC_POLICY,
        collection: "focus_areas",
        action: "read",
        fields: ["*"],
        permissions: {},
        validation: {},
      }),
    );
  }
  const blogPerm = perms.find((p) => p.collection === "blog_settings");
  if (blogPerm && !blogPerm.fields.includes("*") && !blogPerm.fields.includes("seo_title")) {
    const fields = [...blogPerm.fields, "seo_title"];
    plan(
      "public read permission blog_settings",
      blogPerm.fields.join(","),
      fields.join(","),
      () => patch(`/permissions/${blogPerm.id}`, { fields }),
    );
  }
}

// ---------------------------------------------------------------------------
// Content planning
// ---------------------------------------------------------------------------

function planPatch(label, path, current, next) {
  const changes = Object.fromEntries(
    Object.entries(next).filter(
      ([k, v]) => JSON.stringify(current?.[k]) !== JSON.stringify(v),
    ),
  );
  if (!Object.keys(changes).length) return;
  const before = Object.fromEntries(Object.keys(changes).map((k) => [k, current?.[k]]));
  plan(label, before, changes, () => patch(path, changes));
}

async function planContent(focusCollectionExists) {
  const site = await get("/items/site_settings");
  const keywords = (site.meta_keywords ?? []).map((k) =>
    k === "security engineer" ? "software engineer" : k,
  );
  const anchor = keywords.indexOf("software engineer");
  for (const kw of ["Mastra", "erxes-agent", "AI agents"]) {
    if (!keywords.includes(kw)) keywords.splice(anchor + 1, 0, kw);
  }
  planPatch("site_settings", "/items/site_settings", site, {
    ...SITE_SETTINGS,
    meta_keywords: keywords,
  });

  const blog = await get("/items/blog_settings");
  planPatch("blog_settings", "/items/blog_settings", blog, BLOG_SETTINGS);

  const profile = await get("/items/profile");
  const paragraphs = [...(profile.bio_paragraphs ?? [])];
  paragraphs[0] = PROFILE.about_statement;
  planPatch("profile", "/items/profile", profile, {
    bio_short: PROFILE.bio_short,
    bio_paragraphs: paragraphs,
  });

  const work = await get(
    "/items/work_experiences?filter[company_url][_eq]=https://erxes.io&sort=sort&limit=1",
  );
  if (work[0]) {
    planPatch(
      `work_experiences ${work[0].id}`,
      `/items/work_experiences/${work[0].id}`,
      work[0],
      WORK_EXPERIENCE,
    );
  } else {
    console.warn("work_experiences: no erxes entry found; skipping");
  }

  const activities = await get("/items/current_activities?sort=sort");
  const securing = activities.find((a) => a.label === "Securing");
  const building = activities.find((a) => a.label === ACTIVITY.label);
  if (securing) {
    planPatch(
      `current_activities ${securing.id}`,
      `/items/current_activities/${securing.id}`,
      securing,
      ACTIVITY,
    );
  } else if (building) {
    planPatch(
      `current_activities ${building.id}`,
      `/items/current_activities/${building.id}`,
      building,
      ACTIVITY,
    );
  } else {
    console.warn('current_activities: no "Securing" entry found; skipping');
  }

  const existingAreas = focusCollectionExists
    ? await get("/items/focus_areas?fields=id,sort,status,title,line,keywords,href")
    : [];
  for (const area of FOCUS_AREAS) {
    const current = existingAreas.find((a) => a.title === area.title);
    if (current) {
      planPatch(
        `focus_areas "${area.title}"`,
        `/items/focus_areas/${current.id}`,
        current,
        { ...area, status: "published" },
      );
    } else {
      plan(`focus_areas "${area.title}"`, "(missing)", area, () =>
        post("/items/focus_areas", { ...area, status: "published" }),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const me = await get("/users/me?fields=id");
if (!me?.id) throw new Error("token is not a user token");

await planSchema();
const focusCollectionExists = !planned.some((p) => p.label === "collection focus_areas");
await planContent(focusCollectionExists);

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
