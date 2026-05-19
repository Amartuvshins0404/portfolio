import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt =
  "Amartuvshin Surenjav — Security Engineer & AI Agentic Workflow Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const portrait = await readFile(
    path.join(process.cwd(), "public/profile.jpg")
  );
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 55%, #111111 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Subtle accent */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(168,85,247,0.45), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.35), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                width: 40,
                height: 2,
                background: "rgba(255,255,255,0.5)",
              }}
            />
            amartuvshin.com
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 1.02,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Amartuvshin Surenjav</span>
            </div>
            <div
              style={{
                fontSize: 32,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.3,
                maxWidth: 720,
                display: "flex",
              }}
            >
              Security Engineer · AI Agentic Workflow Engineer · Full-stack
              builder from Ulaanbaatar.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            {[
              "erxes",
              "Claude Code",
              "Next.js",
              "MCP servers",
              "TypeScript",
              "GraphQL",
            ].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: 22,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            zIndex: 2,
            marginLeft: 48,
          }}
        >
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: 9999,
              padding: 6,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05))",
              display: "flex",
            }}
          >
            <img
              src={portraitSrc}
              alt=""
              width={348}
              height={348}
              style={{
                borderRadius: 9999,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
