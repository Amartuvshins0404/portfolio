import type { CSSProperties } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  bg: "#18181b",
  fg: "#fafafa",
  muted: "#a1a1aa",
  faint: "#71717a",
  line: "#3f3f46",
  surface: "#27272a",
};

const PAD = 80;

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal";
};

let fontsPromise: Promise<OgFont[]> | null = null;

export function loadOgFonts(): Promise<OgFont[]> {
  fontsPromise ??= Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Geist-Medium.ttf")),
    readFile(path.join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
  ]).then(([geistMedium, geistMono]) => [
    { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
    { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
  ]);
  return fontsPromise;
}

function Words({
  text,
  fontSize,
  fontFamily = "Geist",
  fontWeight = 400,
  letterSpacing = 0,
  lineHeight,
  color,
  uppercase = false,
  center = false,
  maxWidth,
  marginTop = 0,
  wordGap,
}: {
  text: string;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  lineHeight?: number;
  color: string;
  uppercase?: boolean;
  center?: boolean;
  maxWidth?: number;
  marginTop?: number;
  wordGap?: number;
}) {
  const gap =
    wordGap ??
    (fontFamily === "Geist Mono"
      ? Math.round(0.1 * fontSize + letterSpacing)
      : 0);
  const wordStyle: CSSProperties = {
    fontFamily,
    fontWeight,
    fontSize,
    letterSpacing,
    color,
    display: "flex",
    ...(lineHeight !== undefined ? { lineHeight } : {}),
    ...(uppercase ? { textTransform: "uppercase" as const } : {}),
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        rowGap: 0,
        columnGap: gap,
        justifyContent: center ? "center" : "flex-start",
        marginTop,
        ...(maxWidth !== undefined ? { maxWidth } : {}),
      }}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} style={wordStyle}>
          {word}
        </span>
      ))}
    </div>
  );
}

function Glow({ cy }: { cy: number }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_SIZE.width}" height="${OG_SIZE.height}"><defs><radialGradient id="g" gradientUnits="objectBoundingBox" cx="0.5" cy="${cy.toFixed(4)}" r="0.42"><stop offset="0" stop-color="#fafafa" stop-opacity="0.08"/><stop offset="1" stop-color="#fafafa" stop-opacity="0"/></radialGradient></defs><rect width="${OG_SIZE.width}" height="${OG_SIZE.height}" fill="url(#g)"/></svg>`;
  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
      alt=""
      width={OG_SIZE.width}
      height={OG_SIZE.height}
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
}

const base: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: C.bg,
  padding: `${PAD}px ${PAD}px 0 ${PAD}px`,
  position: "relative",
  fontFamily: "Geist",
};

const centeredColumn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 520 - PAD,
  position: "relative",
};

const rule: CSSProperties = {
  display: "flex",
  width: 56,
  height: 1,
  background: C.line,
  marginTop: 32,
};

export function siteOgImage({ name, role }: { name: string; role: string }) {
  return (
    <div style={base}>
      <Glow cy={283 / OG_SIZE.height} />
      <div style={centeredColumn}>
        <Words
          text={role}
          fontSize={20}
          fontFamily="Geist Mono"
          letterSpacing={6}
          color={C.faint}
          uppercase
          center
        />
        <Words
          text={name}
          fontSize={84}
          fontWeight={500}
          letterSpacing={-3}
          color={C.fg}
          marginTop={28}
          center
        />
        <div style={rule} />
        <span
          style={{
            fontFamily: "Geist Mono",
            fontSize: 20,
            letterSpacing: 2,
            color: C.faint,
            marginTop: 28,
            display: "flex",
          }}
        >
          amartuvshin.com
        </span>
      </div>
    </div>
  );
}

export function articleOgImage({
  name,
  title,
}: {
  name: string;
  title: string;
}) {
  const titleFontSize =
    title.length <= 90 ? 64 : title.length <= 130 ? 52 : 44;
  const titleLetterSpacing =
    title.length <= 90 ? -2 : title.length <= 130 ? -1.5 : -1;
  return (
    <div style={base}>
      <Glow cy={311 / OG_SIZE.height} />
      <div style={centeredColumn}>
        <Words
          text={name}
          fontSize={20}
          fontFamily="Geist Mono"
          letterSpacing={6}
          color={C.faint}
          uppercase
          center
        />
        <Words
          text={title}
          fontSize={titleFontSize}
          fontWeight={500}
          letterSpacing={titleLetterSpacing}
          lineHeight={1.1}
          color={C.fg}
          maxWidth={960}
          marginTop={32}
          center
          wordGap={Math.round(0.13 * titleFontSize)}
        />
        <div style={rule} />
      </div>
    </div>
  );
}
