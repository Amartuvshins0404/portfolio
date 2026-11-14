import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/cms";
import { OG_SIZE, loadOgFonts, siteOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Amartuvshin Surenjav — Software Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [profile, fonts] = await Promise.all([
    getProfile().catch(() => null),
    loadOgFonts(),
  ]);
  const name = profile?.name ?? "Amartuvshin Surenjav";
  const role = profile?.job_title?.split(" — ")[0] ?? "Software Engineer";
  return new ImageResponse(siteOgImage({ name, role }), { ...size, fonts });
}
