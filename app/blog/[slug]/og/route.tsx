import { ImageResponse } from "next/og";
import { fetchPostBySlug, fetchPostSlugs } from "@/lib/directus";
import { getProfile } from "@/lib/cms";
import { OG_SIZE, articleOgImage, loadOgFonts } from "@/lib/og";

export const runtime = "nodejs";
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const [post, profile, fonts] = await Promise.all([
    fetchPostBySlug(slug).catch(() => null),
    getProfile().catch(() => null),
    loadOgFonts(),
  ]);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const name = profile?.name ?? "Amartuvshin Surenjav";
  return new ImageResponse(articleOgImage({ name, title: post.title }), {
    ...OG_SIZE,
    fonts,
  });
}
