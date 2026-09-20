const DIRECTUS_URL =
  process.env.DIRECTUS_URL ?? "https://cms.amartuvshin.com";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

export type ContentType = {
  id: number;
  slug: string;
  label: string;
  description: string | null;
  sort: number | null;
};

export type RelatedPostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  reading_time: number | null;
  type: { slug: string; label: string } | null;
};

export type Post = {
  id: number;
  status: "published" | "draft" | "archived";
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  published_at: string | null;
  tags: string[] | null;
  reading_time: number | null;
  date_created: string;
  date_updated: string | null;
  type: { id: number; slug: string; label: string } | null;
  related_posts: { related_posts_id: RelatedPostSummary | null }[] | null;
};

export type BlogSettings = {
  seo_title: string | null;
  eyebrow: string | null;
  heading: string | null;
  description: string | null;
  read_post_label: string | null;
  all_posts_label: string | null;
  more_posts_label: string | null;
  last_updated_label: string | null;
  min_read_suffix: string | null;
  no_posts_title: string | null;
  no_posts_body: string | null;
  error_title: string | null;
  error_body: string | null;
  filter_aria_label: string | null;
  not_found_title: string | null;
  related_label: string | null;
};

type DirectusResponse<T> = { data: T; errors?: { message: string }[] };

async function directusFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...init,
    headers,
    next: { revalidate: 60, tags: ["directus"] },
  });

  if (!res.ok) {
    throw new Error(`Directus ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as DirectusResponse<T>;
  if (json.errors?.length) {
    throw new Error(`Directus error: ${json.errors[0].message}`);
  }
  return json.data;
}

function protectedDirectusFetch<T>(path: string): Promise<T> {
  if (!DIRECTUS_TOKEN) {
    throw new Error(
      "DIRECTUS_TOKEN is required for protected Directus service content",
    );
  }
  return directusFetch<T>(path, {
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
  });
}

const RELATED_SUMMARY_FIELDS = [
  "id",
  "slug",
  "title",
  "excerpt",
  "cover_image",
  "published_at",
  "reading_time",
  "type.slug",
  "type.label",
];

const POST_FIELDS = [
  "id",
  "status",
  "title",
  "slug",
  "excerpt",
  "content",
  "cover_image",
  "published_at",
  "tags",
  "reading_time",
  "date_created",
  "date_updated",
  "type.id",
  "type.slug",
  "type.label",
  ...RELATED_SUMMARY_FIELDS.map(
    (f) => `related_posts.related_posts_id.${f}`,
  ),
].join(",");

export async function fetchPosts(typeSlug?: string): Promise<Post[]> {
  const params = new URLSearchParams();
  params.set("fields", POST_FIELDS);
  params.append("filter[status][_eq]", "published");
  if (typeSlug) {
    params.append("filter[type][slug][_eq]", typeSlug);
  }
  params.set("sort", "-published_at,-date_created");
  params.set("limit", "100");
  return directusFetch<Post[]>(`/items/posts?${params.toString()}`);
}

export async function fetchPostSlugs(): Promise<{ slug: string }[]> {
  return directusFetch<{ slug: string }[]>(
    `/items/posts?fields=slug&filter[status][_eq]=published&limit=200`,
  );
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const params = new URLSearchParams();
  params.set("fields", POST_FIELDS);
  params.append("filter[status][_eq]", "published");
  params.append("filter[slug][_eq]", slug);
  params.set("limit", "1");
  const data = await directusFetch<Post[]>(`/items/posts?${params.toString()}`);
  return data[0] ?? null;
}

export async function fetchContentTypes(): Promise<ContentType[]> {
  return directusFetch<ContentType[]>(
    `/items/content_types?fields=id,slug,label,description,sort` +
      `&filter[status][_eq]=published` +
      `&sort=sort,id` +
      `&limit=50`,
  );
}

const BLOG_SETTINGS_FIELDS = [
  "seo_title",
  "eyebrow",
  "heading",
  "description",
  "read_post_label",
  "all_posts_label",
  "more_posts_label",
  "last_updated_label",
  "min_read_suffix",
  "no_posts_title",
  "no_posts_body",
  "error_title",
  "error_body",
  "filter_aria_label",
  "not_found_title",
  "related_label",
].join(",");

export async function fetchBacklinks(
  postId: number,
): Promise<RelatedPostSummary[]> {
  const fields = RELATED_SUMMARY_FIELDS.map((f) => `posts_id.${f}`).join(",");
  const params = new URLSearchParams();
  params.set("fields", fields);
  params.append("filter[related_posts_id][_eq]", String(postId));
  params.set("limit", "100");
  const rows = await directusFetch<
    { posts_id: RelatedPostSummary | null }[]
  >(`/items/posts_related_posts?${params.toString()}`);
  return rows
    .map((r) => r.posts_id)
    .filter((p): p is RelatedPostSummary => p !== null);
}

export async function fetchRelatedPosts(
  post: Post,
): Promise<RelatedPostSummary[]> {
  const forward = (post.related_posts ?? [])
    .map((r) => r.related_posts_id)
    .filter((p): p is RelatedPostSummary => p !== null);
  const backward = await fetchBacklinks(post.id).catch(() => []);
  const map = new Map<number, RelatedPostSummary>();
  for (const p of forward) map.set(p.id, p);
  for (const p of backward) if (!map.has(p.id)) map.set(p.id, p);
  return Array.from(map.values()).sort((a, b) => {
    const ad = a.published_at ?? "";
    const bd = b.published_at ?? "";
    return bd.localeCompare(ad);
  });
}

export async function fetchBlogSettings(): Promise<BlogSettings | null> {
  try {
    return await directusFetch<BlogSettings>(
      `/items/blog_settings?fields=${BLOG_SETTINGS_FIELDS}`,
    );
  } catch {
    return null;
  }
}

type ServiceTranslation<T> = T & {
  language: { locale: string } | null;
};

type ServiceSiteCopy = {
  seo_title: string;
  seo_description: string;
  nav_offer: string | null;
  nav_process: string | null;
  nav_work: string | null;
  nav_about: string | null;
  nav_apply: string | null;
  hero_eyebrow: string | null;
  hero_title: string;
  hero_description: string;
  hero_primary_cta: string | null;
  hero_secondary_cta: string | null;
  trust_note: string | null;
  offer_eyebrow: string | null;
  offer_title: string | null;
  offer_description: string | null;
  process_eyebrow: string | null;
  process_title: string | null;
  proof_eyebrow: string | null;
  proof_title: string | null;
  about_eyebrow: string | null;
  about_title: string | null;
  about_body: string | null;
  faq_eyebrow: string | null;
  faq_title: string | null;
  apply_eyebrow: string | null;
  apply_title: string | null;
  apply_description: string | null;
  footer_note: string | null;
};

export type ServiceSite = ServiceSiteCopy & {
  id: string;
  contact_email: string | null;
  contact_phone: string | null;
  portfolio_url: string | null;
};

type ServiceOfferCopy = {
  title: string;
  summary: string;
  duration: string | null;
  outcome: string | null;
  deliverables: string | null;
  cta_label: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

export type ServiceOffer = ServiceOfferCopy & {
  id: string;
  slug: string;
  featured: boolean;
  sort: number | null;
};

type ServiceProcessStepCopy = {
  title: string;
  description: string;
};

export type ServiceProcessStep = ServiceProcessStepCopy & {
  id: string;
  key: string;
  sort: number | null;
};

type ServiceFaqCopy = {
  question: string;
  answer: string;
};

export type ServiceFaq = ServiceFaqCopy & {
  id: string;
  key: string;
  sort: number | null;
};

type ServiceProofCopy = {
  label: string | null;
  title: string;
  description: string;
  result: string | null;
};

export type ServiceProof = ServiceProofCopy & {
  id: string;
  key: string;
  url: string | null;
  sort: number | null;
};

export type ServiceContent = {
  site: ServiceSite;
  offers: ServiceOffer[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  proof: ServiceProof[];
};

type RawServiceSite = {
  id: string;
  status: string;
  contact_email: string | null;
  contact_phone: string | null;
  portfolio_url: string | null;
  translations: ServiceTranslation<ServiceSiteCopy>[];
};

type RawServiceOffer = {
  id: string;
  slug: string;
  featured: boolean;
  sort: number | null;
  translations: ServiceTranslation<ServiceOfferCopy>[];
};

type RawServiceProcessStep = {
  id: string;
  key: string;
  sort: number | null;
  translations: ServiceTranslation<ServiceProcessStepCopy>[];
};

type RawServiceFaq = {
  id: string;
  key: string;
  sort: number | null;
  translations: ServiceTranslation<ServiceFaqCopy>[];
};

type RawServiceProof = {
  id: string;
  key: string;
  url: string | null;
  sort: number | null;
  translations: ServiceTranslation<ServiceProofCopy>[];
};

function localizedServiceParams(
  baseFields: string[],
  translationFields: string[],
  locale: string,
  options?: { collection?: boolean },
): string {
  const params = new URLSearchParams();
  params.set(
    "fields",
    [
      ...baseFields,
      ...translationFields.map((field) => `translations.${field}`),
      "translations.language.locale",
    ].join(","),
  );
  params.append(
    "deep[translations][_filter][language][locale][_eq]",
    locale,
  );
  if (options?.collection) {
    params.append("filter[status][_eq]", "published");
    params.set("sort", "sort");
    params.set("limit", "50");
  }
  return params.toString();
}

function serviceCopy<T>(
  translations: ServiceTranslation<T>[] | null | undefined,
  locale: string,
): T {
  const translation = translations?.find(
    (candidate) => candidate.language?.locale === locale,
  );
  if (!translation) {
    throw new Error(`Missing ${locale} service content`);
  }
  const { language, ...copy } = translation;
  if (!language) throw new Error(`Missing language for ${locale} service content`);
  return copy as T;
}

export async function getServiceContent(
  locale = "en-US",
): Promise<ServiceContent> {
  const siteFields = [
    "id",
    "status",
    "contact_email",
    "contact_phone",
    "portfolio_url",
  ];
  const siteCopyFields: (keyof ServiceSiteCopy)[] = [
    "seo_title",
    "seo_description",
    "nav_offer",
    "nav_process",
    "nav_work",
    "nav_about",
    "nav_apply",
    "hero_eyebrow",
    "hero_title",
    "hero_description",
    "hero_primary_cta",
    "hero_secondary_cta",
    "trust_note",
    "offer_eyebrow",
    "offer_title",
    "offer_description",
    "process_eyebrow",
    "process_title",
    "proof_eyebrow",
    "proof_title",
    "about_eyebrow",
    "about_title",
    "about_body",
    "faq_eyebrow",
    "faq_title",
    "apply_eyebrow",
    "apply_title",
    "apply_description",
    "footer_note",
  ];
  const offerCopyFields: (keyof ServiceOfferCopy)[] = [
    "title",
    "summary",
    "duration",
    "outcome",
    "deliverables",
    "cta_label",
    "seo_title",
    "seo_description",
  ];
  const processCopyFields: (keyof ServiceProcessStepCopy)[] = [
    "title",
    "description",
  ];
  const faqCopyFields: (keyof ServiceFaqCopy)[] = ["question", "answer"];
  const proofCopyFields: (keyof ServiceProofCopy)[] = [
    "label",
    "title",
    "description",
    "result",
  ];

  const [rawSite, rawOffers, rawProcessSteps, rawFaqs, rawProof] =
    await Promise.all([
      protectedDirectusFetch<RawServiceSite>(
        `/items/service_site?${localizedServiceParams(
          siteFields,
          siteCopyFields,
          locale,
        )}`,
      ),
      protectedDirectusFetch<RawServiceOffer[]>(
        `/items/service_offers?${localizedServiceParams(
          ["id", "status", "slug", "featured", "sort"],
          offerCopyFields,
          locale,
          { collection: true },
        )}`,
      ),
      protectedDirectusFetch<RawServiceProcessStep[]>(
        `/items/service_process_steps?${localizedServiceParams(
          ["id", "status", "key", "sort"],
          processCopyFields,
          locale,
          { collection: true },
        )}`,
      ),
      protectedDirectusFetch<RawServiceFaq[]>(
        `/items/service_faqs?${localizedServiceParams(
          ["id", "status", "key", "sort"],
          faqCopyFields,
          locale,
          { collection: true },
        )}`,
      ),
      protectedDirectusFetch<RawServiceProof[]>(
        `/items/service_proof?${localizedServiceParams(
          ["id", "status", "key", "url", "sort"],
          proofCopyFields,
          locale,
          { collection: true },
        )}`,
      ),
    ]);

  if (rawSite.status !== "published") {
    throw new Error("Service site is not published");
  }

  return {
    site: {
      id: rawSite.id,
      contact_email: rawSite.contact_email,
      contact_phone: rawSite.contact_phone,
      portfolio_url: rawSite.portfolio_url,
      ...serviceCopy(rawSite.translations, locale),
    },
    offers: rawOffers.map((offer) => ({
      id: offer.id,
      slug: offer.slug,
      featured: offer.featured,
      sort: offer.sort,
      ...serviceCopy(offer.translations, locale),
    })),
    processSteps: rawProcessSteps.map((step) => ({
      id: step.id,
      key: step.key,
      sort: step.sort,
      ...serviceCopy(step.translations, locale),
    })),
    faqs: rawFaqs.map((faq) => ({
      id: faq.id,
      key: faq.key,
      sort: faq.sort,
      ...serviceCopy(faq.translations, locale),
    })),
    proof: rawProof.map((proof) => ({
      id: proof.id,
      key: proof.key,
      url: proof.url,
      sort: proof.sort,
      ...serviceCopy(proof.translations, locale),
    })),
  };
}

export function directusAssetUrl(
  id: string | null | undefined,
  opts?: {
    width?: number;
    height?: number;
    fit?: "cover" | "contain";
    quality?: number;
  },
): string | null {
  if (!id) return null;
  const params = new URLSearchParams();
  if (opts?.width) params.set("width", String(opts.width));
  if (opts?.height) params.set("height", String(opts.height));
  if (opts?.fit) params.set("fit", opts.fit);
  if (opts?.quality) params.set("quality", String(opts.quality));
  const qs = params.toString();
  return `${DIRECTUS_URL}/assets/${id}${qs ? `?${qs}` : ""}`;
}

export function directusOrigin(): string {
  return DIRECTUS_URL;
}
