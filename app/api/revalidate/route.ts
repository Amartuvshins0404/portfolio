import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ revalidated: false, error: "unauthorized" }, { status: 401 });
}

async function handle(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, error: "REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const url = new URL(req.url);
  const provided =
    req.headers.get("x-revalidate-secret") ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("secret");

  if (provided !== secret) return unauthorized();

  let slug: string | null = url.searchParams.get("slug");
  if (!slug && req.method === "POST") {
    const body = await req.json().catch(() => null) as
      | { slug?: string; keys?: string[]; payload?: { slug?: string } }
      | null;
    slug = body?.slug ?? body?.payload?.slug ?? null;
    if (!slug && Array.isArray(body?.keys) && body.keys.length === 1) {
      slug = String(body.keys[0]);
    }
  }

  revalidateTag("directus", "max");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`, "page");

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    now: Date.now(),
  });
}

export async function POST(req: Request) {
  return handle(req);
}

export async function GET(req: Request) {
  return handle(req);
}
