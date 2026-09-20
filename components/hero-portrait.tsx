"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Dot = {
  x: number;
  y: number;
  r: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
};

const COLS = 64;
const CROP = 0.74;
const FALLBACK_SRC = "/profile.jpg";

function toRgb(color: string): [number, number, number] {
  const c = document.createElement("canvas");
  c.width = 1;
  c.height = 1;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [0, 0, 0];
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`failed to load ${src}`));
    img.src = src;
  });
}

function sample(img: HTMLImageElement, cols: number): Float32Array {
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = cols;
  const ctx = off.getContext("2d");
  if (!ctx) return new Float32Array(cols * cols);
  const side = Math.min(img.naturalWidth, img.naturalHeight) * CROP;
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2 - side * 0.06;
  ctx.drawImage(img, sx, sy, side, side, 0, 0, cols, cols);
  const { data } = ctx.getImageData(0, 0, cols, cols);
  const lum = new Float32Array(cols * cols);
  let lo = 1;
  let hi = 0;
  for (let i = 0; i < cols * cols; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    lum[i] = l;
    if (l < lo) lo = l;
    if (l > hi) hi = l;
  }
  const range = Math.max(hi - lo, 0.01);
  for (let i = 0; i < lum.length; i++) {
    lum[i] = Math.min(1, Math.max(0, (lum[i] - lo) / range));
  }
  return lum;
}

export function HeroDotPortrait({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    let dots: Dot[] = [];
    let lum: Float32Array | null = null;
    let size = 0;
    let dpr = 1;
    let ink: [number, number, number] = [0, 0, 0];
    let inkIsLight = false;
    let start = 0;
    const pointer = { x: -1e4, y: -1e4, active: false };

    const readInk = () => {
      ink = toRgb(getComputedStyle(canvas).color);
      inkIsLight = (ink[0] + ink[1] + ink[2]) / 3 > 128;
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      size = rect.width;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!lum) return;
      const cell = size / COLS;
      dots = [];
      for (let row = 0; row < COLS; row++) {
        for (let col = 0; col < COLS; col++) {
          const l = lum[row * COLS + col];
          const weight = inkIsLight ? l : 1 - l;
          const r = Math.pow(weight, 1.35) * cell * 0.55;
          if (r < cell * 0.05) continue;
          const x = col * cell + cell / 2;
          const y = row * cell + cell / 2;
          dots.push({ x, y, ox: x, oy: y, r, vx: 0, vy: 0 });
        }
      }
    };

    const draw = (now: number) => {
      if (disposed) return;
      if (!start) start = now;
      const t = (now - start) / 1000;
      const reveal = reduceMotion ? 1 : Math.min(1, t / 1.6);
      const revealY = reveal * size;

      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = `rgb(${ink[0]},${ink[1]},${ink[2]})`;

      const influence = size * 0.22;
      for (const d of dots) {
        if (d.oy > revealY + 2) continue;

        if (!reduceMotion) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (pointer.active && dist < influence) {
            const f = (1 - dist / influence) ** 2 * 18;
            d.vx += (dx / (dist || 1)) * f;
            d.vy += (dy / (dist || 1)) * f;
          }
          d.vx += (d.ox - d.x) * 0.08;
          d.vy += (d.oy - d.y) * 0.08;
          d.vx *= 0.78;
          d.vy *= 0.78;
          d.x += d.vx;
          d.y += d.vy;
        }

        const edge = Math.min(1, (revealY - d.oy) / (size * 0.08));
        const breathe = reduceMotion
          ? 1
          : 1 + 0.08 * Math.sin(t * 1.4 + d.ox * 0.02 + d.oy * 0.015);
        const r = d.r * breathe * (0.6 + 0.4 * edge);
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion && reveal < 1) {
        ctx.fillStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},0.7)`;
        ctx.fillRect(0, revealY, size, 1);
      }

      if (reduceMotion && reveal >= 1) return;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(() => {
      layout();
    });
    ro.observe(canvas);

    const theme = new MutationObserver(() => {
      readInk();
      layout();
    });
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerout", onLeave);

    loadImage(src)
      .catch(() => loadImage(FALLBACK_SRC))
      .then((img) => {
        if (disposed) return;
        lum = sample(img, COLS);
        readInk();
        layout();
        setReady(true);
        raf = requestAnimationFrame(draw);
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      theme.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerout", onLeave);
    };
  }, [src, reduceMotion]);

  return (
    <motion.figure
      className="relative mx-auto w-[min(70vw,17rem)] sm:w-[22rem] lg:w-[27rem]"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 -top-3 h-4 w-4 border-l border-t border-foreground/40"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-3 h-4 w-4 border-r border-t border-foreground/40"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -left-3 h-4 w-4 border-b border-l border-foreground/40"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 h-4 w-4 border-b border-r border-foreground/40"
      />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="block aspect-square w-full text-foreground"
      />

      <figcaption className="mt-5 hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex">
        <span>{label}</span>
        <span aria-hidden="true">
          {COLS}×{COLS}
        </span>
      </figcaption>
    </motion.figure>
  );
}
