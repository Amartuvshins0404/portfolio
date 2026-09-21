"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const MIN_W = 300;
const MAX_W = 900;
const REST_W = 500;

type Glyph = {
  el: HTMLSpanElement;
  w: number;
  y: number;
  fill: number;
  outline: boolean;
  phase: number;
};

export function MagneticName({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const spans = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-glyph]"),
    );
    const glyphs: Glyph[] = spans.map((el, i) => ({
      el,
      w: REST_W,
      y: 0,
      fill: el.dataset.outline === "true" ? 0 : 1,
      outline: el.dataset.outline === "true",
      phase: i * 0.35,
    }));

    const pointer = { x: -1e4, y: -1e4, active: false, last: 0 };
    let raf = 0;
    let rects: DOMRect[] = [];
    let radius = 260;

    const measure = () => {
      rects = glyphs.map((g) => g.el.getBoundingClientRect());
      radius = Math.max(180, Math.min(window.innerWidth * 0.22, 340));
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.last = performance.now();
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const tick = (now: number) => {
      const t = now / 1000;
      if (now - pointer.last > 1800) pointer.active = false;

      glyphs.forEach((g, i) => {
        const r = rects[i];
        let target = REST_W + 110 * Math.sin(t * 1.1 + g.phase);
        let targetY = 0;
        let targetFill = g.outline ? 0 : 1;

        if (pointer.active && r) {
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(pointer.x - cx, pointer.y - cy);
          const f = Math.max(0, 1 - d / radius);
          const k = f * f * (3 - 2 * f);
          target = MIN_W + (MAX_W - MIN_W) * k + (1 - k) * (target - MIN_W);
          targetY = -k * r.height * 0.08;
          if (g.outline) targetFill = k;
        }

        g.w += (target - g.w) * 0.14;
        g.y += (targetY - g.y) * 0.14;
        g.fill += (targetFill - g.fill) * 0.14;

        g.el.style.fontVariationSettings = `"wght" ${g.w.toFixed(1)}`;
        g.el.style.transform = `translate3d(0, ${g.y.toFixed(2)}px, 0)`;
        if (g.outline) {
          g.el.style.setProperty("--fill", g.fill.toFixed(3));
        }
      });

      raf = requestAnimationFrame(tick);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, lines]);

  let index = 0;

  return (
    <h1
      ref={rootRef}
      aria-label={lines.join(" ")}
      className={cn("select-none", className)}
    >
      {lines.map((line, li) => {
        const outline = li === lines.length - 1 && lines.length > 1;
        return (
          <span key={line} className="block overflow-hidden pb-[0.05em]">
            {li > 0 && " "}
            {Array.from(line).map((ch) => {
              const i = index++;
              return (
                <motion.span
                  key={`${ch}-${i}`}
                  aria-hidden="true"
                  data-glyph
                  data-outline={outline}
                  className={cn(
                    "inline-block will-change-transform",
                    outline &&
                      "text-[color-mix(in_oklab,var(--foreground)_calc(28%+var(--fill,0)*72%),transparent)]",
                  )}
                  style={{ fontVariationSettings: `"wght" ${REST_W}` }}
                  initial={reduceMotion ? false : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.15 + i * 0.035,
                    ease,
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

export function RotatingWords({
  words,
  interval = 2600,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(
      () => setI((v) => (v + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [interval, reduceMotion, words.length]);

  return (
    <span
      className={cn(
        "relative inline-grid overflow-hidden align-bottom",
        className,
      )}
    >
      {words.map((w) => (
        <span
          key={w}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function LocalClock({
  timeZone,
  className,
}: {
  timeZone: string;
  className?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className={cn("tabular-nums", className)} suppressHydrationWarning>
      {time ?? "--:--:--"}
    </span>
  );
}

export function Rule({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px w-full origin-left bg-foreground/20", className)}
      initial={reduceMotion ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease }}
    />
  );
}

export function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
