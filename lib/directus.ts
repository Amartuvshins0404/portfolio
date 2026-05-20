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
};

export type BlogSettings = {
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
  if (DIRECTUS_TOKEN) headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;

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
].join(",");

export async function fetchBlogSettings(): Promise<BlogSettings | null> {
  try {
    return await directusFetch<BlogSettings>(
      `/items/blog_settings?fields=${BLOG_SETTINGS_FIELDS}`,
    );
  } catch {
    return null;
  }
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
