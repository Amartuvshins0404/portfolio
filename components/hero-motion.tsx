"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { type ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduceMotion ? false : { y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </h1>
  );
}

export function HeroFade({
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
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const blobShapes = [
  "42% 58% 63% 37% / 45% 42% 58% 55%",
  "58% 42% 39% 61% / 55% 61% 39% 45%",
  "45% 55% 52% 48% / 62% 40% 60% 38%",
  "42% 58% 63% 37% / 45% 42% 58% 55%",
];

export function HeroOrb({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.8 });
  const blobX = useTransform(sx, (v) => v * 28);
  const blobY = useTransform(sy, (v) => v * 28);
  const ringX = useTransform(sx, (v) => v * -14);
  const ringY = useTransform(sy, (v) => v * -14);
  const photoX = useTransform(sx, (v) => v * 10);
  const photoY = useTransform(sy, (v) => v * 10);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduceMotion]);

  return (
    <motion.div
      className="relative mx-auto aspect-square w-[min(62vw,16rem)] sm:w-[20rem] lg:w-[26rem]"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.25, ease }}
    >
      <motion.div
        aria-hidden="true"
        style={{ x: blobX, y: blobY }}
        className="absolute inset-[6%]"
      >
        <motion.div
          className="h-full w-full bg-[conic-gradient(from_180deg,oklch(0.72_0.16_300),oklch(0.78_0.13_200),oklch(0.85_0.12_150),oklch(0.72_0.16_300))] opacity-80 blur-2xl dark:opacity-60"
          animate={
            reduceMotion
              ? undefined
              : { borderRadius: blobShapes, rotate: [0, 12, -8, 0] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderRadius: blobShapes[0] }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="absolute inset-0"
      >
        <motion.div
          className="h-full w-full rounded-full border border-dashed border-foreground/25"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_0_6px_color-mix(in_oklab,var(--foreground)_12%,transparent)]" />
        </motion.div>
        <motion.div
          className="absolute inset-[9%] rounded-full border border-foreground/10"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute bottom-[8%] right-[8%] h-1.5 w-1.5 rounded-full bg-foreground/60" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: photoX, y: photoY }}
        className="absolute inset-[22%]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border border-background/80 shadow-2xl shadow-black/20 ring-1 ring-foreground/10">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 16rem, 14rem"
            className="object-cover"
          />
        </div>
      </motion.div>

      <motion.p
        className={cn(
          "absolute -bottom-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap sm:block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
        )}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export function ScrollCue() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href="#focus"
      aria-label="Scroll to next section"
      className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Scroll
      </span>
      <span className="relative h-10 w-px overflow-hidden bg-foreground/15">
        <motion.span
          className="absolute inset-x-0 top-0 h-4 bg-foreground"
          animate={reduceMotion ? undefined : { y: ["-100%", "260%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}
