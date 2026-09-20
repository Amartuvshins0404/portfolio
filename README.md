# Amartuvshin Portfolio

Public portfolio, consulting site, and technical blog for Amartuvshin Surenjav.

## Public Routes

- `/` — engineering profile, focus, projects, writing, experience and contact
- `/blog` — technical articles and case studies
- `/blog/[slug]` — individual long-form articles
- `/feed.xml` — RSS feed of published articles

## Stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- Framer Motion
- Directus CMS
- Vercel Speed Insights

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create `.env.local` for the integrations you need. Supported variables include `DIRECTUS_URL`, `DIRECTUS_TOKEN`, `GOOGLE_API`, `TELEGRAM_HTTP_API`, `TELEGRAM_USER_ID`, and `REVALIDATE_SECRET`. Never commit secret values.

## Content

Directus provides the profile, project, experience, education, activity, statistics, chatbot, blog, and consulting-site content. The `site_settings` singleton owns the portfolio hero, project controls, About labels, contact copy, footer note, and route metadata; it also owns the Focus and Writing section copy (`focus_eyebrow`, `focus_title`, `writing_eyebrow`, `writing_title`, `writing_cta`). The `focus_areas` collection provides the Focus section cards (`title`, `line`, `keywords`, `href`, `sort`, `status`), and `blog_settings.seo_title` owns the `/blog` metadata title. Portfolio projects use the `projects.state` field with `ongoing`, `done`, and `planning` values; `/portfolio` fetches the collection once and filters those states in one Projects interface. The consulting page reads its site copy, offers, process steps, FAQs, and proof points from the `service_*` collections through a server-side `DIRECTUS_TOKEN`. Public interface fallbacks live in the route and component files under `app/` and `components/`.

One-off CMS migrations live in `scripts/cms-migrate-*.mjs` (for example `scripts/cms-migrate-focus.mjs`) and run with `DIRECTUS_URL` and `DIRECTUS_TOKEN` in the environment.

Blog articles use Markdown with MDC components. Preserve headings, links, code fences, inline code, tables, and MDC syntax when editing an article.

## Language Policy

English is the sole public language and the default application language. All interface copy, metadata, structured data, CMS content, documentation, and articles must use natural English. Do not add Mongolian locale variants or translation controls unless this policy is explicitly changed.

## Validation

Create an optimized production build before publishing:

```bash
npm run build
```
